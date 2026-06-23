-- Link network devices to the vendors table. The existing free-text `vendor`
-- column stays as a fallback for values that do not match a vendor name
-- (e.g. "Araknis", "Comcast"). Backfill of vendor_id happens in the seed, after
-- vendors exist.
alter table public.asset_networks
  add column vendor_id uuid references public.vendors(id) on delete set null;

create index asset_networks_vendor_id_idx on public.asset_networks (vendor_id);
