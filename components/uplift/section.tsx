import type * as React from 'react'
import { cn } from '@/lib/utils'

const tones = {
  default: 'bg-background text-foreground',
  subtle: 'bg-surface-subtle text-foreground',
  mint: 'bg-surface-mint text-foreground',
  teal: 'bg-surface-teal text-foreground',
  blue: 'bg-surface-blue text-foreground',
  dark: 'bg-surface-dark text-foreground-on-dark',
} as const

const spacing = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
} as const

export interface SectionProps extends React.ComponentProps<'section'> {
  /** Background tone. `dark` flips text to the on-dark foreground. */
  tone?: keyof typeof tones
  /** Vertical rhythm. Defaults to `md`. */
  space?: keyof typeof spacing
}

/**
 * Full-bleed page section with brand background tones and vertical rhythm.
 * Pair with `Container` for the inner measure.
 */
export function Section({
  tone = 'default',
  space = 'md',
  className,
  ...props
}: SectionProps) {
  return <section className={cn(tones[tone], spacing[space], className)} {...props} />
}

/** 1px gradient rule for dividing sections. Uses the signature gradient. */
export function SectionDivider({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="presentation"
      className={cn('bg-gradient-brand-horizontal h-px w-full', className)}
      {...props}
    />
  )
}
