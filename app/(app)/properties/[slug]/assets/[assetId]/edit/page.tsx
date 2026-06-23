import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AssetForm } from '@/app/(app)/assets/asset-form'
import { PageHeader } from '@/components/page-header'
import { getAssetWithDetail, getPropertyOptions } from '@/lib/assets/queries'

export const metadata: Metadata = { title: 'Edit asset' }

export default async function EditAssetPage({
  params,
}: {
  params: Promise<{ slug: string; assetId: string }>
}) {
  const { slug, assetId } = await params
  const [asset, properties] = await Promise.all([
    getAssetWithDetail(assetId),
    getPropertyOptions(),
  ])
  if (!asset) notFound()

  // Flatten base + the one populated detail row into string defaults for the form.
  const detail =
    asset.asset_computers ?? asset.asset_software ?? asset.asset_networks ?? {}
  const defaults: Record<string, string> = {}
  const merged: Record<string, unknown> = { ...asset, ...detail }
  for (const [key, value] of Object.entries(merged)) {
    if (value !== null && value !== undefined && typeof value !== 'object') {
      defaults[key] = String(value)
    }
  }
  defaults.property_id = asset.property_id ?? ''

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader
        title="Edit asset"
        backHref={`/properties/${slug}/assets/${assetId}`}
        backLabel="Back to asset"
      />

      <AssetForm
        mode="edit"
        assetId={assetId}
        lockedType={asset.type}
        properties={properties}
        cancelHref={`/properties/${slug}/assets/${assetId}`}
        defaults={defaults}
      />
    </div>
  )
}
