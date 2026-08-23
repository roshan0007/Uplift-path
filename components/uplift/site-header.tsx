'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './container'
import { Logo } from './logo'
import { Button, ButtonLink } from './button'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
}

export interface SiteHeaderProps {
  items: NavItem[]
  cta?: NavItem
  className?: string
}

/**
 * Sticky site header with the brand lockup, desktop nav, and a mobile
 * disclosure menu. Uses the icon mark below `md` where space is tight.
 */
export function SiteHeader({ items, cta, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        'bg-surface/85 border-border sticky top-0 z-50 border-b backdrop-blur-md',
        className,
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center rounded-sm" aria-label="Uplift Path home">
            <Logo variant="icon" height={34} className="md:hidden" alt="" priority />
            <Logo variant="lockup" height={34} className="hidden md:block" alt="" priority />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-body text-foreground hover:bg-surface-subtle rounded-md px-3.5 py-2 font-medium transition-colors duration-[var(--duration-fast)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {cta ? (
              <ButtonLink href={cta.href} size="sm" className="hidden sm:inline-flex">
                {cta.label}
              </ButtonLink>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-expanded={open}
              aria-controls="site-nav-mobile"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="site-nav-mobile" className="border-border border-t lg:hidden">
          <Container>
            <nav aria-label="Main" className="flex flex-col gap-1 py-4">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-body text-foreground hover:bg-surface-subtle rounded-md px-3 py-2.5 font-medium"
                >
                  {item.label}
                </a>
              ))}
              {cta ? (
                <ButtonLink href={cta.href} block className="mt-2 sm:hidden">
                  {cta.label}
                </ButtonLink>
              ) : null}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
