-- Access moves from work-order administrators to platform super admins
-- (public.platform_admins, owned by the work-order system). Once that system went
-- multi-tenant, "administrator" means an admin of any organization, which is too
-- broad for Highlands' own IT inventory.
--
-- Same function name, so the 48 policies that call it stay as they are. Still a
-- table lookup, so adding or removing a super admin takes effect at once.
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
    from public.platform_admins
    where user_id = (select auth.uid())
  );
end;
$$;

comment on function it_asset_tracker.is_admin() is
  'True when the caller is a platform super admin (public.platform_admins).';
