import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { getNetworkSummaryForSlug } from '@/lib/network/queries'

import { NetworkForm } from '../../network-form'

export const metadata: Metadata = { title: 'Edit network summary' }

export default async function EditNetworkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getNetworkSummaryForSlug(slug)
  if (!result) notFound()

  const { property, summary } = result
  const defaults: Record<string, string> = {}
  if (summary) {
    for (const [key, value] of Object.entries(summary)) {
      if (value !== null && value !== undefined && typeof value !== 'object') {
        defaults[key] = String(value)
      }
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader
        title={`${property.name} network summary`}
        backHref="/network"
        backLabel="All properties"
      />
      <NetworkForm propertyId={property.id} slug={slug} defaults={defaults} />
    </div>
  )
}
