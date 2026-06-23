import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'

import { VendorForm } from '../vendor-form'

export const metadata: Metadata = { title: 'New vendor' }

export default function NewVendorPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <PageHeader title="Add vendor" backHref="/vendors" backLabel="All vendors" />
      <VendorForm mode="create" />
    </div>
  )
}
