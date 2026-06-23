'use client'

import { RiDeleteBinLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { deleteDid } from './actions'

export function DeleteDidButton({
  didId,
  phoneAssetId,
  slug,
}: {
  didId: string
  phoneAssetId: string
  slug: string
}) {
  return (
    <form
      action={deleteDid}
      onSubmit={(e) => {
        if (!confirm('Remove this number?')) e.preventDefault()
      }}
    >
      <input type="hidden" name="did_id" value={didId} />
      <input type="hidden" name="phone_asset_id" value={phoneAssetId} />
      <input type="hidden" name="slug" value={slug} />
      <Button type="submit" variant="ghost" size="icon-sm" aria-label="Remove number">
        <RiDeleteBinLine className="size-4" aria-hidden />
      </Button>
    </form>
  )
}
