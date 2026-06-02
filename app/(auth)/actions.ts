'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import {
  forgotPasswordSchema,
  loginSchema,
  signUpSchema,
  updatePasswordSchema,
  verifySchema,
} from '@/lib/schemas/auth'

import type { AuthState } from './auth-state'

// Where users land once they have a valid session. No role-based routing here;
// every authenticated user goes to the same place.
const HOME_ROUTE = '/'

function formError(
  fieldErrors: Record<string, string[]> | undefined,
  values: Record<string, string>,
  message?: string
): AuthState {
  return { status: 'error', fieldErrors, values, message }
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    firstName: String(formData.get('firstName') ?? ''),
    lastName: String(formData.get('lastName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  }

  const parsed = signUpSchema.safeParse(raw)
  const safeValues = {
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
  }
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), safeValues)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
      },
    },
  })

  if (error) {
    return formError(undefined, safeValues, error.message)
  }

  // Email confirmation is on, so no session exists yet. Send the user to enter
  // the 6-digit code we just emailed.
  redirect(`/verify?email=${encodeURIComponent(parsed.data.email)}`)
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), { email: raw.email })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    // An unconfirmed account cannot sign in. Route them to verification instead
    // of showing a dead-end error.
    if (error.code === 'email_not_confirmed') {
      redirect(`/verify?email=${encodeURIComponent(parsed.data.email)}`)
    }
    return formError(undefined, { email: raw.email }, error.message)
  }

  revalidatePath('/', 'layout')
  redirect(HOME_ROUTE)
}

export async function verifyAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    token: String(formData.get('token') ?? ''),
  }

  const parsed = verifySchema.safeParse(raw)
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), { email: raw.email })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    email: parsed.data.email,
    token: parsed.data.token,
    type: 'email',
  })

  if (error) {
    return formError(undefined, { email: raw.email }, error.message)
  }

  revalidatePath('/', 'layout')
  redirect(HOME_ROUTE)
}

export async function resendVerificationAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '')
  if (!email) {
    return formError(undefined, {}, 'Missing email address')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resend({ type: 'signup', email })

  if (error) {
    return formError(undefined, { email }, error.message)
  }

  return {
    status: 'success',
    message: 'A new code has been sent to your email.',
    values: { email },
  }
}

export async function forgotPasswordAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = { email: String(formData.get('email') ?? '') }

  const parsed = forgotPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), raw)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email)

  if (error) {
    return formError(undefined, raw, error.message)
  }

  redirect(`/reset-password/verify?email=${encodeURIComponent(parsed.data.email)}`)
}

export async function verifyResetOtpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    token: String(formData.get('token') ?? ''),
  }

  const parsed = verifySchema.safeParse(raw)
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), { email: raw.email })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    email: parsed.data.email,
    token: parsed.data.token,
    type: 'recovery',
  })

  if (error) {
    return formError(undefined, { email: raw.email }, error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/reset-password')
}

export async function updatePasswordAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  }

  const parsed = updatePasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return formError(z4FieldErrors(parsed.error), {})
  }

  const supabase = await createClient()
  // Verifying the recovery OTP established a session. Confirm it is still valid
  // before allowing the password change.
  const { data: claimsData } = await supabase.auth.getClaims()
  if (!claimsData?.claims) {
    return formError(
      undefined,
      {},
      'Your session has expired. Please request a new code.'
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return formError(undefined, {}, error.message)
  }

  revalidatePath('/', 'layout')
  redirect(HOME_ROUTE)
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

// Zod 4 returns issues on `error.issues`. Group them into { fieldName: messages[] }.
function z4FieldErrors(error: {
  issues: { path: PropertyKey[]; message: string }[]
}): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_form')
    if (!result[key]) result[key] = []
    result[key].push(issue.message)
  }
  return result
}
