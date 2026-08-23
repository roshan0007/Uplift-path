import { cn } from '@/lib/utils'
import { Text } from './text'

export interface Stat {
  value: string
  label: string
}

export interface StatBandProps {
  stats: Stat[]
  /** `dark` for use inside a dark Section, `light` on white/subtle. */
  tone?: 'light' | 'dark'
  className?: string
}

/** Row of headline metrics. Values use the gradient on light, teal tint on dark. */
export function StatBand({ stats, tone = 'light', className }: StatBandProps) {
  return (
    <dl
      className={cn(
        'grid gap-8 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1.5">
          <dd
            className={cn(
              'text-h1 font-[family-name:var(--font-heading)] order-1',
              tone === 'dark' ? 'text-teal-70' : 'text-gradient-brand',
            )}
          >
            {stat.value}
          </dd>
          <Text
            as="dt"
            size="caption"
            tone={tone === 'dark' ? 'on-dark-muted' : 'muted'}
            className="order-2"
          >
            {stat.label}
          </Text>
        </div>
      ))}
    </dl>
  )
}
