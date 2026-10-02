-- Link network devices to the vendors table. The existing free-text `vendor`
-- column stays as a fallback for values that do not match a vendor name
-- (e.g. "Araknis", "Comcast"). Backfill of vendor_id happens in the seed, after
-- vendors exist.
alter table it_asset_tracker.asset_networks
  add column vendor_id uuid references it_asset_tracker.vendors(id) on delete set null;

create index asset_networks_vendor_id_idx on it_asset_tracker.asset_networks (vendor_id);
