import { createClient } from '@/lib/supabase/server'
import { ASSET_TYPE_LABELS, type AssetType } from '@/lib/assets/types'

export type Tally = { label: string; count: number }

export type Renewal = {
  label: string
  date: string
  daysOut: number
  amount: number | null
  isMeraki: boolean
}

export type DashboardData = {
  totalAssets: number
  activeAssets: number
  inactiveAssets: number
  phones: number
  dids: number
  vendors: number
  properties: number
  monthlySpend: number
  byType: Tally[]
  byCategory: Tally[]
  phoneProviders: Tally[]
  renewals: Renewal[]
}

function tally(values: (string | null)[]): Tally[] {
  const map = new Map<string, number>()
  for (const v of values) {
    const key = v ?? 'Unknown'
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
}

// Renewals due within this many days are surfaced on the dashboard.
const RENEWAL_HORIZON_DAYS = 730

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()

  const [
    { data: assets },
    { count: didCount },
    { data: phoneRows },
    { data: vendorRows },
    { data: propertyRows },
    { data: contractRows },
  ] = await Promise.all([
    supabase.from('assets').select('type, category, status'),
    supabase.from('dids').select('*', { count: 'exact', head: true }),
    supabase.from('asset_phones').select('provider'),
    supabase.from('vendors').select('name, contract_expiry, renewal_date, renewal_amount'),
    supabase.from('properties').select('id', { count: 'exact', head: false }),
    supabase
      .from('vendor_contracts')
      .select('monthly_amount, end_date, description, vendors(name)'),
  ])

  const rows = assets ?? []
  const byType = tally(rows.map((a) => ASSET_TYPE_LABELS[a.type as AssetType] ?? a.type))
  const byCategory = tally(rows.map((a) => a.category))
  const phoneProviders = tally((phoneRows ?? []).map((p) => p.provider))

  const monthlySpend = (contractRows ?? []).reduce(
    (sum, c) => sum + Number(c.monthly_amount ?? 0),
    0
  )

  // Collect renewal dates from vendor-level fields and contract end dates.
  const now = Date.now()
  const dayMs = 1000 * 60 * 60 * 24
  const renewals: Renewal[] = []
  function consider(
    name: string,
    label: string,
    date: string | null,
    amount: number | null
  ) {
    if (!date) return
    const t = new Date(date).getTime()
    if (Number.isNaN(t)) return
    const daysOut = Math.round((t - now) / dayMs)
    if (daysOut >= RENEWAL_HORIZON_DAYS) return
    renewals.push({ label, date, daysOut, amount, isMeraki: /meraki/i.test(name) })
  }
  for (const v of vendorRows ?? []) {
    const amt = v.renewal_amount ? Number(v.renewal_amount) : null
    consider(v.name, `${v.name} contract expiry`, v.contract_expiry, amt)
    consider(v.name, `${v.name} renewal`, v.renewal_date, amt)
  }
  for (const c of contractRows ?? []) {
    const name = (c.vendors as { name: string } | null)?.name ?? 'Vendor'
    consider(name, `${name} — ${c.description ?? 'contract'}`, c.end_date, null)
  }
  // De-duplicate by label, soonest first.
  const seen = new Set<string>()
  const dedupedRenewals = renewals
    .filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)))
    .sort((a, b) => a.daysOut - b.daysOut)

  return {
    totalAssets: rows.length,
    activeAssets: rows.filter((a) => a.status === 'Active').length,
    inactiveAssets: rows.filter((a) => a.status === 'Inactive').length,
    phones: rows.filter((a) => a.type === 'phone').length,
    dids: didCount ?? 0,
    vendors: (vendorRows ?? []).length,
    properties: (propertyRows ?? []).length,
    monthlySpend,
    byType,
    byCategory,
    phoneProviders,
    renewals: dedupedRenewals,
  }
}
