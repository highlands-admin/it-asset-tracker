'use client'

import { RiDeleteBinLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { deleteContract } from './actions'

export function DeleteContractButton({
  contractId,
  vendorId,
}: {
  contractId: string
  vendorId: string
}) {
  return (
    <form
      action={deleteContract}
      onSubmit={(e) => {
        if (!confirm('Remove this contract?')) e.preventDefault()
      }}
    >
      <input type="hidden" name="contract_id" value={contractId} />
      <input type="hidden" name="vendor_id" value={vendorId} />
      <Button type="submit" variant="ghost" size="icon-sm" aria-label="Remove contract">
        <RiDeleteBinLine className="size-4" aria-hidden />
      </Button>
    </form>
  )
}
