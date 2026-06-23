import * as z from 'zod'

import {
  ASSET_STATUSES,
  ASSET_TYPES,
  CATEGORIES,
  type AssetStatus,
  type AssetType,
} from '@/lib/assets/types'

// Optional free-text field: trims, and treats an empty string as undefined so
// the database stores null rather than ''.
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

export const baseAssetSchema = z.object({
  type: z.enum(ASSET_TYPES as [AssetType, ...AssetType[]]),
  // empty string => unassigned (null property)
  property_id: z
    .string()
    .trim()
    .transform((v) => (v === '' ? undefined : v))
    .optional(),
  category: z.enum(CATEGORIES as [string, ...string[]], {
    message: 'Choose a category',
  }),
  status: z.enum(ASSET_STATUSES as [AssetStatus, ...AssetStatus[]]),
  sub_location: optionalText,
  make: optionalText,
  model: optionalText,
  serial: optionalText,
  hostname: optionalText,
  mac_address: optionalText,
  ip_address: optionalText,
  assigned_user: optionalText,
  notes: optionalText,
  entry_date: optionalDate,
  last_seen_on_site: optionalDate,
})

export const computerDetailSchema = z.object({
  os_version: optionalText,
  os_product_key: optionalText,
  product_id: optionalText,
  office_version: optionalText,
  office_product_key: optionalText,
  software_source: optionalText,
  processor: optionalText,
  ram: optionalText,
  storage: optionalText,
  graphics: optionalText,
  system_type: optionalText,
  device_id: optionalText,
})

export const softwareDetailSchema = z.object({
  office_version: optionalText,
  office_product_key: optionalText,
  software_source: optionalText,
})

export const networkDetailSchema = z.object({
  isp: optionalText,
  port_count: optionalInt,
  managed: z.enum(['', 'Managed', 'Unmanaged']).optional(),
  poe: z.enum(['', 'Yes', 'No']).optional(),
  vlan: optionalText,
  wifi_standard: z.enum(['', 'WiFi 5', 'WiFi 6', 'WiFi 6E', 'WiFi 5/6']).optional(),
  admin_ssid: optionalText,
  resident_ssid: optionalText,
  firmware_version: optionalText,
  license_key: optionalText,
  renewal_date: optionalDate,
  vendor: optionalText,
  warranty_expiry: optionalDate,
  purchase_date: optionalDate,
})

export const phoneDetailSchema = z.object({
  provider: optionalText,
  extension: optionalText,
  public_ip: optionalText,
  private_ip: optionalText,
  line_type: optionalText,
  line_status: z
    .enum([
      '',
      'Ready',
      'Activated',
      'Unavailable',
      'Needs Attention',
      'Offline',
      'Unregistered',
    ])
    .optional(),
  last_provisioned: optionalDate,
  route_to: optionalText,
  carrier: optionalText,
  activation_code: optionalText,
  avg_monthly_cost: optionalDecimal,
  cost_type: z.enum(['', 'actual', 'estimated']).optional(),
  mrc_notes: optionalText,
})

// DIDs are a child collection of a phone asset, managed on the asset detail page.
export const didSchema = z.object({
  number: z.string().trim().min(1, 'Phone number is required'),
  extension: optionalText,
  assigned_to: optionalText,
  provider: optionalText,
  line_type: optionalText,
  number_source: optionalText,
  number_type: optionalText,
  caller_id_name: optionalText,
  monthly_rate: optionalDecimal,
  notes: optionalText,
})

// Returns the detail schema for a type, or null for base-only types (ata/camera).
export function detailSchemaFor(type: AssetType) {
  if (type === 'computer') return computerDetailSchema
  if (type === 'software') return softwareDetailSchema
  if (type === 'network') return networkDetailSchema
  if (type === 'phone') return phoneDetailSchema
  return null
}
