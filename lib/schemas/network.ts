import * as z from 'zod'

const optionalText = z
  .string()
  .trim()
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

export const networkSummarySchema = z.object({
  isp: optionalText,
  isp_plan: optionalText,
  isp_account_number: optionalText,
  isp_monthly_cost: optionalDecimal,
  router: optionalText,
  appliance: optionalText,
  switches: optionalInt,
  switch_models: optionalText,
  aps: optionalInt,
  ap_make: optionalText,
  ap_model: optionalText,
  wifi_standard: optionalText,
  admin_ssid: optionalText,
  resident_ssid: optionalText,
  phone_system: optionalText,
  cameras: optionalText,
  tv: optionalText,
  tv_account: optionalText,
  tv_monthly_cost: optionalDecimal,
  notes: optionalText,
})
