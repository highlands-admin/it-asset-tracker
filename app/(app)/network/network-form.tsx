'use client'

import { useActionState } from 'react'

import { FormError } from '@/components/auth/form-error'
import { FormFooter } from '@/components/forms/form-footer'
import {
  FormSection,
  TextAreaField,
  TextField,
} from '@/components/forms/form-fields'
import type { AssetFormState } from '@/app/(app)/assets/form-state'

import { updateNetworkSummary } from './actions'

const initialState: AssetFormState = { status: 'idle' }
type Defaults = Record<string, string | null | undefined>

export function NetworkForm({
  propertyId,
  slug,
  cancelHref = '/network',
  defaults = {},
}: {
  propertyId: string
  slug: string
  cancelHref?: string
  defaults?: Defaults
}) {
  const [state, action] = useActionState(updateNetworkSummary, initialState)

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormError state={state} />
      <input type="hidden" name="property_id" value={propertyId} />
      <input type="hidden" name="slug" value={slug} />

      <FormSection title="Internet" description="Provider, plan, and edge hardware.">
        <TextField name="isp" label="ISP" defaultValue={defaults.isp} />
        <TextField name="isp_plan" label="ISP plan" defaultValue={defaults.isp_plan} />
        <TextField name="isp_account_number" label="ISP account #" defaultValue={defaults.isp_account_number} />
        <TextField name="isp_monthly_cost" label="ISP monthly ($)" defaultValue={defaults.isp_monthly_cost} />
        <TextField name="router" label="Router / firewall" defaultValue={defaults.router} />
        <TextField name="appliance" label="Appliance" defaultValue={defaults.appliance} />
      </FormSection>

      <FormSection title="LAN / WiFi" description="Switches, access points, and SSIDs.">
        <TextField name="switches" label="Switch count" defaultValue={defaults.switches} />
        <TextField name="switch_models" label="Switch models" defaultValue={defaults.switch_models} />
        <TextField name="aps" label="AP count" defaultValue={defaults.aps} />
        <TextField name="ap_make" label="AP make" defaultValue={defaults.ap_make} />
        <TextField name="ap_model" label="AP model" defaultValue={defaults.ap_model} />
        <TextField name="wifi_standard" label="WiFi standard" defaultValue={defaults.wifi_standard} />
        <TextField name="admin_ssid" label="Admin SSID" defaultValue={defaults.admin_ssid} />
        <TextField name="resident_ssid" label="Resident SSID" defaultValue={defaults.resident_ssid} />
      </FormSection>

      <FormSection title="Services" description="Phone, cameras, and TV.">
        <TextField name="phone_system" label="Phone system" defaultValue={defaults.phone_system} />
        <TextField name="cameras" label="Cameras (label)" defaultValue={defaults.cameras} />
        <TextField name="tv" label="TV provider" defaultValue={defaults.tv} />
        <TextField name="tv_account" label="TV account #" defaultValue={defaults.tv_account} />
        <TextField name="tv_monthly_cost" label="TV monthly ($)" defaultValue={defaults.tv_monthly_cost} />
      </FormSection>

      <FormSection title="Notes" full>
        <TextAreaField name="notes" label="Notes" defaultValue={defaults.notes} rows={3} />
      </FormSection>

      <FormFooter cancelHref={cancelHref} submitLabel="Save summary" />
    </form>
  )
}
