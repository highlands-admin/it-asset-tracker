-- Assets: a shared base table plus per-type detail tables (class-table inheritance).
-- The base table carries the columns every asset type shares and powers the unified
-- "inventory by property" list. Detail tables hold type-specific fields and join 1:1
-- on asset_id. ATA and cameras have no type-specific fields, so they are base rows
-- with no detail table. Phones (with DIDs) arrive in a later phase.

create type it_asset_tracker.asset_type as enum (
  'computer',
  'software',
  'ata',
  'camera',
  'network'
);

create type it_asset_tracker.asset_status as enum (
  'Active',
  'Inactive',
  'In Repair',
  'Disposed',
  'Spare',
  'Needs Attention'
);

create table it_asset_tracker.assets (
  id                uuid primary key default gen_random_uuid(),
  type              it_asset_tracker.asset_type not null,
  operator_id       uuid not null references it_asset_tracker.operators(id) on delete restrict,
  -- nullable: the prototype has assets with no location (e.g. unassigned licenses).
  property_id       uuid references it_asset_tracker.properties(id) on delete set null,
  sub_location      text,
  category          text not null check (category in (
    'Laptop', 'Desktop', 'Software License', 'ATA / Fax', 'Security Camera',
    'DVR / NVR Controller', 'Router / Firewall', 'Switch', 'Access Point',
    'Network Controller', 'Server', 'Printer', 'Monitor', 'UPS', 'Other'
  )),
  status            it_asset_tracker.asset_status not null default 'Active',
  make              text,
  model             text,
  serial            text,
  hostname          text,
  -- text, not macaddr/inet: prototype values are partial and unpunctuated.
  mac_address       text,
  ip_address        text,
  assigned_user     text,
  notes             text,
  entry_date        date,
  last_seen_on_site date,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index assets_property_id_idx on it_asset_tracker.assets (property_id);
create index assets_type_idx on it_asset_tracker.assets (type);
create index assets_status_idx on it_asset_tracker.assets (status);
-- Supports the hot path: list a property's assets, newest first.
create index assets_property_created_idx on it_asset_tracker.assets (property_id, created_at desc);

create trigger assets_set_updated_at
  before update on it_asset_tracker.assets
  for each row execute function it_asset_tracker.set_updated_at();

-- Detail tables share the base row's primary key as their own primary key and FK.
create table it_asset_tracker.asset_computers (
  asset_id           uuid primary key references it_asset_tracker.assets(id) on delete cascade,
  os_version         text,
  os_product_key     text,
  product_id         text,
  office_version     text,
  office_product_key text,
  software_source    text,
  processor          text,
  ram                text,
  storage            text,
  graphics           text,
  system_type        text,
  device_id          text
);

create table it_asset_tracker.asset_software (
  asset_id           uuid primary key references it_asset_tracker.assets(id) on delete cascade,
  office_version     text,
  office_product_key text,
  software_source    text
);

create table it_asset_tracker.asset_networks (
  asset_id         uuid primary key references it_asset_tracker.assets(id) on delete cascade,
  isp              text,
  port_count       integer,
  managed          text check (managed in ('Managed', 'Unmanaged')),
  poe              text check (poe in ('Yes', 'No')),
  vlan             text,
  wifi_standard    text check (wifi_standard in ('WiFi 5', 'WiFi 6', 'WiFi 6E', 'WiFi 5/6')),
  admin_ssid       text,
  resident_ssid    text,
  firmware_version text,
  license_key      text,
  renewal_date     date,
  -- free text in Phase 1; becomes a vendor_id FK when the Vendors phase lands.
  vendor           text,
  warranty_expiry  date,
  purchase_date    date
);

-- RLS: full access for work-order administrators, deny everyone else.
alter table it_asset_tracker.assets enable row level security;
alter table it_asset_tracker.asset_computers enable row level security;
alter table it_asset_tracker.asset_software enable row level security;
alter table it_asset_tracker.asset_networks enable row level security;

create policy "assets_select_admin" on it_asset_tracker.assets
  for select using ((select it_asset_tracker.is_admin()));
create policy "assets_insert_admin" on it_asset_tracker.assets
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "assets_update_admin" on it_asset_tracker.assets
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "assets_delete_admin" on it_asset_tracker.assets
  for delete using ((select it_asset_tracker.is_admin()));

create policy "asset_computers_select_admin" on it_asset_tracker.asset_computers
  for select using ((select it_asset_tracker.is_admin()));
create policy "asset_computers_insert_admin" on it_asset_tracker.asset_computers
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "asset_computers_update_admin" on it_asset_tracker.asset_computers
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "asset_computers_delete_admin" on it_asset_tracker.asset_computers
  for delete using ((select it_asset_tracker.is_admin()));

create policy "asset_software_select_admin" on it_asset_tracker.asset_software
  for select using ((select it_asset_tracker.is_admin()));
create policy "asset_software_insert_admin" on it_asset_tracker.asset_software
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "asset_software_update_admin" on it_asset_tracker.asset_software
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "asset_software_delete_admin" on it_asset_tracker.asset_software
  for delete using ((select it_asset_tracker.is_admin()));

create policy "asset_networks_select_admin" on it_asset_tracker.asset_networks
  for select using ((select it_asset_tracker.is_admin()));
create policy "asset_networks_insert_admin" on it_asset_tracker.asset_networks
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "asset_networks_update_admin" on it_asset_tracker.asset_networks
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "asset_networks_delete_admin" on it_asset_tracker.asset_networks
  for delete using ((select it_asset_tracker.is_admin()));
