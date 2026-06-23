-- Phase 2: phones as a new asset type plus their DIDs (direct inward dialing
-- numbers). A phone is a base assets row + an asset_phones detail row; a phone
-- can have many dids (one had five), so DIDs are a child table.

-- Extend the category CHECK with phone-relevant categories.
alter table public.assets drop constraint assets_category_check;
alter table public.assets add constraint assets_category_check check (category in (
  'Laptop', 'Desktop', 'Software License', 'ATA / Fax', 'Security Camera',
  'DVR / NVR Controller', 'Router / Firewall', 'Switch', 'Access Point',
  'Network Controller', 'Server', 'Printer', 'Monitor', 'UPS', 'Other',
  'Desk Phone', 'Conference Phone', 'Softphone', 'Mobile', 'Analog Line'
));

-- Phone detail. line_status is the phone's own registration state (separate
-- from the base assets.status, which the app derives from it). Provider, line
-- type, and carrier are open vocabularies, so they stay plain text.
create table public.asset_phones (
  asset_id        uuid primary key references public.assets(id) on delete cascade,
  provider        text,
  extension       text,
  public_ip       text,
  private_ip      text,
  line_type       text,
  line_status     text check (line_status in (
    'Ready', 'Activated', 'Unavailable', 'Needs Attention', 'Offline', 'Unregistered'
  )),
  last_provisioned date,
  route_to        text,
  carrier         text,
  activation_code text,
  avg_monthly_cost numeric(10, 2),
  cost_type       text check (cost_type in ('actual', 'estimated')),
  mrc_notes       text
);

create table public.dids (
  id              uuid primary key default gen_random_uuid(),
  phone_asset_id  uuid not null references public.assets(id) on delete cascade,
  number          text not null,
  extension       text,
  assigned_to     text,
  provider        text,
  line_type       text,
  number_source   text,
  number_type     text,
  caller_id_name  text,
  monthly_rate    numeric(10, 2),
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index dids_phone_asset_id_idx on public.dids (phone_asset_id);

create trigger dids_set_updated_at
  before update on public.dids
  for each row execute function public.set_updated_at();

-- RLS: same shared org-wide full access for authenticated users.
alter table public.asset_phones enable row level security;
alter table public.dids enable row level security;

create policy "asset_phones_select_authenticated" on public.asset_phones
  for select using ((select auth.uid()) is not null);
create policy "asset_phones_insert_authenticated" on public.asset_phones
  for insert with check ((select auth.uid()) is not null);
create policy "asset_phones_update_authenticated" on public.asset_phones
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "asset_phones_delete_authenticated" on public.asset_phones
  for delete using ((select auth.uid()) is not null);

create policy "dids_select_authenticated" on public.dids
  for select using ((select auth.uid()) is not null);
create policy "dids_insert_authenticated" on public.dids
  for insert with check ((select auth.uid()) is not null);
create policy "dids_update_authenticated" on public.dids
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "dids_delete_authenticated" on public.dids
  for delete using ((select auth.uid()) is not null);

-- Extend create_asset with a phone branch. Uses new_type::text comparison for
-- the new value so function creation never validates the enum literal.
create or replace function public.create_asset(base jsonb, detail jsonb default '{}'::jsonb)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  new_id uuid;
  new_type public.asset_type := (base->>'type')::public.asset_type;
begin
  insert into public.assets (
    type, operator_id, property_id, sub_location, category, status,
    make, model, serial, hostname, mac_address, ip_address,
    assigned_user, notes, entry_date, last_seen_on_site
  )
  values (
    new_type,
    (base->>'operator_id')::uuid,
    nullif(base->>'property_id', '')::uuid,
    nullif(base->>'sub_location', ''),
    base->>'category',
    coalesce(nullif(base->>'status', '')::public.asset_status, 'Active'),
    nullif(base->>'make', ''),
    nullif(base->>'model', ''),
    nullif(base->>'serial', ''),
    nullif(base->>'hostname', ''),
    nullif(base->>'mac_address', ''),
    nullif(base->>'ip_address', ''),
    nullif(base->>'assigned_user', ''),
    nullif(base->>'notes', ''),
    nullif(base->>'entry_date', '')::date,
    nullif(base->>'last_seen_on_site', '')::date
  )
  returning id into new_id;

  if new_type = 'computer' then
    insert into public.asset_computers (
      asset_id, os_version, os_product_key, product_id, office_version,
      office_product_key, software_source, processor, ram, storage,
      graphics, system_type, device_id
    )
    values (
      new_id,
      nullif(detail->>'os_version', ''),
      nullif(detail->>'os_product_key', ''),
      nullif(detail->>'product_id', ''),
      nullif(detail->>'office_version', ''),
      nullif(detail->>'office_product_key', ''),
      nullif(detail->>'software_source', ''),
      nullif(detail->>'processor', ''),
      nullif(detail->>'ram', ''),
      nullif(detail->>'storage', ''),
      nullif(detail->>'graphics', ''),
      nullif(detail->>'system_type', ''),
      nullif(detail->>'device_id', '')
    );
  elsif new_type = 'software' then
    insert into public.asset_software (
      asset_id, office_version, office_product_key, software_source
    )
    values (
      new_id,
      nullif(detail->>'office_version', ''),
      nullif(detail->>'office_product_key', ''),
      nullif(detail->>'software_source', '')
    );
  elsif new_type = 'network' then
    insert into public.asset_networks (
      asset_id, isp, port_count, managed, poe, vlan, wifi_standard,
      admin_ssid, resident_ssid, firmware_version, license_key,
      renewal_date, vendor, warranty_expiry, purchase_date
    )
    values (
      new_id,
      nullif(detail->>'isp', ''),
      nullif(detail->>'port_count', '')::integer,
      nullif(detail->>'managed', ''),
      nullif(detail->>'poe', ''),
      nullif(detail->>'vlan', ''),
      nullif(detail->>'wifi_standard', ''),
      nullif(detail->>'admin_ssid', ''),
      nullif(detail->>'resident_ssid', ''),
      nullif(detail->>'firmware_version', ''),
      nullif(detail->>'license_key', ''),
      nullif(detail->>'renewal_date', '')::date,
      nullif(detail->>'vendor', ''),
      nullif(detail->>'warranty_expiry', '')::date,
      nullif(detail->>'purchase_date', '')::date
    );
  elsif new_type::text = 'phone' then
    insert into public.asset_phones (
      asset_id, provider, extension, public_ip, private_ip, line_type,
      line_status, last_provisioned, route_to, carrier, activation_code,
      avg_monthly_cost, cost_type, mrc_notes
    )
    values (
      new_id,
      nullif(detail->>'provider', ''),
      nullif(detail->>'extension', ''),
      nullif(detail->>'public_ip', ''),
      nullif(detail->>'private_ip', ''),
      nullif(detail->>'line_type', ''),
      nullif(detail->>'line_status', ''),
      nullif(detail->>'last_provisioned', '')::date,
      nullif(detail->>'route_to', ''),
      nullif(detail->>'carrier', ''),
      nullif(detail->>'activation_code', ''),
      nullif(detail->>'avg_monthly_cost', '')::numeric,
      nullif(detail->>'cost_type', ''),
      nullif(detail->>'mrc_notes', '')
    );
  end if;

  return new_id;
end;
$$;
