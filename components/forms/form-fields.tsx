import type { ReactNode } from 'react'
import { RiArrowDownSLine } from '@remixicon/react'

import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Shared presentational form primitives used by the vendor and contract forms.

export function FormSection({
  title,
  description,
  children,
  full,
}: {
  title: string
  description?: string
  children: ReactNode
  full?: boolean
}) {
  return (
    <section className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading text-base font-semibold">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
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

export function TextField({
  name,
  label,
  type = 'text',
  defaultValue,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  defaultValue?: string | null
  placeholder?: string
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
      />
    </Field>
  )
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  name: string
  label: string
  defaultValue?: string | null
  rows?: number
  placeholder?: string
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </Field>
  )
}

export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    // The native dropdown arrow is hidden (appearance-none) and replaced with
    // our own chevron, so its placement is consistent across browsers and sits
    // a controlled distance from the right edge instead of the OS default.
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
