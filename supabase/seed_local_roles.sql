-- Local development only. In the shared Highlands project, public.platform_admins
-- belongs to the work-order system and it_asset_tracker.is_admin() reads it.
-- A local database has no work-order tables, so this creates a minimal stand-in.
-- To get access locally, add a user in Supabase Studio, then:
--   insert into public.platform_admins (user_id)
--   select id from auth.users where email = 'you@highlands.care';
-- Never run this against the shared project.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role' and typnamespace = 'public'::regnamespace) then
    create type public.app_role as enum ('administrator', 'requester', 'technician', 'inspector');
  end if;
end
$$;

create table if not exists public.user_roles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       public.app_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

create table if not exists public.platform_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.platform_admins enable row level security;
