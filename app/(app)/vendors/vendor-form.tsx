'use client'

import { useActionState } from 'react'

import { FormError } from '@/components/auth/form-error'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormFooter } from '@/components/forms/form-footer'
import {
  FormSection,
  NativeSelect,
  TextAreaField,
  TextField,
} from '@/components/forms/form-fields'
import { useServerErrors } from '@/lib/hooks/use-server-errors'
import { BILLING_CADENCES, VENDOR_CATEGORIES } from '@/lib/vendors/types'
import type { AssetFormState } from '@/app/(app)/assets/form-state'

import { createVendor, updateVendor } from './actions'

const initialState: AssetFormState = { status: 'idle' }
type Defaults = Record<string, string | null | undefined>

export function VendorForm({
  mode,
  vendorId,
  defaults = {},
}: {
  mode: 'create' | 'edit'
  vendorId?: string
  defaults?: Defaults
}) {
  const action = mode === 'create' ? createVendor : updateVendor
  const cancelHref = mode === 'edit' && vendorId ? `/vendors/${vendorId}` : '/vendors'
  const [state, formAction] = useActionState(action, initialState)
  const { markEdited, getError } = useServerErrors(state, state.fieldErrors)
  const nameError = getError('name')

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormError state={state} />
      {mode === 'edit' ? (
        <input type="hidden" name="vendor_id" value={vendorId} />
      ) : null}

      <FormSection title="Vendor">
        <Field data-invalid={nameError ? 'true' : undefined}>
          <FieldLabel htmlFor="name">Vendor name</FieldLabel>
          <Input
            id="name"
            name="name"
            defaultValue={defaults.name ?? ''}
            onChange={() => markEdited('name')}
            aria-invalid={nameError ? true : undefined}
            required
          />
          <FieldError>{nameError}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <NativeSelect id="category" name="category" defaultValue={defaults.category ?? ''}>
            <option value="">—</option>
            {VENDOR_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor="billing_cadence">Billing cadence</FieldLabel>
          <NativeSelect
            id="billing_cadence"
            name="billing_cadence"
            defaultValue={defaults.billing_cadence ?? ''}
          >
            <option value="">—</option>
            {BILLING_CADENCES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <TextField name="account_number" label="Account number" defaultValue={defaults.account_number} />
        <TextField name="license_count" label="License count" defaultValue={defaults.license_count} />
      </FormSection>

      <FormSection title="Contact">
        <TextField name="contact_name" label="Contact name" defaultValue={defaults.contact_name} />
        <TextField name="phone" label="Phone" defaultValue={defaults.phone} />
        <Field data-invalid={getError('email') ? 'true' : undefined}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={defaults.email ?? ''}
            onChange={() => markEdited('email')}
            aria-invalid={getError('email') ? true : undefined}
          />
          <FieldError>{getError('email')}</FieldError>
        </Field>
        <TextField name="url_website" label="Website" defaultValue={defaults.url_website} placeholder="https://..." />
        <TextField name="url_support" label="Support URL" defaultValue={defaults.url_support} placeholder="https://..." />
        <TextField name="url_portal" label="Portal URL" defaultValue={defaults.url_portal} placeholder="https://..." />
      </FormSection>

      <FormSection title="Renewal">
        <TextField name="contract_start" label="Contract start" type="date" defaultValue={defaults.contract_start} />
        <TextField name="contract_expiry" label="Contract expiry" type="date" defaultValue={defaults.contract_expiry} />
        <TextField name="renewal_date" label="Renewal date" type="date" defaultValue={defaults.renewal_date} />
        <TextField name="renewal_amount" label="Renewal amount ($)" defaultValue={defaults.renewal_amount} />
        <TextField name="renewal_notes" label="Renewal notes" defaultValue={defaults.renewal_notes} />
      </FormSection>

      <FormSection title="Notes" full>
        <TextAreaField name="notes" label="Notes" defaultValue={defaults.notes} />
      </FormSection>

      <FormFooter
        cancelHref={cancelHref}
        submitLabel={mode === 'create' ? 'Create vendor' : 'Save changes'}
      />
    </form>
  )
}
