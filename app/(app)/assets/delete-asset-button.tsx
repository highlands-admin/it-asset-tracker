'use client'

import { RiDeleteBinLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { deleteAsset } from './actions'

export function DeleteAssetButton({
  assetId,
  redirectSlug,
}: {
  assetId: string
  redirectSlug: string
}) {
  return (
    <form
      action={deleteAsset}
      onSubmit={(e) => {
        if (!confirm('Delete this asset? This cannot be undone.')) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="asset_id" value={assetId} />
      <input type="hidden" name="redirect_slug" value={redirectSlug} />
      <Button type="submit" variant="destructive" size="sm">
        <RiDeleteBinLine className="size-4" aria-hidden /> Delete
      </Button>
    </form>
  )
}
