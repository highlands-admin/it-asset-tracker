'use client'

import { useActionState, useState } from 'react'
import { RiArrowDownSLine } from '@remixicon/react'

import { FormError } from '@/components/auth/form-error'
import { FormFooter } from '@/components/forms/form-footer'
import { TextAreaField } from '@/components/forms/form-fields'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useServerErrors } from '@/lib/hooks/use-server-errors'
import {
  ASSET_STATUSES,
  ASSET_TYPE_LABELS,
  ASSET_TYPES,
  CATEGORIES_BY_TYPE,
  PHONE_LINE_STATUSES,
  PHONE_LINE_TYPES,
  type AssetType,
} from '@/lib/assets/types'

import { createAsset, updateAsset } from './actions'
import { initialAssetFormState } from './form-state'

type Defaults = Record<string, string | null | undefined>

export function AssetForm({
  mode,
  assetId,
  lockedType,
  properties,
  cancelHref = '/properties',
  defaults = {},
}: {
  mode: 'create' | 'edit'
  assetId?: string
  lockedType?: AssetType
  properties: { id: string; name: string }[]
  cancelHref?: string
  defaults?: Defaults
}) {
  const action = mode === 'create' ? createAsset : updateAsset
  const [state, formAction] = useActionState(action, initialAssetFormState)
  const { markEdited, getError } = useServerErrors(state, state.fieldErrors)

  const [type, setType] = useState<AssetType>(
    lockedType ?? (defaults.type as AssetType) ?? 'computer'
  )
  const categories = CATEGORIES_BY_TYPE[type]
  const [category, setCategory] = useState<string>(
    (defaults.category as string) ?? categories[0]
  )

  function onTypeChange(next: AssetType) {
    setType(next)
    if (!CATEGORIES_BY_TYPE[next].includes(category)) {
      setCategory(CATEGORIES_BY_TYPE[next][0])
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormError state={state} />

      {mode === 'edit' ? (
        <input type="hidden" name="asset_id" value={assetId} />
      ) : null}
      {/* Type is immutable on edit; submitted as a hidden field for routing. */}
      <input type="hidden" name="type" value={type} />

      <Section title="Classification">
        <Field>
          <FieldLabel>Type</FieldLabel>
          {mode === 'edit' ? (
            <Input value={ASSET_TYPE_LABELS[type]} disabled readOnly />
          ) : (
            <NativeSelect
              value={type}
              onChange={(e) => onTypeChange(e.target.value as AssetType)}
            >
              {ASSET_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ASSET_TYPE_LABELS[t]}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>

        <Field data-invalid={getError('category') ? 'true' : undefined}>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <NativeSelect
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              markEdited('category')
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </NativeSelect>
          <FieldError>{getError('category')}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="property_id">Property</FieldLabel>
          <NativeSelect
            id="property_id"
            name="property_id"
            defaultValue={defaults.property_id ?? ''}
          >
            <option value="">Unassigned</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </NativeSelect>
        </Field>

        {/* Phones derive their base status from the line status below. */}
        {type !== 'phone' ? (
          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <NativeSelect
              id="status"
              name="status"
              defaultValue={defaults.status ?? 'Active'}
            >
              {ASSET_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </NativeSelect>
          </Field>
        ) : null}

        <Text name="sub_location" label="Sub-location" defaults={defaults} />
        <Text name="entry_date" label="Entry date" type="date" defaults={defaults} />
      </Section>

      <Section title="Device">
        <Text name="assigned_user" label="Assigned to" defaults={defaults} />
        <Text name="make" label="Make" defaults={defaults} />
        <Text name="model" label="Model" defaults={defaults} />
        <Text name="serial" label="Serial number" defaults={defaults} />
        <Text name="hostname" label="Hostname" defaults={defaults} />
        <Text name="mac_address" label="MAC address" defaults={defaults} />
        <Text name="ip_address" label="IP address" defaults={defaults} />
        <Text
          name="last_seen_on_site"
          label="Last seen on site"
          type="date"
          defaults={defaults}
        />
      </Section>

      {type === 'computer' ? (
        <Section title="Computer details">
          <Text name="os_version" label="OS version" defaults={defaults} />
          <Text name="os_product_key" label="OS product key" defaults={defaults} />
          <Text name="product_id" label="Product ID" defaults={defaults} />
          <Text name="office_version" label="Office version" defaults={defaults} />
          <Text name="office_product_key" label="Office product key" defaults={defaults} />
          <Text name="software_source" label="Software source" defaults={defaults} />
          <Text name="processor" label="Processor" defaults={defaults} />
          <Text name="ram" label="RAM" defaults={defaults} />
          <Text name="storage" label="Storage" defaults={defaults} />
          <Text name="graphics" label="Graphics" defaults={defaults} />
          <Text name="system_type" label="System type" defaults={defaults} />
          <Text name="device_id" label="Device ID" defaults={defaults} />
        </Section>
      ) : null}

      {type === 'software' ? (
        <Section title="License details">
          <Text name="office_version" label="Office version" defaults={defaults} />
          <Text name="office_product_key" label="Office product key" defaults={defaults} />
          <Text name="software_source" label="Software source" defaults={defaults} />
        </Section>
      ) : null}

      {type === 'network' ? (
        <Section title="Network details">
          <Text name="isp" label="ISP" defaults={defaults} />
          <Text name="port_count" label="Port count" defaults={defaults} />
          <Field>
            <FieldLabel htmlFor="managed">Managed</FieldLabel>
            <NativeSelect id="managed" name="managed" defaultValue={defaults.managed ?? ''}>
              <option value="">—</option>
              <option value="Managed">Managed</option>
              <option value="Unmanaged">Unmanaged</option>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="poe">PoE</FieldLabel>
            <NativeSelect id="poe" name="poe" defaultValue={defaults.poe ?? ''}>
              <option value="">—</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </NativeSelect>
          </Field>
          <Text name="vlan" label="VLAN" defaults={defaults} />
          <Field>
            <FieldLabel htmlFor="wifi_standard">WiFi standard</FieldLabel>
            <NativeSelect
              id="wifi_standard"
              name="wifi_standard"
              defaultValue={defaults.wifi_standard ?? ''}
            >
              <option value="">—</option>
              <option value="WiFi 5">WiFi 5</option>
              <option value="WiFi 6">WiFi 6</option>
              <option value="WiFi 6E">WiFi 6E</option>
              <option value="WiFi 5/6">WiFi 5/6</option>
            </NativeSelect>
          </Field>
          <Text name="admin_ssid" label="Admin SSID" defaults={defaults} />
          <Text name="resident_ssid" label="Resident SSID" defaults={defaults} />
          <Text name="firmware_version" label="Firmware" defaults={defaults} />
          <Text name="license_key" label="License key" defaults={defaults} />
          <Text name="renewal_date" label="Renewal date" type="date" defaults={defaults} />
          <Text name="vendor" label="Vendor" defaults={defaults} />
          <Text name="warranty_expiry" label="Warranty expiry" type="date" defaults={defaults} />
          <Text name="purchase_date" label="Purchase date" type="date" defaults={defaults} />
        </Section>
      ) : null}

      {type === 'phone' ? (
        <Section title="Phone details">
          <Text name="provider" label="Provider" defaults={defaults} />
          <Text name="extension" label="Extension" defaults={defaults} />
          <Field>
            <FieldLabel htmlFor="line_type">Line type</FieldLabel>
            <NativeSelect
              id="line_type"
              name="line_type"
              defaultValue={defaults.line_type ?? ''}
            >
              <option value="">—</option>
              {PHONE_LINE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="line_status">Line status</FieldLabel>
            <NativeSelect
              id="line_status"
              name="line_status"
              defaultValue={defaults.line_status ?? 'Ready'}
            >
              {PHONE_LINE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Text name="public_ip" label="Public IP" defaults={defaults} />
          <Text name="private_ip" label="Private IP" defaults={defaults} />
          <Text name="route_to" label="Route to" defaults={defaults} />
          <Text name="carrier" label="Carrier" defaults={defaults} />
          <Text name="activation_code" label="Activation code" defaults={defaults} />
          <Text
            name="last_provisioned"
            label="Last provisioned"
            type="date"
            defaults={defaults}
          />
          <Text name="avg_monthly_cost" label="Avg monthly cost ($)" defaults={defaults} />
          <Field>
            <FieldLabel htmlFor="cost_type">Cost type</FieldLabel>
            <NativeSelect
              id="cost_type"
              name="cost_type"
              defaultValue={defaults.cost_type ?? ''}
            >
              <option value="">—</option>
              <option value="actual">Actual</option>
              <option value="estimated">Estimated</option>
            </NativeSelect>
          </Field>
          <Text name="mrc_notes" label="MRC notes" defaults={defaults} />
        </Section>
      ) : null}

      <Section title="Notes" full>
        <TextAreaField name="notes" label="Notes" defaultValue={defaults.notes} />
      </Section>

      <FormFooter
        cancelHref={cancelHref}
        submitLabel={mode === 'create' ? 'Create asset' : 'Save changes'}
      />
    </form>
  )
}

function Section({
  title,
  children,
  full,
}: {
  title: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <section className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading text-base font-semibold">{title}</h2>
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-4 p-5',
          !full && 'sm:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {children}
      </div>
    </section>
  )
}

function Text({
  name,
  label,
  type = 'text',
  defaults,
}: {
  name: string
  label: string
  type?: string
  defaults: Defaults
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input id={name} name={name} type={type} defaultValue={defaults[name] ?? ''} />
    </Field>
  )
}

function NativeSelect({
  className,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    // Native arrow hidden and replaced with our own chevron for consistent
    // placement across browsers. See the shared copy in components/forms.
    <div className="relative">
      <select
        className={cn(
          'h-8 w-full appearance-none rounded-lg border border-input bg-transparent pl-2.5 pr-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          className
        )}
        {...props}
      />
      <RiArrowDownSLine
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}
