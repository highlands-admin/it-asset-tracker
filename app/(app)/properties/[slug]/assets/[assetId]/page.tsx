import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RiPencilLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import { AssetStatusBadge } from '@/components/assets/asset-status-badge'
import { DetailList, type DetailRow } from '@/components/detail-list'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/section'
import { DeleteAssetButton } from '@/app/(app)/assets/delete-asset-button'
import { DeleteDidButton } from '@/app/(app)/assets/delete-did-button'
import { DidAddForm } from '@/app/(app)/assets/did-add-form'
import { ASSET_TYPE_LABELS } from '@/lib/assets/types'
import { getAssetWithDetail } from '@/lib/assets/queries'

export const metadata: Metadata = { title: 'Asset' }

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ slug: string; assetId: string }>
}) {
  const { slug, assetId } = await params
  const asset = await getAssetWithDetail(assetId)
  if (!asset) notFound()

  const name = [asset.make, asset.model].filter(Boolean).join(' ') || '(unnamed)'

  const baseRows: DetailRow[] = [
    ['Type', ASSET_TYPE_LABELS[asset.type]],
    ['Category', asset.category],
    ['Property', asset.properties?.name ?? 'Unassigned'],
    ['Sub-location', asset.sub_location],
    ['Assigned to', asset.assigned_user],
    ['Serial', asset.serial],
    ['Hostname', asset.hostname],
    ['MAC address', asset.mac_address],
    ['IP address', asset.ip_address],
    ['Entry date', asset.entry_date],
    ['Last seen on site', asset.last_seen_on_site],
  ]

  const detailRows: DetailRow[] = asset.asset_computers
    ? [
        ['OS version', asset.asset_computers.os_version],
        ['OS product key', asset.asset_computers.os_product_key],
        ['Product ID', asset.asset_computers.product_id],
        ['Office version', asset.asset_computers.office_version],
        ['Office product key', asset.asset_computers.office_product_key],
        ['Software source', asset.asset_computers.software_source],
        ['Processor', asset.asset_computers.processor],
        ['RAM', asset.asset_computers.ram],
        ['Storage', asset.asset_computers.storage],
        ['Graphics', asset.asset_computers.graphics],
        ['System type', asset.asset_computers.system_type],
        ['Device ID', asset.asset_computers.device_id],
      ]
    : asset.asset_software
      ? [
          ['Office version', asset.asset_software.office_version],
          ['Office product key', asset.asset_software.office_product_key],
          ['Software source', asset.asset_software.software_source],
        ]
      : asset.asset_networks
        ? [
            ['ISP', asset.asset_networks.isp],
            ['Port count', asset.asset_networks.port_count],
            ['Managed', asset.asset_networks.managed],
            ['PoE', asset.asset_networks.poe],
            ['VLAN', asset.asset_networks.vlan],
            ['WiFi standard', asset.asset_networks.wifi_standard],
            ['Admin SSID', asset.asset_networks.admin_ssid],
            ['Resident SSID', asset.asset_networks.resident_ssid],
            ['Firmware', asset.asset_networks.firmware_version],
            ['License key', asset.asset_networks.license_key],
            ['Renewal date', asset.asset_networks.renewal_date],
            ['Vendor', asset.asset_networks.vendor],
            ['Warranty expiry', asset.asset_networks.warranty_expiry],
            ['Purchase date', asset.asset_networks.purchase_date],
          ]
        : asset.asset_phones
          ? [
              ['Provider', asset.asset_phones.provider],
              ['Extension', asset.asset_phones.extension],
              ['Line type', asset.asset_phones.line_type],
              ['Line status', asset.asset_phones.line_status],
              ['Public IP', asset.asset_phones.public_ip],
              ['Private IP', asset.asset_phones.private_ip],
              ['Route to', asset.asset_phones.route_to],
              ['Carrier', asset.asset_phones.carrier],
              ['Activation code', asset.asset_phones.activation_code],
              ['Last provisioned', asset.asset_phones.last_provisioned],
              ['Avg monthly cost', asset.asset_phones.avg_monthly_cost],
              ['Cost type', asset.asset_phones.cost_type],
              ['MRC notes', asset.asset_phones.mrc_notes],
            ]
          : []

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title={name}
        backHref={`/properties/${slug}`}
        backLabel="Back to inventory"
        titleAccessory={<AssetStatusBadge status={asset.status} />}
      >
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={`/properties/${slug}/assets/${assetId}/edit`} />}
        >
          <RiPencilLine className="size-4" aria-hidden /> Edit
        </Button>
        <DeleteAssetButton assetId={assetId} redirectSlug={slug} />
      </PageHeader>

      <Section title="Details">
        <DetailList rows={baseRows} emptyText="No details recorded." />
      </Section>

      {detailRows.length > 0 ? (
        <Section title={`${ASSET_TYPE_LABELS[asset.type]} details`}>
          <DetailList rows={detailRows} emptyText="No details recorded." />
        </Section>
      ) : null}

      {asset.type === 'phone' ? (
        <Section title="Phone numbers (DIDs)">
          <div className="flex flex-col gap-5">
            {asset.dids.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No numbers assigned yet.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
                {asset.dids.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <div>
                      <span className="font-medium tabular-nums">{d.number}</span>
                      {d.assigned_to ? (
                        <span className="text-muted-foreground">
                          {' '}
                          — {d.assigned_to}
                        </span>
                      ) : null}
                      {d.number_type ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {d.number_type}
                        </span>
                      ) : null}
                    </div>
                    <DeleteDidButton
                      didId={d.id}
                      phoneAssetId={asset.id}
                      slug={slug}
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-border pt-5">
              <DidAddForm phoneAssetId={asset.id} slug={slug} />
            </div>
          </div>
        </Section>
      ) : null}

      {asset.notes ? (
        <Section title="Notes">
          <p className="text-sm whitespace-pre-wrap">{asset.notes}</p>
        </Section>
      ) : null}
    </div>
  )
}
