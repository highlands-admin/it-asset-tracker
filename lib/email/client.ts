import { Resend } from 'resend'

let client: Resend | null = null

// Lazily constructs a single Resend client. The key is read at call time, not
// module load, so importing this file never throws during build when the env
// var is absent. Resend is a server-only SDK; never import it into a Client
// Component, since RESEND_API_KEY has no NEXT_PUBLIC_ prefix and must stay off
// the browser.
export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }
    client = new Resend(apiKey)
  }
  return client
}
