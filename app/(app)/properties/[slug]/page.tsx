import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RiAddLine, RiInboxLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { AssetStatusBadge } from '@/components/assets/asset-status-badge'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/section'
import { ASSET_TYPE_LABELS } from '@/lib/assets/types'
import { getAssetsForProperty, getPropertyBySlug } from '@/lib/assets/queries'
import { getPropertySpend } from '@/lib/vendors/queries'
import { formatUsd } from '@/lib/vendors/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'unassigned') return { title: 'Unassigned assets' }
  const property = await getPropertyBySlug(slug)
  return { title: property ? property.name : 'Property' }
}

export default async function PropertyInventoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const isUnassigned = slug === 'unassigned'

  const property = isUnassigned ? null : await getPropertyBySlug(slug)
  if (!isUnassigned && !property) notFound()

  const assets = await getAssetsForProperty(isUnassigned ? null : property!.id)
  const spend = isUnassigned ? null : await getPropertySpend(property!.id)
  const title = isUnassigned ? 'Unassigned assets' : property!.name

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title={title}
        description={property?.address ?? undefined}
        backHref="/properties"
        backLabel="All properties"
      >
        {!isUnassigned ? (
          <Button
            nativeButton={false}
            render={<Link href={`/properties/${slug}/assets/new`} />}
          >
            <RiAddLine className="size-4" aria-hidden /> Add asset
          </Button>
        ) : null}
      </PageHeader>

      {spend && spend.total > 0 ? (
        <Section
          title="Monthly vendor spend"
          action={
            <span className="font-heading text-lg font-semibold tabular-nums">
              {formatUsd(spend.total)}/mo
            </span>
          }
        >
          <ul className="flex flex-col gap-2 text-sm">
            {spend.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="truncate text-muted-foreground">
                  {item.label}
                </span>
                <span className="shrink-0 tabular-nums">
                  {formatUsd(item.amount)}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <AssetTable assets={assets} slug={slug} />
    </div>
  )
}

function AssetTable({
  assets,
  slug,
}: {
  assets: Awaited<ReturnType<typeof getAssetsForProperty>>
  slug: string
}) {
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <RiInboxLine className="size-6" />
        </span>
        <div>
          <p className="font-medium">No assets here yet</p>
          <p className="text-sm text-muted-foreground">
            Assets added to this property will appear in this list.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Assigned to</th>
              <th className="px-4 py-3">Serial</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => {
              const name =
                [a.make, a.model].filter(Boolean).join(' ') || '(unnamed)'
              return (
                <tr
                  key={a.id}
                  className="group relative border-b border-border last:border-0 transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/properties/${slug}/assets/${a.id}`}
                      className="font-medium text-foreground after:absolute after:inset-0 after:content-['']"
                    >
                      {name}
                    </Link>
                    {a.sub_location ? (
                      <div className="text-xs text-muted-foreground">
                        {a.sub_location}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {ASSET_TYPE_LABELS[a.type]}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {a.assigned_user || '—'}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {a.serial || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <AssetStatusBadge status={a.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
