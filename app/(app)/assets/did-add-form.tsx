'use client'

import { useActionState, useEffect, useRef } from 'react'

import { FormError } from '@/components/auth/form-error'
import { SubmitButton } from '@/components/auth/submit-button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useServerErrors } from '@/lib/hooks/use-server-errors'

import { addDid } from './actions'
import { initialAssetFormState } from './form-state'

export function DidAddForm({
  phoneAssetId,
  slug,
}: {
  phoneAssetId: string
  slug: string
}) {
  const [state, action] = useActionState(addDid, initialAssetFormState)
  const { markEdited, getError } = useServerErrors(state, state.fieldErrors)
  const formRef = useRef<HTMLFormElement>(null)

  // Clear the inputs after a successful add (the action returns to idle).
  useEffect(() => {
    if (state.status === 'idle') formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
      <FormError state={state} />
      <input type="hidden" name="phone_asset_id" value={phoneAssetId} />
      <input type="hidden" name="slug" value={slug} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field data-invalid={getError('number') ? 'true' : undefined}>
          <FieldLabel htmlFor="number">Phone number</FieldLabel>
          <Input
            id="number"
            name="number"
            placeholder="+1XXXXXXXXXX"
            onChange={() => markEdited('number')}
            aria-invalid={getError('number') ? true : undefined}
            required
          />
          <FieldError>{getError('number')}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="assigned_to">Assigned to</FieldLabel>
          <Input id="assigned_to" name="assigned_to" />
        </Field>
        <Field>
          <FieldLabel htmlFor="caller_id_name">Caller ID name</FieldLabel>
          <Input id="caller_id_name" name="caller_id_name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="number_type">Number type</FieldLabel>
          <Input id="number_type" name="number_type" placeholder="Regular" />
        </Field>
      </div>

      <div>
        <SubmitButton label="Add number" pendingLabel="Adding..." />
      </div>
    </form>
  )
}
