'use client'

import { useActionState, useEffect, useRef } from 'react'

import { FormError } from '@/components/auth/form-error'
import { SubmitButton } from '@/components/auth/submit-button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/forms/form-fields'
import type { AssetFormState } from '@/app/(app)/assets/form-state'

import { addContract } from './actions'

const initialState: AssetFormState = { status: 'idle' }

export function ContractAddForm({
  vendorId,
  properties,
}: {
  vendorId: string
  properties: { id: string; name: string }[]
}) {
  const [state, action] = useActionState(addContract, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'idle') formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
      <FormError state={state} />
      <input type="hidden" name="vendor_id" value={vendorId} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field className="lg:col-span-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input id="description" name="description" placeholder="Internet — Rome" />
        </Field>
        <Field>
          <FieldLabel htmlFor="property_id">Property</FieldLabel>
          <NativeSelect id="property_id" name="property_id" defaultValue="">
            <option value="">All sites</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor="monthly_amount">Monthly amount ($)</FieldLabel>
          <Input id="monthly_amount" name="monthly_amount" placeholder="0.00" />
        </Field>
        <Field>
          <FieldLabel htmlFor="account_number">Account number</FieldLabel>
          <Input id="account_number" name="account_number" />
        </Field>
        <Field>
          <FieldLabel htmlFor="start_date">Start date</FieldLabel>
          <Input id="start_date" name="start_date" type="date" />
        </Field>
        <Field>
          <FieldLabel htmlFor="end_date">End date</FieldLabel>
          <Input id="end_date" name="end_date" type="date" />
        </Field>
      </div>

      <div>
        <SubmitButton label="Add contract" pendingLabel="Adding..." />
      </div>
    </form>
  )
}
