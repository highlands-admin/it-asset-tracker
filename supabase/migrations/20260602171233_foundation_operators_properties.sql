-- Foundation: shared updated_at trigger, operators, operator contacts, properties.
-- Access model for Phase 1 is shared org-wide: any authenticated user can read and
-- write every row. RLS is enabled on each table in this same migration, before any
-- data is loaded, and logged-out users get nothing.

-- Shared trigger function to keep updated_at current on any table that has the column.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Operators (companies). Phase 1 seeds exactly one (Highlands Senior Living).
create table public.operators (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  short_name text,
  logo_url   text,
  web_link   text,
  street     text,
  city       text,
  state      text,
  zip        text,
  country    text default 'USA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger operators_set_updated_at
  before update on public.operators
  for each row execute function public.set_updated_at();

-- Operator contacts model the prototype's nested contacts[] array as a child table.
create table public.operator_contacts (
  id          uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators(id) on delete cascade,
  name        text,
  title       text,
  phone       text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index operator_contacts_operator_id_idx on public.operator_contacts (operator_id);

create trigger operator_contacts_set_updated_at
  before update on public.operator_contacts
  for each row execute function public.set_updated_at();

-- Properties are the prototype's "locations". slug preserves the prototype's stable
-- string ids (e.g. loc-jefferson) so seed mapping and future deep links stay stable.
create table public.properties (
  id               uuid primary key default gen_random_uuid(),
  operator_id      uuid not null references public.operators(id) on delete restrict,
  slug             text not null unique,
  name             text not null,
  short_name       text,
  address          text,
  main_phone       text,
  ed_name          text,
  maintenance_tech text,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index properties_operator_id_idx on public.properties (operator_id);

create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

-- RLS: enable on every table, then allow all authenticated users full access.
-- The (select auth.uid()) subselect form is evaluated once per query, not per row.
alter table public.operators enable row level security;
alter table public.operator_contacts enable row level security;
alter table public.properties enable row level security;

create policy "operators_select_authenticated" on public.operators
  for select using ((select auth.uid()) is not null);
create policy "operators_insert_authenticated" on public.operators
  for insert with check ((select auth.uid()) is not null);
create policy "operators_update_authenticated" on public.operators
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "operators_delete_authenticated" on public.operators
  for delete using ((select auth.uid()) is not null);

create policy "operator_contacts_select_authenticated" on public.operator_contacts
  for select using ((select auth.uid()) is not null);
create policy "operator_contacts_insert_authenticated" on public.operator_contacts
  for insert with check ((select auth.uid()) is not null);
create policy "operator_contacts_update_authenticated" on public.operator_contacts
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "operator_contacts_delete_authenticated" on public.operator_contacts
  for delete using ((select auth.uid()) is not null);

create policy "properties_select_authenticated" on public.properties
  for select using ((select auth.uid()) is not null);
create policy "properties_insert_authenticated" on public.properties
  for insert with check ((select auth.uid()) is not null);
create policy "properties_update_authenticated" on public.properties
  for update using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);
create policy "properties_delete_authenticated" on public.properties
  for delete using ((select auth.uid()) is not null);
