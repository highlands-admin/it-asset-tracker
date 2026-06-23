import type { Metadata } from 'next'
import Link from 'next/link'
import {
  RiArrowRightUpLine,
  RiBuilding2Line,
  RiInboxUnarchiveLine,
} from '@remixicon/react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { getPropertiesWithCounts } from '@/lib/assets/queries'
import { getSpendByProperty } from '@/lib/vendors/queries'
import { formatUsd } from '@/lib/vendors/types'

export const metadata: Metadata = { title: 'Properties' }

export default async function PropertiesPage() {
  const [{ properties, unassignedCount }, spendByProperty] = await Promise.all([
    getPropertiesWithCounts(),
    getSpendByProperty(),
  ])

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title="Properties"
        description="Select a property to view and manage its IT assets."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => {
          const spend = spendByProperty.get(p.id)
          return (
            <Link key={p.id} href={`/properties/${p.slug}`} className="group block">
              <Card className="h-full transition-shadow hover:shadow-lg dark:hover:ring-foreground/20">
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <RiBuilding2Line className="size-5" />
                    </span>
                    <RiArrowRightUpLine className="size-5 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
                  </div>

                  <div className="min-w-0">
                    <div className="font-heading font-semibold">{p.name}</div>
                    {p.address ? (
                      <div className="truncate text-sm text-muted-foreground">
                        {p.address}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {p.assetCount} {p.assetCount === 1 ? 'asset' : 'assets'}
                    </Badge>
                    {spend ? (
                      <Badge variant="default">{formatUsd(spend)}/mo</Badge>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}

        {unassignedCount > 0 ? (
          <Link href="/properties/unassigned" className="group block">
            <Card className="h-full border border-dashed border-border bg-transparent shadow-none ring-0 transition-colors hover:bg-muted/40">
              <CardContent className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <RiInboxUnarchiveLine className="size-5" />
                  </span>
                  <RiArrowRightUpLine className="size-5 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-semibold">Unassigned</div>
                  <div className="truncate text-sm text-muted-foreground">
                    Assets with no property
                  </div>
                </div>
                <div className="mt-auto">
                  <Badge variant="secondary">
                    {unassignedCount} {unassignedCount === 1 ? 'asset' : 'assets'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
