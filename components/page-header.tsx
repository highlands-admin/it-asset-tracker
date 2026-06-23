import Link from 'next/link'
import { RiArrowLeftLine } from '@remixicon/react'
import type { ReactNode } from 'react'

// Shared page title block so every screen has identical heading chrome: an
// optional back link, a font-heading title with an optional accessory (e.g. a
// status badge), an optional muted description, and an actions slot pinned to
// the right on wider viewports.
export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
  titleAccessory,
  children,
}: {
  title: string
  description?: string
  backHref?: string
  backLabel?: string
  titleAccessory?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-3">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RiArrowLeftLine className="size-4" aria-hidden /> {backLabel ?? 'Back'}
        </Link>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold">{title}</h1>
            {titleAccessory}
          </div>
          {description ? (
            <p className="text-base text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {children ? (
          <div className="flex shrink-0 items-center gap-2">{children}</div>
        ) : null}
      </div>
    </header>
  )
}
