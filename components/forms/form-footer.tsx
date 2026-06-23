import Link from 'next/link'

import { SubmitButton } from '@/components/auth/submit-button'
import { Button } from '@/components/ui/button'

// Shared form footer: a Cancel link back to where the user came from, plus the
// primary submit button, so every create/edit form ends the same way.
export function FormFooter({
  cancelHref,
  submitLabel,
  pendingLabel = 'Saving...',
}: {
  cancelHref: string
  submitLabel: string
  pendingLabel?: string
}) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
      <Button
        variant="outline"
        size="cta"
        nativeButton={false}
        render={<Link href={cancelHref} />}
      >
        Cancel
      </Button>
      <SubmitButton label={submitLabel} pendingLabel={pendingLabel} />
    </div>
  )
}
