'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { networkSummarySchema } from '@/lib/schemas/network'

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

// Upserts the single network summary row for a property (one row per property,
// enforced by the unique property_id). Numeric columns are coerced from strings.
export async function updateNetworkSummary(
  _prev: AssetFormState,
  formData: FormData
): Promise<AssetFormState> {
  const propertyId = String(formData.get('property_id') ?? '')
  if (!propertyId) return { status: 'error', message: 'Missing property.' }

  const parsed = networkSummarySchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrors(parsed.error) }

  const supabase = await createClient()
  const { data: claims } = await supabase.auth.getClaims()
  if (!claims?.claims) return { status: 'error', message: 'Your session has expired.' }

  const payload: Record<string, unknown> = { property_id: propertyId, ...parsed.data }
  for (const key of ['switches', 'aps']) {
    if (key in payload) payload[key] = payload[key] ? Number(payload[key]) : null
  }
  for (const key of ['isp_monthly_cost', 'tv_monthly_cost']) {
    if (key in payload) payload[key] = payload[key] ? Number(payload[key]) : null
  }

  const { error } = await supabase
    .from('network_summaries')
    .upsert(payload as never, { onConflict: 'property_id' })
  if (error) return { status: 'error', message: error.message }

  revalidatePath('/network')
  revalidatePath('/')
  redirect('/network')
}
