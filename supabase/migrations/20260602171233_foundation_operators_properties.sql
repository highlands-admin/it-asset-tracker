-- Foundation: the it_asset_tracker schema, access check, shared updated_at
-- trigger, operators, operator contacts, properties.
--
-- The tracker lives in its own schema on the shared Highlands Supabase project
-- (alongside work orders, community_assistant, resident_records and
-- workforce_scheduler). Signing in uses that project's auth.users, so "signed in"
-- is not enough: access is limited to users who are administrators in the
-- work-order system (public.user_roles). RLS is enabled on each table in the
-- migration that creates it, before any data is loaded, and logged-out users
-- get nothing.

create schema if not exists it_asset_tracker;

-- Logged-out (anon) requests get no schema access at all; RLS decides the rest.
grant usage on schema it_asset_tracker to authenticated, service_role;
alter default privileges in schema it_asset_tracker
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema it_asset_tracker
  grant all on tables to service_role;
alter default privileges in schema it_asset_tracker
  revoke execute on functions from public;
alter default privileges in schema it_asset_tracker
  grant execute on functions to authenticated, service_role;

-- True when the caller is a work-order administrator. Reads public.user_roles
-- rather than the JWT's user_role claim so a revoked admin loses access at once,
-- not when their token expires. security definer because callers cannot read
-- other rows of user_roles; plpgsql so the body is only checked when it runs
-- (local databases without the work-order tables can still apply this file).
create or replace function it_asset_tracker.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  return exists (
    select 1
    from public.user_roles
    where user_id = (select auth.uid())
      and role = 'administrator'
  );
end;
$$;

revoke execute on function it_asset_tracker.is_admin() from public, anon;
grant execute on function it_asset_tracker.is_admin() to authenticated, service_role;

-- Shared trigger function to keep updated_at current on any table that has the column.
create or replace function it_asset_tracker.set_updated_at()
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
create table it_asset_tracker.operators (
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
  before update on it_asset_tracker.operators
  for each row execute function it_asset_tracker.set_updated_at();

-- Operator contacts model the prototype's nested contacts[] array as a child table.
create table it_asset_tracker.operator_contacts (
  id          uuid primary key default gen_random_uuid(),
  operator_id uuid not null references it_asset_tracker.operators(id) on delete cascade,
  name        text,
  title       text,
  phone       text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index operator_contacts_operator_id_idx on it_asset_tracker.operator_contacts (operator_id);

create trigger operator_contacts_set_updated_at
  before update on it_asset_tracker.operator_contacts
  for each row execute function it_asset_tracker.set_updated_at();

-- Properties are the prototype's "locations". slug preserves the prototype's stable
-- string ids (e.g. loc-jefferson) so seed mapping and future deep links stay stable.
create table it_asset_tracker.properties (
  id               uuid primary key default gen_random_uuid(),
  operator_id      uuid not null references it_asset_tracker.operators(id) on delete restrict,
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

create index properties_operator_id_idx on it_asset_tracker.properties (operator_id);

create trigger properties_set_updated_at
  before update on it_asset_tracker.properties
  for each row execute function it_asset_tracker.set_updated_at();

-- RLS: enable on every table, then allow work-order administrators full access.
-- The (select ...) subselect form is evaluated once per query, not per row.
alter table it_asset_tracker.operators enable row level security;
alter table it_asset_tracker.operator_contacts enable row level security;
alter table it_asset_tracker.properties enable row level security;

create policy "operators_select_admin" on it_asset_tracker.operators
  for select using ((select it_asset_tracker.is_admin()));
create policy "operators_insert_admin" on it_asset_tracker.operators
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "operators_update_admin" on it_asset_tracker.operators
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "operators_delete_admin" on it_asset_tracker.operators
  for delete using ((select it_asset_tracker.is_admin()));

create policy "operator_contacts_select_admin" on it_asset_tracker.operator_contacts
  for select using ((select it_asset_tracker.is_admin()));
create policy "operator_contacts_insert_admin" on it_asset_tracker.operator_contacts
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "operator_contacts_update_admin" on it_asset_tracker.operator_contacts
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "operator_contacts_delete_admin" on it_asset_tracker.operator_contacts
  for delete using ((select it_asset_tracker.is_admin()));

create policy "properties_select_admin" on it_asset_tracker.properties
  for select using ((select it_asset_tracker.is_admin()));
create policy "properties_insert_admin" on it_asset_tracker.properties
  for insert with check ((select it_asset_tracker.is_admin()));
create policy "properties_update_admin" on it_asset_tracker.properties
  for update using ((select it_asset_tracker.is_admin()))
  with check ((select it_asset_tracker.is_admin()));
create policy "properties_delete_admin" on it_asset_tracker.properties
  for delete using ((select it_asset_tracker.is_admin()));
