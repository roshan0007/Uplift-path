import type * as React from 'react'
import { Info, CircleCheck, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

const tones = {
  info: {
    box: 'bg-surface-blue border-blue-40',
    icon: Info,
  },
  success: {
    box: 'bg-surface-teal border-teal-40',
    icon: CircleCheck,
  },
  /** Alert accent. Use rarely, for genuinely urgent messages. */
  alert: {
    box: 'bg-orange-10 border-orange-70',
    icon: TriangleAlert,
  },
} as const

export interface AlertProps extends React.ComponentProps<'div'> {
  tone?: keyof typeof tones
  title?: string
}

/**
 * Inline message. Text is always ink so it holds 4.5:1 against the 10% tint
 * background — the tone is carried by the tint and border, not the text color.
 */
export function Alert({ tone = 'info', title, className, children, ...props }: AlertProps) {
  const { box, icon: Icon } = tones[tone]
  return (
    <div
      role={tone === 'alert' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-lg border p-4', box, className)}
      {...props}
    >
      <Icon className="text-ink-100 mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        {title ? <p className="text-body text-foreground font-semibold">{title}</p> : null}
        <div className="text-caption text-foreground">{children}</div>
      </div>
    </div>
  )
}
