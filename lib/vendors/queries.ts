import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export type VendorRow = Database['public']['Tables']['vendors']['Row']
export type ContractRow = Database['public']['Tables']['vendor_contracts']['Row']

export type VendorListItem = Pick<
  VendorRow,
  'id' | 'name' | 'category' | 'billing_cadence'
> & { monthlyTotal: number; contractCount: number }

// Vendors with their monthly contract total and contract count, computed from
// the embedded contracts.
export async function getVendors(): Promise<VendorListItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vendors')
    .select('id, name, category, billing_cadence, vendor_contracts(monthly_amount)')
    .order('name')

  return (data ?? []).map((v) => {
    const contracts = v.vendor_contracts ?? []
    const monthlyTotal = contracts.reduce(
      (sum, c) => sum + Number(c.monthly_amount ?? 0),
      0
    )
    return {
      id: v.id,
      name: v.name,
      category: v.category,
      billing_cadence: v.billing_cadence,
      monthlyTotal,
      contractCount: contracts.length,
    }
  })
}

export type VendorWithContracts = VendorRow & {
  vendor_contracts: (ContractRow & {
    properties: { name: string; slug: string } | null
  })[]
}

export async function getVendorById(
  id: string
): Promise<VendorWithContracts | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vendors')
    .select('*, vendor_contracts(*, properties(name, slug))')
    .eq('id', id)
    .maybeSingle()
  return data as VendorWithContracts | null
}

export type SpendItem = { label: string; amount: number }
export type PropertySpend = { total: number; items: SpendItem[] }

// Monthly spend for one property: the sum of its matched vendor contracts.
export async function getPropertySpend(
  propertyId: string
): Promise<PropertySpend> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vendor_contracts')
    .select('description, monthly_amount, vendors(name)')
    .eq('property_id', propertyId)
    .not('monthly_amount', 'is', null)

  const items: SpendItem[] = (data ?? []).map((c) => ({
    label: `${(c.vendors as { name: string } | null)?.name ?? 'Vendor'} — ${c.description ?? 'Contract'}`,
    amount: Number(c.monthly_amount ?? 0),
  }))
  const total = items.reduce((sum, i) => sum + i.amount, 0)
  return { total, items }
}

// Total monthly spend per property id, for the properties index.
export async function getSpendByProperty(): Promise<Map<string, number>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vendor_contracts')
    .select('property_id, monthly_amount')
  const map = new Map<string, number>()
  for (const c of data ?? []) {
    if (!c.property_id || c.monthly_amount === null) continue
    map.set(c.property_id, (map.get(c.property_id) ?? 0) + Number(c.monthly_amount))
  }
  return map
}
