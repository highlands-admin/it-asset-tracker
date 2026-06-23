import { cn } from '@/lib/utils'
import type { AssetStatus } from '@/lib/assets/types'

const STATUS_STYLES: Record<AssetStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  Inactive: 'bg-muted text-muted-foreground',
  'In Repair': 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  Disposed: 'bg-muted text-muted-foreground line-through',
  Spare: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  'Needs Attention': 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
}

export function AssetStatusBadge({ status }: { status: AssetStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  )
}
