// Vendor category and billing cadence vocabularies, shared by the vendor form,
// schema, and list filters.

export const VENDOR_CATEGORIES: string[] = [
  'ISP',
  'VoIP',
  'Network Vendor',
  'Network MSP',
  'Hardware',
  'Software',
  'TV / Entertainment',
  'Camera / Security',
  'Mobile / Wireless',
  'Cloud',
  'Other',
]

export const BILLING_CADENCES: string[] = [
  'Monthly',
  'Quarterly',
  'Annual',
  '3-Year Subscription',
  'Monthly + Per Service Call',
  'Per Service Call',
  'Per Purchase',
  'Never / One-time',
]

// Formats a numeric amount (Postgres returns numeric as a string) as USD.
export function formatUsd(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === '') return '—'
  const n = typeof amount === 'string' ? Number(amount) : amount
  if (Number.isNaN(n)) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
