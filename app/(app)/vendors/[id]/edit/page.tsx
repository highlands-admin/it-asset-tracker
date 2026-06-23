import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { getVendorById } from '@/lib/vendors/queries'

import { VendorForm } from '../../vendor-form'

export const metadata: Metadata = { title: 'Edit vendor' }

export default async function EditVendorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vendor = await getVendorById(id)
  if (!vendor) notFound()

  const defaults: Record<string, string> = {}
  for (const [key, value] of Object.entries(vendor)) {
    if (value !== null && value !== undefined && typeof value !== 'object') {
      defaults[key] = String(value)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader
        title="Edit vendor"
        backHref={`/vendors/${id}`}
        backLabel="Back to vendor"
      />
      <VendorForm mode="edit" vendorId={id} defaults={defaults} />
    </div>
  )
}
