import type * as React from 'react'
import { cn } from '@/lib/utils'

const widths = {
  narrow: 'max-w-3xl',
  content: 'max-w-5xl',
  default: 'max-w-7xl',
  wide: 'max-w-[90rem]',
} as const

export interface ContainerProps extends React.ComponentProps<'div'> {
  /** Max content width. Defaults to `default` (80rem). */
  width?: keyof typeof widths
}

/**
 * Horizontal page gutter + max-width. Every top-level section should place its
 * content inside a Container so the page keeps one consistent measure.
 */
export function Container({ width = 'default', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 md:px-8', widths[width], className)}
      {...props}
    />
  )
}
