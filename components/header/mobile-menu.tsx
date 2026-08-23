'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/uplift'
import { cn } from '@/lib/utils'
import { plainLinks, solutionGroups } from './solutions-data'

export interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen mobile navigation overlay. Fades in, staggers its top-level
 * links, and turns Solutions into an inline accordion. Body scroll is locked
 * while open; Escape closes it.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [solutionsExpanded, setSolutionsExpanded] = useState(false)

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Collapse the accordion whenever the menu closes.
  useEffect(() => {
    if (!open) setSolutionsExpanded(false)
  }, [open])

  // Build a flat, ordered list of top-level links for the stagger.
  const topLevel = [
    ...plainLinks.before.map((l) => ({ ...l, kind: 'link' as const })),
    { label: 'Uplift Solutions', href: '#', kind: 'solutions' as const },
    ...plainLinks.after.map((l) => ({ ...l, kind: 'link' as const })),
  ]

  return (
    <div
      id="mobile-nav"
      aria-hidden={!open}
      className={cn(
        'bg-surface fixed inset-0 z-40 lg:hidden',
        'transition-[opacity,visibility] duration-200 ease-[var(--ease-brand)]',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <nav
        aria-label="Mobile"
        className="mx-auto flex h-full w-full max-w-7xl flex-col gap-1 overflow-y-auto px-5 pt-24 pb-10 md:px-8"
      >
        {topLevel.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              'transition-[opacity,transform] duration-200 ease-[var(--ease-brand)]',
              open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
            style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
          >
            {item.kind === 'link' ? (
              <a
                href={item.href}
                onClick={onClose}
                className="text-foreground hover:bg-teal-10 block rounded-md px-2 py-3 text-2xl font-semibold transition-colors duration-[160ms] ease-[var(--ease-brand)]"
              >
                {item.label}
              </a>
            ) : (
              <div>
                <button
                  type="button"
                  aria-expanded={solutionsExpanded}
                  aria-controls="mobile-solutions"
                  onClick={() => setSolutionsExpanded((v) => !v)}
                  className="text-foreground hover:bg-teal-10 flex w-full items-center justify-between gap-2 rounded-md px-2 py-3 text-2xl font-semibold transition-colors duration-[160ms] ease-[var(--ease-brand)]"
                >
                  Uplift Solutions
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'size-6 transition-transform duration-200 ease-[var(--ease-brand)]',
                      solutionsExpanded && 'rotate-180',
                    )}
                  />
                </button>

                <div
                  id="mobile-solutions"
                  className={cn(
                    'overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-[var(--ease-brand)]',
                    solutionsExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className="flex flex-col gap-6 py-4 pl-1">
                    {solutionGroups.map((group) => (
                      <div key={group.heading} className="flex flex-col gap-2">
                        <p className="text-foreground-muted text-caption font-semibold tracking-[0.12em] uppercase">
                          {group.heading}
                        </p>
                        {group.items.map((sol) => {
                          const Icon = sol.icon
                          return (
                            <a
                              key={sol.title}
                              href={sol.href}
                              onClick={onClose}
                              className="hover:bg-teal-10 rounded-md px-3 py-2.5 transition-colors duration-[140ms] ease-[var(--ease-brand)]"
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon
                                  aria-hidden="true"
                                  strokeWidth={1.25}
                                  className="text-ink-100 size-[18px] shrink-0"
                                />
                                <span className="text-foreground block font-medium">
                                  {sol.title}
                                </span>
                              </span>
                              <span className="text-foreground-muted text-caption mt-0.5 block pl-[30px]">
                                {sol.description}
                              </span>
                            </a>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          className={cn(
            'mt-6 transition-[opacity,transform] duration-200 ease-[var(--ease-brand)]',
            open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
          style={{ transitionDelay: open ? `${topLevel.length * 40}ms` : '0ms' }}
        >
          <ButtonLink href="#" block onClick={onClose}>
            Get in touch
          </ButtonLink>
        </div>
      </nav>
    </div>
  )
}
