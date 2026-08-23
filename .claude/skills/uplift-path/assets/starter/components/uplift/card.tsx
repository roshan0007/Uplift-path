import type * as React from 'react'
import { cn } from '@/lib/utils'

const tones = {
  default: 'bg-surface border-border',
  subtle: 'bg-surface-subtle border-border',
  teal: 'bg-surface-teal border-teal-40',
  blue: 'bg-surface-blue border-blue-40',
  dark: 'bg-surface-dark border-ink-100 text-foreground-on-dark',
} as const

export interface CardProps extends React.ComponentProps<'div'> {
  tone?: keyof typeof tones
  /** Adds a lift on hover. Use for cards that are links. */
  interactive?: boolean
}

export function Card({
  tone = 'default',
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-6 md:p-8',
        tones[tone],
        interactive &&
          'transition-all duration-[var(--duration-base)] ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-4 flex flex-col gap-2', className)} {...props} />
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-3', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mt-6 flex flex-wrap items-center gap-3', className)} {...props} />
}
