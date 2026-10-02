import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

// Read helpers used by the Server Components under app/(app). Each creates its
// own server client so it can run inside any page or layout.

export type PropertyRow = Database['it_asset_tracker']['Tables']['properties']['Row']
export type AssetRow = Database['it_asset_tracker']['Tables']['assets']['Row']

export type PropertyWithCount = Pick<
  PropertyRow,
  'id' | 'slug' | 'name' | 'short_name' | 'address'
> & { assetCount: number }

// Properties with a per-property asset count, plus a synthetic "unassigned"
// bucket for assets whose property_id is null, so every asset stays reachable.
export async function getPropertiesWithCounts(): Promise<{
  properties: PropertyWithCount[]
  unassignedCount: number
}> {
  const supabase = await createClient()
  const [{ data: props }, { data: assetProps }] = await Promise.all([
    supabase
      .from('properties')
      .select('id, slug, name, short_name, address')
      .order('name'),
    supabase.from('assets').select('property_id'),
  ])

  const counts = new Map<string, number>()
  let unassignedCount = 0
  for (const row of assetProps ?? []) {
    if (row.property_id === null) unassignedCount++
    else counts.set(row.property_id, (counts.get(row.property_id) ?? 0) + 1)
  }

  const properties = (props ?? []).map((p) => ({
    ...p,
    assetCount: counts.get(p.id) ?? 0,
  }))
  return { properties, unassignedCount }
}

// Minimal property list for the asset form's property select.
export async function getPropertyOptions(): Promise<
  { id: string; name: string }[]
> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('id, name')
    .order('name')
  return data ?? []
}

export async function getPropertyBySlug(
  slug: string
): Promise<PropertyRow | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()
  return data
}

export type InventoryRow = Pick<
  AssetRow,
  | 'id'
  | 'type'
  | 'category'
  | 'status'
  | 'make'
  | 'model'
  | 'serial'
  | 'assigned_user'
  | 'sub_location'
>

// The unified inventory list: one query on the base table. Pass null to list
// assets with no property (the "unassigned" bucket).
export async function getAssetsForProperty(
  propertyId: string | null
): Promise<InventoryRow[]> {
  const supabase = await createClient()
  let query = supabase
    .from('assets')
    .select(
      'id, type, category, status, make, model, serial, assigned_user, sub_location'
    )
    .order('created_at', { ascending: false })
  query = propertyId === null
    ? query.is('property_id', null)
    : query.eq('property_id', propertyId)
  const { data } = await query
  return data ?? []
}

export type DidRow = Database['it_asset_tracker']['Tables']['dids']['Row']

export type AssetWithDetail = AssetRow & {
  asset_computers: Database['it_asset_tracker']['Tables']['asset_computers']['Row'] | null
  asset_software: Database['it_asset_tracker']['Tables']['asset_software']['Row'] | null
  asset_networks: Database['it_asset_tracker']['Tables']['asset_networks']['Row'] | null
  asset_phones: Database['it_asset_tracker']['Tables']['asset_phones']['Row'] | null
  dids: DidRow[]
  properties: Pick<PropertyRow, 'slug' | 'name'> | null
}

// Base row plus all possible detail rows (only one is non-null) and any DIDs,
// in one query.
export async function getAssetWithDetail(
  id: string
): Promise<AssetWithDetail | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('assets')
    .select(
      '*, asset_computers(*), asset_software(*), asset_networks(*), asset_phones(*), dids(*), properties(slug, name)'
    )
    .eq('id', id)
    .maybeSingle()
  return data as AssetWithDetail | null
}
