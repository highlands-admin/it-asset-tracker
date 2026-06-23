-- create_asset writes the base row and the matching detail row in one transaction,
-- so an asset is never half-created. It runs with the caller's privileges (security
-- invoker, the default), so RLS still applies. The branch on type lives here in the
-- database, mirrored by lib/assets/types.ts in the app.
--
-- base:   jsonb of assets columns (type and category required).
-- detail: jsonb of the detail table's columns; ignored for ata/camera.
-- Empty strings are coerced to null so the UI can submit blank fields freely.

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
  end if;

  return new_id;
end;
$$;
