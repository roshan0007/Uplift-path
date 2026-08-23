'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CreativeRotatorProps {
  /** One label per slot. Replaced by real creative later. */
  slides?: string[]
  /** Milliseconds each slot holds before advancing. */
  interval?: number
  className?: string
}

const DEFAULT_SLIDES = ['Creative slot 1', 'Creative slot 2', 'Creative slot 3']

/**
 * Auto-rotating holding space for creative that has not been produced yet.
 *
 * Crossfades rather than slides, so nothing travels across the viewport — the
 * change should register as a change of image, not as an animation. Pauses
 * while hovered or focused within, and does not auto-advance at all under
 * `prefers-reduced-motion` (the dots still work, so no content is unreachable).
 */
export function CreativeRotator({
  slides = DEFAULT_SLIDES,
  interval = 5500,
  className,
}: CreativeRotatorProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const liveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, interval)
    return () => window.clearInterval(id)
  }, [paused, count, interval])

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Creative"
      className={cn('w-full', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="border-border bg-surface relative aspect-[16/9] w-full overflow-hidden rounded-sm border">
        {slides.map((label, i) => (
          <div
            key={label}
            aria-hidden={i !== index}
            // Tailwind v4 compiles `scale-*` to the discrete `scale` property,
            // so the transition has to name it — `transform` would not apply.
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center',
              'transition-[opacity,scale] duration-[700ms] ease-[var(--ease-brand)]',
              i === index ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0',
            )}
          >
            <ImageIcon aria-hidden="true" strokeWidth={1} className="text-ink-40 size-7" />
            <span className="text-foreground-muted text-caption">{label}</span>
          </div>
        ))}
      </div>

      <div ref={liveRef} aria-live="polite" className="sr-only">
        {slides[index]}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${label}`}
              aria-current={i === index}
              className={cn(
                'h-1.5 rounded-pill transition-[width,background-color] duration-[320ms] ease-[var(--ease-brand)]',
                i === index ? 'bg-primary w-8' : 'bg-ink-40 hover:bg-ink-70 w-1.5',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
