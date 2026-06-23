import type { Metadata } from 'next'
import Link from 'next/link'
import { RiAddLine, RiStore2Line } from '@remixicon/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { getVendors } from '@/lib/vendors/queries'
import { formatUsd } from '@/lib/vendors/types'

export const metadata: Metadata = { title: 'Vendors' }

export default async function VendorsPage() {
  const vendors = await getVendors()
  const monthlyTotal = vendors.reduce((sum, v) => sum + v.monthlyTotal, 0)
  const withContracts = vendors.filter((v) => v.contractCount > 0).length

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title="Vendors"
        description="Suppliers, contracts, and recurring monthly spend."
      >
        <Button nativeButton={false} render={<Link href="/vendors/new" />}>
          <RiAddLine className="size-4" aria-hidden /> Add vendor
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryTile label="Vendors" value={vendors.length.toLocaleString()} />
        <SummaryTile
          label="With active contracts"
          value={withContracts.toLocaleString()}
        />
        <SummaryTile label="Monthly spend" value={formatUsd(monthlyTotal)} />
      </div>

      {vendors.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Cadence</th>
                  <th className="px-4 py-3 text-right">Contracts</th>
                  <th className="px-4 py-3 text-right">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr
                    key={v.id}
                    className="group relative border-b border-border last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/vendors/${v.id}`}
                        className="font-medium text-foreground after:absolute after:inset-0 after:content-['']"
                      >
                        {v.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {v.category ? (
                        <Badge variant="secondary">{v.category}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {v.billing_cadence || '—'}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {v.contractCount}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {v.monthlyTotal > 0 ? (
                        formatUsd(v.monthlyTotal)
                      ) : (
                        <span className="font-normal text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {monthlyTotal > 0 ? (
                <tfoot>
                  <tr className="border-t border-border bg-muted/40">
                    <td
                      colSpan={4}
                      className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground"
                    >
                      Total monthly
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatUsd(monthlyTotal)}
                    </td>
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-5 py-4 ring-1 ring-foreground/10">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 font-heading text-2xl font-semibold tabular-nums">
        {value}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <RiStore2Line className="size-6" />
      </span>
      <div>
        <p className="font-medium">No vendors yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first vendor to start tracking contracts and spend.
        </p>
      </div>
      <Button nativeButton={false} render={<Link href="/vendors/new" />}>
        <RiAddLine className="size-4" aria-hidden /> Add vendor
      </Button>
    </div>
  )
}
