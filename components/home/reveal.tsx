'use client'

import type * as React from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type RevealTag = 'div' | 'li' | 'section'

export interface RevealProps extends React.ComponentProps<'div'> {
  /** Stagger offset in ms. Keep the spread small — this should read as one movement. */
  delay?: number
  /** Rendered element, so the wrapper can sit inside a list without breaking it. */
  as?: RevealTag
}

/**
 * The page's one entrance animation: a short rise and fade, fired once when the
 * element first enters view.
 *
 * The hidden start state lives in `globals.css` behind `@media (scripting:
 * enabled)`, so content is never trapped invisible when JS is off or the
 * observer never runs — and the reduced-motion block pins it visible outright.
 */
export function Reveal({
  delay = 0,
  as = 'div',
  className,
  style,
  ...props
}: RevealProps) {
  // Widened so the same ref works for every tag this can render as.
  const Tag = as as React.ElementType
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.revealed = 'true'
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', 'true')
          io.unobserve(entry.target)
        }
      },
      // Hold off until the element is a little way into the viewport, so it
      // isn't already finished by the time it is worth reading.
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as React.CSSProperties}
      {...props}
    />
  )
}
