import type { ReactNode } from 'react'

export type DetailRow = [label: string, value: ReactNode]

// Key/value grid for detail screens. Labels sit as small uppercase captions
// above their values, which reads cleaner than inline label columns when values
// vary widely in length (serials, keys, addresses). Empty values are dropped.
export function DetailList({
  rows,
  emptyText,
}: {
  rows: DetailRow[]
  emptyText?: string
}) {
  const visible = rows.filter(
    ([, value]) => value !== null && value !== '' && value !== undefined
  )

  if (visible.length === 0) {
    return emptyText ? (
      <p className="text-sm text-muted-foreground">{emptyText}</p>
    ) : null
  }

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {visible.map(([label, value], i) => (
        <div key={`${label}-${i}`} className="flex flex-col gap-1">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </dt>
          <dd className="text-sm font-medium break-words">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
