import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Typography scale. Never set font-family in a component — the families live in
 * `--font-heading` / `--font-body` so Tenon can be swapped in one place.
 */

const headingSizes = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const

const headingTones = {
  default: 'text-foreground',
  muted: 'text-foreground-muted',
  'on-dark': 'text-foreground-on-dark',
} as const

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Visual size from the type scale. */
  size?: keyof typeof headingSizes
  /** Rendered element. Set independently of `size` to keep heading order valid. */
  as?: HeadingTag
  /** Muted ink for secondary headings. Never teal or blue. */
  tone?: keyof typeof headingTones
}

export function Heading({
  size = 'h2',
  as: Tag = 'h2',
  tone = 'default',
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-[family-name:var(--font-heading)]',
        headingSizes[size],
        headingTones[tone],
        className,
      )}
      {...props}
    />
  )
}

const textSizes = {
  'body-lg': 'text-body-lg',
  body: 'text-body',
  caption: 'text-caption',
} as const

const textTones = {
  default: 'text-foreground',
  muted: 'text-foreground-muted',
  'on-dark': 'text-foreground-on-dark',
  'on-dark-muted': 'text-foreground-on-dark-muted',
} as const

type TextTag = 'p' | 'span' | 'div' | 'li' | 'dt' | 'dd'

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  size?: keyof typeof textSizes
  as?: TextTag
  /** Body copy is ink or muted gray. Never teal, never deep blue. */
  tone?: keyof typeof textTones
}

export function Text({
  size = 'body',
  as: Tag = 'p',
  tone = 'default',
  className,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textSizes[size], textTones[tone], className)} {...props} />
  )
}

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: 'default' | 'on-dark'
}

/** Small uppercase label above a heading. */
export function Eyebrow({ tone = 'default', className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-caption font-[family-name:var(--font-heading)] font-semibold uppercase tracking-[0.12em]',
        tone === 'on-dark' ? 'text-teal-40' : 'text-foreground-muted',
        className,
      )}
      {...props}
    />
  )
}
