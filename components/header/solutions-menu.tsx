'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { solutionGroups, type SolutionItem } from './solutions-data'

/** Uppercase group label. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground-muted text-caption px-2.5 pb-1 font-semibold tracking-[0.12em] uppercase">
      {children}
    </p>
  )
}

/**
 * One solution row. `min-w-0` + `truncate` keep the description on a single
 * line inside its grid column.
 */
function MenuItem({ item, open }: { item: SolutionItem; open: boolean }) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      data-menu-item
      tabIndex={open ? 0 : -1}
      // Hover tints the background only. The label keeps its ink colour — a
      // teal text swap on hover read cheap against the rest of the header.
      className="hover:bg-teal-10 focus-visible:bg-teal-10 block min-w-0 rounded-md px-2.5 py-2 transition-colors duration-[140ms] ease-[var(--ease-brand)]"
    >
      <span className="flex min-w-0 items-center gap-2">
        <Icon
          aria-hidden="true"
          strokeWidth={1.25}
          className="text-ink-100 size-[17px] shrink-0"
        />
        <span className="text-foreground block truncate font-medium">{item.title}</span>
      </span>
      <span className="text-foreground-muted mt-0.5 block truncate pl-[25px] text-xs leading-snug">
        {item.description}
      </span>
    </a>
  )
}

/**
 * Desktop "Uplift Solutions" mega-menu. Opens on hover with a short open delay
 * and a longer close delay (so brushing past won't flash it, and a diagonal
 * move into the panel won't close it), and on click / Enter for keyboard users.
 * Escape closes and restores focus to the trigger; arrow keys move between items.
 */
export function SolutionsMenu() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<number | undefined>(undefined)
  const closeTimer = useRef<number | undefined>(undefined)

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
  }, [])

  const scheduleOpen = useCallback(() => {
    clearTimers()
    openTimer.current = window.setTimeout(() => setOpen(true), 80)
  }, [clearTimers])

  const scheduleClose = useCallback(() => {
    clearTimers()
    closeTimer.current = window.setTimeout(() => setOpen(false), 150)
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])

  /**
   * Pin the panel's transform origin to the trigger's centre so the panel
   * expands out of the pill (Dynamic Island) rather than from its own middle.
   * Uses offset* rather than getBoundingClientRect because the panel is
   * scaled down while closed and rect values would include that transform.
   * Both elements share the header Container as their offsetParent.
   */
  useEffect(() => {
    const update = () => {
      const panel = panelRef.current
      const trigger = triggerRef.current
      if (!panel || !trigger || !panel.offsetWidth) return
      const centre = trigger.offsetLeft + trigger.offsetWidth / 2 - panel.offsetLeft
      const pct = (centre / panel.offsetWidth) * 100
      panel.style.setProperty('--island-x', `${Math.min(100, Math.max(0, pct)).toFixed(2)}%`)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const getItems = () =>
    Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-item]') ?? [],
    )

  const closeToTrigger = useCallback(() => {
    clearTimers()
    setOpen(false)
    triggerRef.current?.focus()
  }, [clearTimers])

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      clearTimers()
      setOpen(true)
      requestAnimationFrame(() => getItems()[0]?.focus())
    } else if (e.key === 'Escape' && open) {
      e.preventDefault()
      closeToTrigger()
    }
  }

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    const items = getItems()
    if (items.length === 0) return
    const index = items.indexOf(document.activeElement as HTMLAnchorElement)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = index < 0 ? 0 : Math.min(index + 1, items.length - 1)
      items[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (index <= 0) {
        closeToTrigger()
      } else {
        items[index - 1]?.focus()
      }
    } else if (e.key === 'Home') {
      e.preventDefault()
      items[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      items[items.length - 1]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeToTrigger()
    }
  }

  // Close when focus leaves the whole dropdown (keyboard tab-out).
  const onBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      clearTimers()
      setOpen(false)
    }
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="solutions-panel"
        onClick={() => {
          clearTimers()
          setOpen((v) => !v)
        }}
        onKeyDown={onTriggerKeyDown}
        className="text-foreground hover:bg-teal-10 flex items-center gap-1 rounded-md px-3.5 py-2 font-medium transition-colors duration-[160ms] ease-[var(--ease-brand)]"
      >
        Uplift Solutions
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 transition-transform duration-[180ms] ease-[var(--ease-brand)]',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        ref={panelRef}
        id="solutions-panel"
        role="region"
        aria-label="Uplift Solutions"
        onKeyDown={onPanelKeyDown}
        className={cn(
          'border-ink-100/12 bg-surface absolute top-full right-8 mt-2 w-[min(75rem,calc(100vw-4rem))] border shadow-md',
          // Origin sits under the trigger; see the effect above.
          // Tailwind v4 animates via the discrete `scale` / `translate`
          // properties, not `transform` — they must be named here or the
          // expansion snaps instead of easing.
          'origin-[var(--island-x,50%)_0px] will-change-[opacity,scale,translate]',
          'transition-[opacity,scale,translate,visibility,border-radius]',
          open
            ? 'visible translate-y-0 scale-x-100 scale-y-100 rounded-lg opacity-100 duration-[380ms] ease-[var(--ease-island)]'
            : 'pointer-events-none invisible -translate-y-2 scale-x-[0.94] scale-y-[0.72] rounded-2xl opacity-0 duration-[150ms] ease-[var(--ease-brand)]',
        )}
      >
        {/* Businesses takes ~65% and splits into two sub-columns of three;
            Individuals takes the rest behind a hairline divider. */}
        <div className="grid grid-cols-[1.85fr_1fr] items-start gap-x-6 p-4">
          {solutionGroups.map((group, groupIndex) => {
            const isWide = groupIndex === 0
            return (
              <div
                key={group.heading}
                // Content settles in just after the container finishes expanding.
                style={{
                  transitionDelay: open ? `${110 + groupIndex * 70}ms` : '0ms',
                  transitionDuration: open ? '300ms' : '110ms',
                }}
                className={cn(
                  'min-w-0 transition-[opacity,translate] ease-[var(--ease-brand)]',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  !isWide && 'border-ink-10 border-l pl-6',
                )}
              >
                <GroupLabel>{group.heading}</GroupLabel>
                <div
                  className={cn(
                    'gap-y-1',
                    isWide ? 'grid grid-flow-col grid-rows-3 gap-x-4' : 'flex flex-col',
                  )}
                >
                  {group.items.map((item) => (
                    <MenuItem key={item.title} item={item} open={open} />
                  ))}
                </div>
                {group.footerLink && (
                  <a
                    href={group.footerLink.href}
                    data-menu-item
                    tabIndex={open ? 0 : -1}
                    className="text-foreground mt-1.5 ml-2.5 inline-block rounded-md text-xs font-medium underline-offset-4 transition-colors duration-[140ms] ease-[var(--ease-brand)] hover:underline focus-visible:underline"
                  >
                    {group.footerLink.label}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
