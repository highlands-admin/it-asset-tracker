import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// A titled content card used across detail pages: a header band with a title
// and optional action, then padded body content. Keeps every section on the
// detail screens visually identical.
export function Section({
  title,
  action,
  children,
  bodyClassName,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  bodyClassName?: string
}) {
  return (
    <Card className="gap-0 py-0">
      {title || action ? (
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          {title ? (
            <h2 className="font-heading text-base font-semibold">{title}</h2>
          ) : (
            <span />
          )}
          {action}
        </div>
      ) : null}
      <div className={cn('px-5 py-5', bodyClassName)}>{children}</div>
    </Card>
  )
}
