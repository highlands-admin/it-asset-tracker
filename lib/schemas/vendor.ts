import * as z from 'zod'

import { VENDOR_CATEGORIES } from '@/lib/vendors/types'

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === '' ? undefined : v))
  .optional()

const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Use YYYY-MM-DD')
  .transform((v) => (v === '' ? undefined : v))
  .optional()

const optionalInt = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d+$/.test(v), 'Must be a whole number')
  .transform((v) => (v === '' ? undefined : v))
  .optional()

const optionalDecimal = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d+(\.\d+)?$/.test(v), 'Must be a number')
  .transform((v) => (v === '' ? undefined : v))
  .optional()

const optionalEmail = z
  .string()
  .trim()
  .refine((v) => v === '' || z.email().safeParse(v).success, 'Enter a valid email')
  .transform((v) => (v === '' ? undefined : v))
  .optional()

export const vendorSchema = z.object({
  name: z.string().trim().min(1, 'Vendor name is required'),
  category: z.enum(['', ...VENDOR_CATEGORIES] as [string, ...string[]]).optional(),
  billing_cadence: optionalText,
  contact_name: optionalText,
  phone: optionalText,
  email: optionalEmail,
  account_number: optionalText,
  contract_start: optionalDate,
  contract_expiry: optionalDate,
  renewal_date: optionalDate,
  renewal_amount: optionalDecimal,
  license_count: optionalInt,
  renewal_notes: optionalText,
  url_website: optionalText,
  url_support: optionalText,
  url_portal: optionalText,
  notes: optionalText,
})

export const contractSchema = z.object({
  property_id: z
    .string()
    .trim()
    .transform((v) => (v === '' ? undefined : v))
    .optional(),
  description: optionalText,
  account_number: optionalText,
  start_date: optionalDate,
  end_date: optionalDate,
  monthly_amount: optionalDecimal,
  notes: optionalText,
})
