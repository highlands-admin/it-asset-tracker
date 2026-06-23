import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export type NetworkSummaryRow =
  Database['public']['Tables']['network_summaries']['Row']
type PropertyRow = Database['public']['Tables']['properties']['Row']

export type CameraTally = { active: number; inactive: number; vendors: string[] }

export type PropertyNetwork = {
  property: Pick<PropertyRow, 'id' | 'name' | 'slug'>
  summary: NetworkSummaryRow | null
  cameras: CameraTally
}

// Live camera counts per property from camera assets, keyed by property_id.
async function cameraTallies(): Promise<Map<string, CameraTally>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('assets')
    .select('property_id, status, make')
    .eq('type', 'camera')

  const map = new Map<string, CameraTally>()
  for (const a of data ?? []) {
    if (!a.property_id) continue
    const t = map.get(a.property_id) ?? { active: 0, inactive: 0, vendors: [] }
    if (a.status === 'Inactive') t.inactive++
    else t.active++
    if (a.make && !t.vendors.includes(a.make)) t.vendors.push(a.make)
    map.set(a.property_id, t)
  }
  return map
}

// Administrative buckets, not physical sites with network infrastructure, so
// they are hidden from the network view. Matched case-insensitively.
const NETWORK_HIDDEN_PROPERTIES = new Set(['corporate', 'remote'])

// Every property with its (optional) network summary and live camera counts.
export async function getPropertyNetworks(): Promise<PropertyNetwork[]> {
  const supabase = await createClient()
  const [{ data: properties }, { data: summaries }, cameras] = await Promise.all([
    supabase.from('properties').select('id, name, slug').order('name'),
    supabase.from('network_summaries').select('*'),
    cameraTallies(),
  ])

  const byProperty = new Map<string, NetworkSummaryRow>()
  for (const s of summaries ?? []) byProperty.set(s.property_id, s)

  return (properties ?? [])
    .filter(
      (property) =>
        !NETWORK_HIDDEN_PROPERTIES.has(property.name.trim().toLowerCase())
    )
    .map((property) => ({
    property,
    summary: byProperty.get(property.id) ?? null,
    cameras: cameras.get(property.id) ?? { active: 0, inactive: 0, vendors: [] },
  }))
}

export async function getNetworkSummaryForSlug(slug: string): Promise<{
  property: PropertyRow
  summary: NetworkSummaryRow | null
} | null> {
  const supabase = await createClient()
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()
  if (!property) return null

  const { data: summary } = await supabase
    .from('network_summaries')
    .select('*')
    .eq('property_id', property.id)
    .maybeSingle()

  return { property, summary }
}
