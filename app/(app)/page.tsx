import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import {
  RiArrowRightUpLine,
  RiBuilding2Line,
  RiCalendarScheduleLine,
  RiCheckboxCircleLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiMoneyDollarCircleLine,
  RiServerLine,
  RiTimeLine,
} from '@remixicon/react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  getDashboardData,
  type Renewal,
  type Tally,
} from '@/lib/dashboard/queries'
import { formatUsd } from '@/lib/vendors/types'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const d = await getDashboardData()

  const kpis = [
    {
      label: 'Total assets',
      value: d.totalAssets.toLocaleString(),
      hint: `${d.phones} phones · ${d.dids} DIDs`,
      icon: RiServerLine,
      tint: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      label: 'Active',
      value: d.activeAssets.toLocaleString(),
      hint: `${d.inactiveAssets} inactive`,
      icon: RiCheckboxCircleLine,
      tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Monthly spend',
      value: formatUsd(d.monthlySpend),
      hint: `${d.vendors} vendors`,
      icon: RiMoneyDollarCircleLine,
      tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
    {
      label: 'Properties',
      value: d.properties.toLocaleString(),
      hint: 'Across the portfolio',
      icon: RiBuilding2Line,
      tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
  ]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold">
          Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Highlands Senior Living infrastructure at a glance.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RenewalsPanel renewals={d.renewals} />
        </div>
        <DistributionCard title="Assets by type" items={d.byType} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DistributionCard title="Assets by category" items={d.byCategory} />
        <DistributionCard title="Phone providers" items={d.phoneProviders} />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tint,
}: {
  label: string
  value: string
  hint: string
  icon: ComponentType<{ className?: string }>
  tint: string
}) {
  return (
    <Card className="transition-shadow hover:shadow-lg dark:hover:ring-foreground/20">
      <div className="flex items-start justify-between gap-3 px-5">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <span className="font-heading text-3xl font-semibold leading-none tabular-nums">
            {value}
          </span>
          <span className="truncate text-xs text-muted-foreground">{hint}</span>
        </div>
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl',
            tint
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  )
}

function RenewalsPanel({ renewals }: { renewals: Renewal[] }) {
  return (
    <Card className="h-full gap-0 py-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-2">
          <RiCalendarScheduleLine className="size-[18px] text-muted-foreground" />
          <h2 className="font-heading text-base font-semibold">
            Upcoming renewals
          </h2>
        </div>
        {renewals.length > 0 ? (
          <Badge variant="secondary">{renewals.length}</Badge>
        ) : null}
      </div>

      {renewals.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5 py-12 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <RiCheckLine className="size-5" />
          </span>
          <p className="text-sm font-medium">You are all caught up</p>
          <p className="text-xs text-muted-foreground">
            No renewals due in the next two years.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col">
          {renewals.map((r) => (
            <RenewalRow key={r.label} renewal={r} />
          ))}
        </ul>
      )}
    </Card>
  )
}

function RenewalRow({ renewal }: { renewal: Renewal }) {
  const overdue = renewal.daysOut < 0
  // Meraki gear stops passing traffic when the license lapses, so it is always
  // critical. Anything else inside a year is a warning, beyond that is routine.
  const severity = renewal.isMeraki || overdue ? 'critical' : renewal.daysOut < 365 ? 'warning' : 'routine'

  const tint = {
    critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    routine: 'bg-muted text-muted-foreground',
  }[severity]

  const dateStr = new Date(renewal.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const relative = overdue
    ? 'Overdue'
    : renewal.daysOut < 60
      ? `${renewal.daysOut}d`
      : `${Math.round(renewal.daysOut / 30)}mo`

  return (
    <li className="flex items-center gap-3 border-t border-border px-5 py-3 first:border-t-0">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          tint
        )}
      >
        {severity === 'routine' ? (
          <RiTimeLine className="size-[18px]" />
        ) : (
          <RiErrorWarningLine className="size-[18px]" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{renewal.label}</p>
        <p className="truncate text-xs text-muted-foreground">
          Renews {dateStr}
          {renewal.amount ? ` · ${formatUsd(renewal.amount)} due` : ''}
          {renewal.isMeraki ? ' · devices go offline if it lapses' : ''}
        </p>
      </div>
      <span
        className={cn(
          'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums',
          severity === 'routine'
            ? 'bg-muted text-muted-foreground'
            : tint
        )}
      >
        {relative}
      </span>
    </li>
  )
}

function DistributionCard({ title, items }: { title: string; items: Tally[] }) {
  const max = Math.max(1, ...items.map((i) => i.count))
  const total = items.reduce((sum, i) => sum + i.count, 0)

  return (
    <Card className="gap-0 py-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="font-heading text-base font-semibold">
          {title}
        </h2>
        {total > 0 ? (
          <span className="text-xs text-muted-foreground tabular-nums">
            {total} total
          </span>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="px-5 pb-6 text-sm text-muted-foreground">
          No data yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3 px-5 pb-5">
          {items.slice(0, 6).map((i) => (
            <li key={i.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="truncate font-medium" title={i.label}>
                  {i.label}
                </span>
                <span className="shrink-0 text-muted-foreground tabular-nums">
                  {i.count}
                </span>
              </div>
              <span className="h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${Math.round((i.count / max) * 100)}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
