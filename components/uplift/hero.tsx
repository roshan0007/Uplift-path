import type * as React from 'react'
import { Container } from './container'
import { Heading, Text, Eyebrow } from './text'
import { cn } from '@/lib/utils'

export interface HeroProps {
  eyebrow?: string
  headline: React.ReactNode
  /** Short supporting paragraph. Ink or muted gray, never teal. */
  subhead?: string
  /** Buttons or links. */
  actions?: React.ReactNode
  /** Optional visual placed beside the copy at `lg` and up. */
  media?: React.ReactNode
  className?: string
}

/**
 * Page hero. The signature gradient appears once here as a soft ambient wash —
 * this is the one hero element allowed to carry it. Do not add the gradient to
 * other large surfaces on the same page.
 */
export function Hero({
  eyebrow,
  headline,
  subhead,
  actions,
  media,
  className,
}: HeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden', className)}>
      <div
        role="presentation"
        className="bg-gradient-brand absolute -top-40 -right-24 -z-10 size-[34rem] rounded-full opacity-[0.14] blur-3xl"
      />
      <Container>
        <div
          className={cn(
            'grid items-center gap-12 py-16 md:py-24',
            media && 'lg:grid-cols-2 lg:gap-16',
          )}
        >
          <div className={cn('flex flex-col items-start gap-6', !media && 'max-w-3xl')}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <Heading as="h1" size="display">
              {headline}
            </Heading>
            {subhead ? (
              <Text size="body-lg" tone="muted" className="max-w-xl">
                {subhead}
              </Text>
            ) : null}
            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
          {media ? <div className="relative">{media}</div> : null}
        </div>
      </Container>
    </section>
  )
}
