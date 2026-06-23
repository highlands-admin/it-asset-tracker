import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RiExternalLinkLine, RiPencilLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { DetailList, type DetailRow } from '@/components/detail-list'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/section'
import { getPropertyOptions } from '@/lib/assets/queries'
import { getVendorById } from '@/lib/vendors/queries'
import { formatUsd } from '@/lib/vendors/types'

import { ContractAddForm } from '../contract-add-form'
import { DeleteContractButton } from '../delete-contract-button'
import { DeleteVendorButton } from '../delete-vendor-button'

export const metadata: Metadata = { title: 'Vendor' }

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [vendor, properties] = await Promise.all([
    getVendorById(id),
    getPropertyOptions(),
  ])
  if (!vendor) notFound()

  const contracts = vendor.vendor_contracts ?? []
  const monthlyTotal = contracts.reduce(
    (sum, c) => sum + Number(c.monthly_amount ?? 0),
    0
  )

  const infoRows: DetailRow[] = [
    ['Category', vendor.category],
    ['Billing cadence', vendor.billing_cadence],
    ['Account number', vendor.account_number],
    ['Contact', vendor.contact_name],
    ['Phone', vendor.phone],
    ['Email', vendor.email],
    ['License count', vendor.license_count],
    ['Contract start', vendor.contract_start],
    ['Contract expiry', vendor.contract_expiry],
    ['Renewal date', vendor.renewal_date],
    [
      'Renewal amount',
      vendor.renewal_amount ? formatUsd(vendor.renewal_amount) : null,
    ],
  ]
  const links: [string, string | null][] = [
    ['Website', vendor.url_website],
    ['Support', vendor.url_support],
    ['Portal', vendor.url_portal],
  ]
  const hasLinks = links.some(([, url]) => url)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title={vendor.name}
        description={`${formatUsd(monthlyTotal)}/mo across ${contracts.length} ${
          contracts.length === 1 ? 'contract' : 'contracts'
        }`}
        backHref="/vendors"
        backLabel="All vendors"
      >
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={`/vendors/${id}/edit`} />}
        >
          <RiPencilLine className="size-4" aria-hidden /> Edit
        </Button>
        <DeleteVendorButton vendorId={id} />
      </PageHeader>

      <Section title="Details">
        <div className="flex flex-col gap-5">
          <DetailList rows={infoRows} emptyText="No details recorded." />
          {hasLinks ? (
            <div className="flex flex-wrap gap-3 border-t border-border pt-4 text-sm">
              {links.map(([label, url]) =>
                url ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    <RiExternalLinkLine className="size-4" aria-hidden /> {label}
                  </a>
                ) : null
              )}
            </div>
          ) : null}
          {vendor.notes ? (
            <p className="border-t border-border pt-4 text-sm whitespace-pre-wrap text-muted-foreground">
              {vendor.notes}
            </p>
          ) : null}
        </div>
      </Section>

      <Section
        title="Contracts"
        action={
          monthlyTotal > 0 ? (
            <span className="font-heading text-base font-semibold tabular-nums">
              {formatUsd(monthlyTotal)}/mo
            </span>
          ) : null
        }
      >
        <div className="flex flex-col gap-5">
          {contracts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contracts yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
              {contracts.map((c) => (
                <li
                  key={c.id}
                  className="flex items-start justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0 text-sm">
                    <div className="font-medium">
                      {c.description || '(no description)'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.properties?.name ?? 'All sites'}
                      {c.account_number ? ` · acct ${c.account_number}` : ''}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-medium tabular-nums">
                      {c.monthly_amount
                        ? `${formatUsd(c.monthly_amount)}/mo`
                        : '—'}
                    </span>
                    <DeleteContractButton contractId={c.id} vendorId={id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border pt-5">
            <ContractAddForm vendorId={id} properties={properties} />
          </div>
        </div>
      </Section>
    </div>
  )
}
