-- Phase 4: a hand-curated network/infrastructure summary, one row per property
-- (ISP, router, switches, APs, SSIDs, phone system, TV). Some values overlap with
-- the asset tables but the summary is authored separately, so it is its own table.
-- Camera counts are computed live from camera assets, not stored here.

create table it_asset_tracker.network_summaries (
  id                 uuid primary key default gen_random_uuid(),
  property_id        uuid not null unique references it_asset_tracker.properties(id) on delete cascade,
  isp                text,
  isp_plan           text,
  isp_account_number text,
  isp_monthly_cost   numeric(10, 2),
  router             text,
  appliance          text,
  switches           integer,
  switch_models      text,
  aps                integer,
  ap_make            text,
  ap_model           text,
  wifi_standard      text,
  admin_ssid         text,
  resident_ssid      text,
  phone_system       text,
  cameras            text,
  tv                 text,
  tv_account         text,
  tv_monthly_cost    numeric(10, 2),
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index network_summaries_property_id_idx on it_asset_tracker.network_summaries (property_id);

create trigger network_summaries_set_updated_at
  before update on it_asset_tracker.network_summaries
  for each row execute function it_asset_tracker.set_updated_at();

alter table it_asset_tracker.network_summaries enable row level security;

create policy "network_summaries_select_admin" on it_asset_tracker.network_summaries
  for select using ((select it_asset_tracker.is_admin()));
create policy "network_summaries_insert_admin" on it_asset_tracker.network_summaries
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "network_summaries_update_admin" on it_asset_tracker.network_summaries
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "network_summaries_delete_admin" on it_asset_tracker.network_summaries
  for delete using ((select it_asset_tracker.is_admin()));
