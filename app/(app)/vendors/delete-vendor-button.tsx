'use client'

import { RiDeleteBinLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { deleteVendor } from './actions'

export function DeleteVendorButton({ vendorId }: { vendorId: string }) {
  return (
    <form
      action={deleteVendor}
      onSubmit={(e) => {
        if (
          !confirm(
            'Delete this vendor and its contracts? Network devices linked to it keep their text vendor label.'
          )
        ) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="vendor_id" value={vendorId} />
      <Button type="submit" variant="destructive" size="sm">
        <RiDeleteBinLine className="size-4" aria-hidden /> Delete
      </Button>
    </form>
  )
}
