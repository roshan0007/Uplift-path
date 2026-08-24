'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ButtonLink } from '@/components/uplift'
import { cn } from '@/lib/utils'

export interface StickyCtaBarProps {
  headline: string
  body?: string
  ctaLabel: string
  ctaHref: string
  /** Id of the element that must scroll out of view before the bar appears. */
  afterId: string
}

/**
 * Persistent bottom bar that slides in once the referenced section scrolls
 * out of view, and can be dismissed for the rest of the visit. `inert` keeps
 * its button out of tab order while off-screen, since a fixed element stays
 * focusable regardless of its translate position.
 */
export function StickyCtaBar({ headline, body, ctaLabel, ctaHref, afterId }: StickyCtaBarProps) {
  const [pastTrigger, setPastTrigger] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const target = document.getElementById(afterId)
    if (!target) return

    const io = new IntersectionObserver(([entry]) => setPastTrigger(!entry.isIntersecting))
    io.observe(target)
    return () => io.disconnect()
  }, [afterId])

  const visible = pastTrigger && !dismissed

  return (
    <div
      role="complementary"
      aria-label={headline}
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        'bg-teal-ink fixed inset-x-0 bottom-0 z-40 shadow-lg',
        'transition-[translate,opacity] duration-[var(--duration-slow)] ease-[var(--ease-brand)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <div className="min-w-0">
          <p className="text-body font-semibold text-white">{headline}</p>
          {body ? (
            <p className="text-caption mt-0.5 hidden text-white/75 sm:block">{body}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ButtonLink href={ctaHref} variant="onDark" size="md">
            {ctaLabel}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="flex size-9 items-center justify-center rounded-md text-white/70 transition-colors duration-[var(--duration-fast)] hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
