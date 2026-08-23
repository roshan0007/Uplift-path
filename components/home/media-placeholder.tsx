import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MediaPlaceholderProps {
  /** Short note describing the shot to be sourced. Replaced by real art later. */
  label: string
  /** Aspect and any surface override, e.g. `aspect-[4/5] bg-surface`. */
  className?: string
}

/**
 * Bounded, neutral holding space for a photo that has not been shot yet.
 * Deliberately plain — no pattern, no illustration, nothing that could be
 * mistaken for finished art.
 */
export function MediaPlaceholder({ label, className }: MediaPlaceholderProps) {
  return (
    <div
      role="presentation"
      className={cn(
        'border-border bg-surface-subtle flex flex-col items-center justify-center gap-3 rounded-sm border px-6 text-center',
        className,
      )}
    >
      <ImageIcon aria-hidden="true" strokeWidth={1} className="text-ink-40 size-6" />
      <span className="text-foreground-muted text-caption max-w-[26ch] leading-relaxed">
        {label}
      </span>
    </div>
  )
}
