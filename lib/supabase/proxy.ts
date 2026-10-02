import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Refreshes the auth token on every request and writes the rotated cookies back
// to both the request (for downstream Server Components) and the response (for
// the browser). Call this from the root proxy.ts.
export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not run code between createServerClient and getClaims. A
  // simple mistake here can make it very hard to debug random logouts.
  // getClaims validates the JWT signature on every call, unlike getSession.
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  // Routes reachable without a session. Everything else requires login. There
  // is no role-based gating; a valid session is the only requirement.
  const publicAuthRoutes = [
    '/login',
    '/verify',
    '/forgot-password',
    '/reset-password',
    '/auth',
  ]
  const { pathname } = request.nextUrl
  const isPublicAuthRoute = publicAuthRoutes.some((path) =>
    pathname.startsWith(path)
  )

  if (!user && !isPublicAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: Return supabaseResponse as-is. If you create a new response,
  // copy over its cookies first, or sessions will break intermittently.
  return supabaseResponse
}
