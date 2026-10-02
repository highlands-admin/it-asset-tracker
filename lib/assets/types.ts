import type { Database } from '@/types/database'

// Single source of truth for asset type/category/status metadata, shared by the
// read layer (lib/assets/queries) and the mutation layer (assets/actions). The
// per-type branch logic that mirrors the create_asset RPC lives here, in one place.

export type AssetType = Database['it_asset_tracker']['Enums']['asset_type']
export type AssetStatus = Database['it_asset_tracker']['Enums']['asset_status']

export const ASSET_TYPES: AssetType[] = [
  'computer',
  'software',
  'ata',
  'camera',
  'network',
  'phone',
]

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  computer: 'Computer',
  software: 'Software license',
  ata: 'ATA / Fax',
  camera: 'Security camera',
  network: 'Network device',
  phone: 'Phone',
}

// A phone's own line/registration state, distinct from the base asset status.
export const PHONE_LINE_STATUSES: string[] = [
  'Ready',
  'Activated',
  'Unavailable',
  'Needs Attention',
  'Offline',
  'Unregistered',
]

export const PHONE_LINE_TYPES: string[] = [
  'Desk phone',
  'Analog telephone adapter',
  'Softphone',
  'Ring group',
  'Conference room',
  'Overhead paging',
  'Virtual fax',
  'Analog',
  'Mobile',
]

// Maps a phone line status to the base asset status shown in the inventory list.
export function phoneStatusToAssetStatus(lineStatus: string | undefined): AssetStatus {
  switch (lineStatus) {
    case 'Ready':
    case 'Activated':
      return 'Active'
    case 'Needs Attention':
      return 'Needs Attention'
    case 'Unavailable':
    case 'Offline':
    case 'Unregistered':
      return 'Inactive'
    default:
      return 'Active'
  }
}

export const ASSET_STATUSES: AssetStatus[] = [
  'Active',
  'Inactive',
  'In Repair',
  'Disposed',
  'Spare',
  'Needs Attention',
]

// All categories allowed by the assets.category CHECK constraint.
export const CATEGORIES: string[] = [
  'Laptop',
  'Desktop',
  'Software License',
  'ATA / Fax',
  'Security Camera',
  'DVR / NVR Controller',
  'Router / Firewall',
  'Switch',
  'Access Point',
  'Network Controller',
  'Server',
  'Printer',
  'Monitor',
  'UPS',
  'Other',
  'Desk Phone',
  'Conference Phone',
  'Softphone',
  'Mobile',
  'Analog Line',
]

// Categories offered for each asset type in the create/edit form.
export const CATEGORIES_BY_TYPE: Record<AssetType, string[]> = {
  computer: ['Laptop', 'Desktop', 'Other'],
  software: ['Software License'],
  ata: ['ATA / Fax'],
  camera: ['Security Camera'],
  network: [
    'Router / Firewall',
    'Switch',
    'Access Point',
    'Network Controller',
    'Server',
    'DVR / NVR Controller',
    'Printer',
    'Monitor',
    'UPS',
    'Other',
  ],
  phone: [
    'Desk Phone',
    'Conference Phone',
    'Softphone',
    'Mobile',
    'Analog Line',
    'ATA / Fax',
    'Other',
  ],
}

// The 1:1 detail table for a type, or null when the type is a base row only
// (ata and camera carry no type-specific columns).
export const DETAIL_TABLE_BY_TYPE: Record<
  AssetType,
  'asset_computers' | 'asset_software' | 'asset_networks' | 'asset_phones' | null
> = {
  computer: 'asset_computers',
  software: 'asset_software',
  network: 'asset_networks',
  phone: 'asset_phones',
  ata: null,
  camera: null,
}

export function detailTableFor(type: AssetType) {
  return DETAIL_TABLE_BY_TYPE[type]
}

export function isAssetType(value: string): value is AssetType {
  return (ASSET_TYPES as string[]).includes(value)
}
