'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { baseAssetSchema, detailSchemaFor, didSchema } from '@/lib/schemas/asset'
import {
  detailTableFor,
  isAssetType,
  phoneStatusToAssetStatus,
} from '@/lib/assets/types'

import type { AssetFormState } from './form-state'

// Resolve a property_id to its slug for post-mutation redirects. Empty/unknown
// falls back to the "unassigned" bucket page.
async function slugForProperty(propertyId: string | undefined): Promise<string> {
  if (!propertyId) return 'unassigned'
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('slug')
    .eq('id', propertyId)
    .maybeSingle()
  return data?.slug ?? 'unassigned'
}

function fieldErrors(error: {
  issues: { path: PropertyKey[]; message: string }[]
}): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_form')
    if (!result[key]) result[key] = []
    result[key].push(issue.message)
  }
  return result
}

// Parse the shared base fields plus the per-type detail fields out of FormData.
function parseAsset(formData: FormData) {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>
  // Phones have no user-set base status; it is derived from the line status so
  // the inventory list shows a uniform asset_status.
  if (raw.type === 'phone') {
    raw.status = phoneStatusToAssetStatus(raw.line_status)
  }
  const baseParsed = baseAssetSchema.safeParse(raw)
  if (!baseParsed.success) {
    return { ok: false as const, errors: fieldErrors(baseParsed.error) }
  }
  const detailSchema = detailSchemaFor(baseParsed.data.type)
  let detail: Record<string, string | undefined> = {}
  if (detailSchema) {
    const detailParsed = detailSchema.safeParse(raw)
    if (!detailParsed.success) {
      return { ok: false as const, errors: fieldErrors(detailParsed.error) }
    }
    detail = detailParsed.data
  }
  return { ok: true as const, base: baseParsed.data, detail }
}

async function requireSession() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) throw new Error('Not authenticated')
  return supabase
}

export async function createAsset(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const parsed = parseAsset(formData)
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors }

  const supabase = await requireSession()

  const { data: operator } = await supabase
    .from('operators')
    .select('id')
    .limit(1)
    .maybeSingle()
  if (!operator) {
    return { status: 'error', message: 'No operator configured.' }
  }

  const base = { ...parsed.base, operator_id: operator.id }
  const { error } = await supabase.rpc('create_asset', {
    base,
    detail: parsed.detail,
  })
  if (error) return { status: 'error', message: error.message }

  const slug = await slugForProperty(parsed.base.property_id)
  revalidatePath(`/properties/${slug}`)
  revalidatePath('/properties')
  redirect(`/properties/${slug}`)
}

export async function updateAsset(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const assetId = String(formData.get('asset_id') ?? '')
  const typeRaw = String(formData.get('type') ?? '')
  if (!assetId || !isAssetType(typeRaw)) {
    return { status: 'error', message: 'Missing asset id or type.' }
  }

  const parsed = parseAsset(formData)
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors }

  const supabase = await requireSession()

  const { type, ...baseFields } = parsed.base
  void type // type is immutable on edit; kept in the form for routing only.
  const { error: baseError } = await supabase
    .from('assets')
    .update({
      ...baseFields,
      property_id: parsed.base.property_id ?? null,
    })
    .eq('id', assetId)
  if (baseError) return { status: 'error', message: baseError.message }

  const detailTable = detailTableFor(parsed.base.type)
  if (detailTable) {
    // Coerce numeric columns: PostgREST rejects JSON strings for numeric/int
    // fields, so empty -> null and otherwise a real number.
    const payload: Record<string, unknown> = { asset_id: assetId, ...parsed.detail }
    for (const key of ['port_count', 'avg_monthly_cost']) {
      if (key in payload) {
        payload[key] = payload[key] ? Number(payload[key]) : null
      }
    }
    const { error: detailError } = await supabase
      .from(detailTable)
      .upsert(payload as never)
    if (detailError) return { status: 'error', message: detailError.message }
  }

  const slug = await slugForProperty(parsed.base.property_id)
  revalidatePath(`/properties/${slug}`)
  revalidatePath('/properties')
  redirect(`/properties/${slug}/assets/${assetId}`)
}

export async function deleteAsset(formData: FormData): Promise<void> {
  const assetId = String(formData.get('asset_id') ?? '')
  const redirectSlug = String(formData.get('redirect_slug') ?? 'unassigned')
  if (!assetId) return

  const supabase = await requireSession()
  // The detail row is removed by the on delete cascade FK.
  await supabase.from('assets').delete().eq('id', assetId)

  revalidatePath(`/properties/${redirectSlug}`)
  revalidatePath('/properties')
  redirect(`/properties/${redirectSlug}`)
}

// DIDs are a child collection of a phone asset, added and removed on the asset
// detail page (which stays open, so these revalidate rather than redirect).
export async function addDid(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const phoneAssetId = String(formData.get('phone_asset_id') ?? '')
  const slug = String(formData.get('slug') ?? '')
  if (!phoneAssetId) {
    return { status: 'error', message: 'Missing phone.' }
  }

  const parsed = didSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrors(parsed.error) }

  const supabase = await requireSession()
  const { monthly_rate, ...rest } = parsed.data
  const { error } = await supabase.from('dids').insert({
    phone_asset_id: phoneAssetId,
    ...rest,
    monthly_rate: monthly_rate ? Number(monthly_rate) : null,
  })
  if (error) return { status: 'error', message: error.message }

  revalidatePath(`/properties/${slug}/assets/${phoneAssetId}`)
  return { status: 'idle' }
}

export async function deleteDid(formData: FormData): Promise<void> {
  const didId = String(formData.get('did_id') ?? '')
  const phoneAssetId = String(formData.get('phone_asset_id') ?? '')
  const slug = String(formData.get('slug') ?? '')
  if (!didId) return

  const supabase = await requireSession()
  await supabase.from('dids').delete().eq('id', didId)

  revalidatePath(`/properties/${slug}/assets/${phoneAssetId}`)
}
