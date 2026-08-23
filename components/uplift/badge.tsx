import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge / pill. Uses the 10% and 40% tints so text keeps AA contrast against
 * the fill — never a 100% brand fill with white text.
 */
const badgeVariants = cva(
  'text-caption inline-flex items-center gap-1.5 rounded-pill font-semibold [&_svg]:size-3.5',
  {
    variants: {
      tone: {
        teal: 'bg-teal-10 text-ink-100 ring-1 ring-teal-40 ring-inset',
        blue: 'bg-blue-10 text-ink-100 ring-1 ring-blue-40 ring-inset',
        neutral: 'bg-ink-10 text-ink-100 ring-1 ring-ink-40 ring-inset',
        alert: 'bg-orange-10 text-ink-100 ring-1 ring-orange-70 ring-inset',
        onDark: 'bg-white/10 text-foreground-on-dark ring-1 ring-white/25 ring-inset',
      },
      size: {
        sm: 'px-2.5 py-0.5',
        md: 'px-3 py-1',
      },
    },
    defaultVariants: { tone: 'teal', size: 'md' },
  },
)

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ tone, size, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />
}

export { badgeVariants }
