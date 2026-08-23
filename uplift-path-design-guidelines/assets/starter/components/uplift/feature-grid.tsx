import type * as React from 'react'
import { Card } from './card'
import { Heading, Text } from './text'
import { cn } from '@/lib/utils'

export interface Feature {
  /** Lucide icon component, e.g. `Compass`. */
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface FeatureGridProps {
  features: Feature[]
  /** Columns at `lg` and up. Stacks to 1 on mobile, 2 at `sm`. */
  columns?: 2 | 3 | 4
  className?: string
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const

/** Responsive grid of icon + title + description cards. */
export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  return (
    <ul className={cn('grid gap-5', columnClasses[columns], className)}>
      {features.map((feature) => (
        <li key={feature.title} className="flex">
          <Card className="flex w-full flex-col gap-4">
            {feature.icon ? (
              <span className="bg-surface-teal flex size-11 items-center justify-center rounded-lg">
                <feature.icon className="text-ink-100 size-5" aria-hidden="true" />
              </span>
            ) : null}
            <Heading as="h3" size="h4">
              {feature.title}
            </Heading>
            <Text tone="muted">{feature.description}</Text>
          </Card>
        </li>
      ))}
    </ul>
  )
}
