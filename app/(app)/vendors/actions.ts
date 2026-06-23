'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { contractSchema, vendorSchema } from '@/lib/schemas/vendor'

import type { AssetFormState } from '@/app/(app)/assets/form-state'

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

async function requireSession() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) throw new Error('Not authenticated')
  return supabase
}

// Vendor numeric columns sent as JSON numbers, not strings.
function vendorPayload(data: Record<string, unknown>): Record<string, unknown> {
  const payload = { ...data }
  for (const key of ['renewal_amount']) {
    if (key in payload) payload[key] = payload[key] ? Number(payload[key]) : null
  }
  if ('license_count' in payload) {
    payload.license_count = payload.license_count
      ? Number(payload.license_count)
      : null
  }
  return payload
}

export async function createVendor(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const parsed = vendorSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrors(parsed.error) }

  const supabase = await requireSession()
  const { data: operator } = await supabase
    .from('operators')
    .select('id')
    .limit(1)
    .maybeSingle()
  if (!operator) return { status: 'error', message: 'No operator configured.' }

  const { data, error } = await supabase
    .from('vendors')
    .insert({ operator_id: operator.id, ...vendorPayload(parsed.data) } as never)
    .select('id')
    .single()
  if (error) return { status: 'error', message: error.message }

  revalidatePath('/vendors')
  redirect(`/vendors/${data.id}`)
}

export async function updateVendor(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const vendorId = String(formData.get('vendor_id') ?? '')
  if (!vendorId) return { status: 'error', message: 'Missing vendor id.' }

  const parsed = vendorSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrors(parsed.error) }

  const supabase = await requireSession()
  const { error } = await supabase
    .from('vendors')
    .update(vendorPayload(parsed.data) as never)
    .eq('id', vendorId)
  if (error) return { status: 'error', message: error.message }

  revalidatePath('/vendors')
  revalidatePath(`/vendors/${vendorId}`)
  redirect(`/vendors/${vendorId}`)
}

export async function deleteVendor(formData: FormData): Promise<void> {
  const vendorId = String(formData.get('vendor_id') ?? '')
  if (!vendorId) return

  const supabase = await requireSession()
  // Contracts are removed by the on delete cascade; network vendor_id is set null.
  await supabase.from('vendors').delete().eq('id', vendorId)

  revalidatePath('/vendors')
  redirect('/vendors')
}

export async function addContract(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const vendorId = String(formData.get('vendor_id') ?? '')
  if (!vendorId) return { status: 'error', message: 'Missing vendor.' }

  const parsed = contractSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrors(parsed.error) }

  const { monthly_amount, property_id, ...rest } = parsed.data
  const supabase = await requireSession()
  const { error } = await supabase.from('vendor_contracts').insert({
    vendor_id: vendorId,
    property_id: property_id ?? null,
    ...rest,
    monthly_amount: monthly_amount ? Number(monthly_amount) : null,
  })
  if (error) return { status: 'error', message: error.message }

  revalidatePath(`/vendors/${vendorId}`)
  revalidatePath('/vendors')
  return { status: 'idle' }
}

export async function deleteContract(formData: FormData): Promise<void> {
  const contractId = String(formData.get('contract_id') ?? '')
  const vendorId = String(formData.get('vendor_id') ?? '')
  if (!contractId) return

  const supabase = await requireSession()
  await supabase.from('vendor_contracts').delete().eq('id', contractId)

  revalidatePath(`/vendors/${vendorId}`)
  revalidatePath('/vendors')
}
