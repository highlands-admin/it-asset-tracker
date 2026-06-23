import type { Metadata } from 'next'
import Link from 'next/link'
import {
  RiPencilLine,
  RiRouterLine,
  RiCameraLine,
  RiWifiLine,
  RiBox3Line,
} from '@remixicon/react'
import type { ComponentType } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DetailList, type DetailRow } from '@/components/detail-list'
import { PageHeader } from '@/components/page-header'
import { getPropertyNetworks, type PropertyNetwork } from '@/lib/network/queries'

export const metadata: Metadata = { title: 'Network' }

export default async function NetworkPage() {
  const networks = await getPropertyNetworks()

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        title="Community infrastructure"
        description="Per-property network and service summary."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {networks.map((n) => (
          <NetworkCard key={n.property.id} network={n} />
        ))}
      </div>
    </div>
  )
}

function NetworkCard({ network }: { network: PropertyNetwork }) {
  const { property, summary, cameras } = network
  const camTotal = cameras.active + cameras.inactive
  const camLabel =
    camTotal === 0
      ? summary?.cameras || '—'
      : `${cameras.active}${cameras.inactive > 0 ? ` (${cameras.inactive} off)` : ''} cam${
          camTotal !== 1 ? 's' : ''
        }${cameras.vendors.length ? ` · ${cameras.vendors.join('/')}` : ''}`

  // Compact device counts shown as chips below the title for an at-a-glance read.
  const chips: { icon: ComponentType<{ className?: string }>; label: string }[] = []
  if (summary?.switches != null)
    chips.push({ icon: RiBox3Line, label: `${summary.switches} switches` })
  if (summary?.aps != null)
    chips.push({ icon: RiWifiLine, label: `${summary.aps} APs` })
  if (camTotal > 0) chips.push({ icon: RiCameraLine, label: `${camTotal} cameras` })

  // Group the summary into labeled sections that mirror the edit form, so each
  // card reads as Internet / LAN+WiFi / Services rather than one flat list.
  const groups: { label: string; rows: DetailRow[] }[] = summary
    ? [
        {
          label: 'Internet',
          rows: [
            ['Router / firewall', summary.router],
            ['Appliance', summary.appliance],
          ],
        },
        {
          label: 'LAN / WiFi',
          rows: [
            [
              'Switches',
              summary.switches != null
                ? `${summary.switches}${summary.switch_models ? ` — ${summary.switch_models}` : ''}`
                : null,
            ],
            [
              'Access points',
              summary.aps != null
                ? `${summary.aps} × ${[summary.ap_make, summary.ap_model].filter(Boolean).join(' ')} ${summary.wifi_standard ? `(${summary.wifi_standard})` : ''}`.trim()
                : null,
            ],
            ['Admin SSID', summary.admin_ssid],
            ['Guest SSID', summary.resident_ssid],
          ],
        },
        {
          label: 'Services',
          rows: [
            ['Phone', summary.phone_system],
            ['TV', summary.tv],
            ['Cameras', camLabel],
          ],
        },
      ]
    : [{ label: 'Services', rows: [['Cameras', camLabel]] }]

  const visibleGroups = groups
    .map((g) => ({
      label: g.label,
      rows: g.rows.filter(([, v]) => v !== null && v !== '' && v !== undefined),
    }))
    .filter((g) => g.rows.length > 0)

  return (
    <Card className="gap-0 py-0">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <RiRouterLine className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg font-semibold">
                {property.name}
              </h2>
              {summary?.isp ? (
                <Badge variant="default">{summary.isp}</Badge>
              ) : null}
            </div>
            {chips.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {chips.map((c) => (
                  <span key={c.label} className="inline-flex items-center gap-1">
                    <c.icon className="size-3.5" />
                    {c.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href={`/network/${property.slug}/edit`} />}
        >
          <RiPencilLine className="size-4" aria-hidden /> Edit
        </Button>
      </div>

      {visibleGroups.length === 0 ? (
        <p className="px-5 py-6 text-sm text-muted-foreground">
          No summary recorded yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {visibleGroups.map((g) => (
            <div key={g.label} className="px-5 py-4">
              <div className="mb-3 font-heading text-sm font-semibold text-foreground">
                {g.label}
              </div>
              <DetailList rows={g.rows} />
            </div>
          ))}
        </div>
      )}

      {summary?.notes ? (
        <div className="border-t border-border px-5 py-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Notes
          </div>
          <p className="text-sm whitespace-pre-wrap text-muted-foreground">
            {summary.notes}
          </p>
        </div>
      ) : null}
    </Card>
  )
}
