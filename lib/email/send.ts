import { getResendClient } from '@/lib/email/client'
import type { CreateEmailOptions, CreateEmailResponse } from 'resend'

// `from` is optional because it defaults to RESEND_FROM_EMAIL. Everything else
// matches the Resend send payload (to, subject, html/text/react, cc, bcc,
// replyTo, attachments, and so on).
type SendEmailParams = Omit<CreateEmailOptions, 'from'> & { from?: string }

// Sends a transactional email through Resend. Returns Resend's discriminated
// `{ data, error }` result rather than throwing on a send failure, so callers
// decide how to handle a rejected send (log it, retry, surface to the user).
// Configuration mistakes (missing env vars) throw, since those are bugs.
export async function sendEmail(
  params: SendEmailParams
): Promise<CreateEmailResponse> {
  const from = params.from ?? process.env.RESEND_FROM_EMAIL
  if (!from) {
    throw new Error('RESEND_FROM_EMAIL is not set and no `from` was provided')
  }

  const resend = getResendClient()

  // Cast is required because Omit flattens the RequireAtLeastOne<html|text|react>
  // constraint on CreateEmailOptions. Callers still get that constraint enforced
  // through SendEmailParams at the call site.
  return resend.emails.send({ ...params, from } as CreateEmailOptions)
}
