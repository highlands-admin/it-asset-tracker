import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Server client for Server Components, Server Actions, and Route Handlers.
// cookies() is async in Next.js 15+, so this function must be awaited at the
// call site: `const supabase = await createClient()`.
// Queries go to the it_asset_tracker schema on the shared Highlands project.
export async function createClient(): Promise<
  SupabaseClient<Database, 'it_asset_tracker'>
> {
  const cookieStore = await cookies()

  return createServerClient<Database, 'it_asset_tracker'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      db: { schema: 'it_asset_tracker' },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component. This can
            // be ignored when middleware refreshes the session, which it does
            // in middleware.ts.
          }
        },
      },
    }
  )
}
