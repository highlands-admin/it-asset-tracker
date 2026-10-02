import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Browser client for use in Client Components. Safe to call on every render;
// createBrowserClient memoizes the underlying client internally.
// Queries go to the it_asset_tracker schema on the shared Highlands project.
export function createClient(): SupabaseClient<Database, 'it_asset_tracker'> {
  return createBrowserClient<Database, 'it_asset_tracker'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { db: { schema: 'it_asset_tracker' } }
  )
}
