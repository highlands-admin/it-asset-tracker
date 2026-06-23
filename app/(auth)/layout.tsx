import { RiCheckLine, RiServerLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { ThemeToggle } from '@/components/nav/theme-toggle'

const FEATURES = [
  'Track every device across all your properties',
  'Vendor contracts and renewal reminders in one place',
  'Full history and a complete audit trail',
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-svh overflow-hidden lg:grid-cols-2">
      {/* Brand panel: the left half on desktop, hidden on mobile. Carries the
          single brand wordmark (top-left of the page). */}
      <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:p-12">
        {/* Photograph behind a teal brand overlay. The gradient is strongest on
            the left, where the copy sits, and lighter on the right so the image
            shows through. */}
        <Image
          src="/auth-panel-2.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/30"
        />

        <div className="relative flex items-center gap-2.5 font-heading text-xl font-semibold">
          <BrandMark variant="onColor" />
          IT Asset Tracker
        </div>

        <div className="relative my-auto max-w-md">
          <h2 className="font-heading text-5xl font-bold leading-[1.15]">
            Your infrastructure, in one place.
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-primary-foreground/90">
            Track every asset, vendor, and network device across all your senior
            living communities, with renewals and history at your fingertips.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <RiCheckLine className="size-4" aria-hidden="true" />
                </span>
                <span className="text-base font-medium leading-relaxed text-primary-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form column: the right half on desktop. Fixed to the viewport height and
          scrollable on its own, so a tall form (sign up) never scrolls the whole
          page. my-auto centers the form when it fits and releases to allow
          scrolling when it does not. */}
      <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6 sm:px-10">
        <div className="flex items-center">
          {/* The brand panel is hidden on mobile, so show the wordmark here only
              there to avoid repeating it on desktop. */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading text-base font-semibold lg:hidden"
          >
            <BrandMark />
            IT Asset Tracker
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="my-auto w-full">
          <div className="mx-auto w-full max-w-[30rem]">{children}</div>
        </div>
      </div>
    </div>
  )
}

function BrandMark({ variant = 'default' }: { variant?: 'default' | 'onColor' }) {
  return (
    <span
      className={
        variant === 'onColor'
          ? 'flex size-8 items-center justify-center rounded-lg bg-white/15 text-primary-foreground'
          : 'flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20'
      }
    >
      <RiServerLine className="size-5" aria-hidden="true" />
    </span>
  )
}
