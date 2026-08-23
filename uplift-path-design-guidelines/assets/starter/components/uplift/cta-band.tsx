import type * as React from 'react'
import { Container } from './container'
import { Heading, Text } from './text'
import { cn } from '@/lib/utils'

export interface CtaBandProps {
  headline: string
  body?: string
  actions?: React.ReactNode
  className?: string
}

/**
 * Closing call to action on a dark ink panel. Voice is encouraging and
 * specific — guide the reader to one clear next step.
 */
export function CtaBand({ headline, body, actions, className }: CtaBandProps) {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      <Container>
        <div className="bg-surface-dark relative isolate overflow-hidden rounded-2xl px-6 py-14 md:px-14 md:py-16">
          <div
            role="presentation"
            className="bg-gradient-brand absolute -top-24 -right-12 -z-10 size-80 rounded-full opacity-25 blur-3xl"
          />
          <div className="flex max-w-2xl flex-col items-start gap-5">
            <Heading as="h2" size="h1" tone="on-dark">
              {headline}
            </Heading>
            {body ? (
              <Text size="body-lg" tone="on-dark-muted">
                {body}
              </Text>
            ) : null}
            {actions ? <div className="mt-2 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
