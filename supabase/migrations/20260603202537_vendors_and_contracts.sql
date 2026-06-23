-- Phase 3: vendors and their contracts. A vendor can have many contracts (one
-- per location/service, e.g. Comcast bills four properties separately). Contracts
-- carry the monthly amount that drives per-property spend. Bills are deferred to
-- a later phase. billing_cadence is an open vocabulary, so it stays plain text.

create table public.vendors (
  id             uuid primary key default gen_random_uuid(),
  operator_id    uuid not null references public.operators(id) on delete restrict,
  name           text not null,
  category       text check (category in (
    'ISP', 'VoIP', 'Network Vendor', 'Network MSP', 'Hardware', 'Software',
    'TV / Entertainment', 'Camera / Security', 'Mobile / Wireless', 'Cloud', 'Other'
  )),
  billing_cadence text,
  contact_name   text,
  phone          text,
  email          text,
  account_number text,
  contract_start date,
  contract_expiry date,
  renewal_date   date,
  renewal_amount numeric(12, 2),
  license_count  integer,
  renewal_notes  text,
  url_website    text,
  url_support    text,
  url_portal     text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index vendors_operator_id_idx on public.vendors (operator_id);
create index vendors_category_idx on public.vendors (category);

create trigger vendors_set_updated_at
  before update on public.vendors
  for each row execute function public.set_updated_at();

create table public.vendor_contracts (
  id             uuid primary key default gen_random_uuid(),
  vendor_id      uuid not null references public.vendors(id) on delete cascade,
  -- nullable: an operator-wide contract (e.g. "All sites") has no single property.
  property_id    uuid references public.properties(id) on delete set null,
  description    text,
  account_number text,
  start_date     date,
  end_date       date,
  monthly_amount numeric(12, 2),
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index vendor_contracts_vendor_id_idx on public.vendor_contracts (vendor_id);
create index vendor_contracts_property_id_idx on public.vendor_contracts (property_id);

create trigger vendor_contracts_set_updated_at
  before update on public.vendor_contracts
  for each row execute function public.set_updated_at();

-- RLS: shared org-wide full access for authenticated users.
alter table public.vendors enable row level security;
alter table public.vendor_contracts enable row level security;

create policy "vendors_select_authenticated" on public.vendors
  for select using ((select auth.uid()) is not null);
create policy "vendors_insert_authenticated" on public.vendors
  for insert with check ((select auth.uid()) is not null);
create policy "vendors_update_authenticated" on public.vendors
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "vendors_delete_authenticated" on public.vendors
  for delete using ((select auth.uid()) is not null);

create policy "vendor_contracts_select_authenticated" on public.vendor_contracts
  for select using ((select auth.uid()) is not null);
create policy "vendor_contracts_insert_authenticated" on public.vendor_contracts
  for insert with check ((select auth.uid()) is not null);
create policy "vendor_contracts_update_authenticated" on public.vendor_contracts
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "vendor_contracts_delete_authenticated" on public.vendor_contracts
  for delete using ((select auth.uid()) is not null);
