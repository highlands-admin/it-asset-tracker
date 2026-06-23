import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AssetForm } from '@/app/(app)/assets/asset-form'
import { PageHeader } from '@/components/page-header'
import { getPropertyBySlug, getPropertyOptions } from '@/lib/assets/queries'

export const metadata: Metadata = { title: 'New asset' }

export default async function NewAssetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [property, properties] = await Promise.all([
    getPropertyBySlug(slug),
    getPropertyOptions(),
  ])
  if (!property) notFound()

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader
        title={`Add asset to ${property.name}`}
        backHref={`/properties/${slug}`}
        backLabel={`Back to ${property.name}`}
      />

      <AssetForm
        mode="create"
        properties={properties}
        cancelHref={`/properties/${slug}`}
        defaults={{ property_id: property.id }}
      />
    </div>
  )
}
