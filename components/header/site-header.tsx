'use client'

import { useEffect, useState } from 'react'
import { Container, Logo, ButtonLink } from '@/components/uplift'
import { cn } from '@/lib/utils'
import { plainLinks } from './solutions-data'
import { SolutionsMenu } from './solutions-menu'
import { MobileMenu } from './mobile-menu'

/**
 * Plain nav link. The label stays ink at every state; hover is carried by a
 * soft teal tint behind it plus the underline growing in from the left.
 */
function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group text-foreground hover:bg-teal-10 relative rounded-md px-3.5 py-2 font-medium transition-colors duration-[160ms] ease-[var(--ease-brand)]"
    >
      {label}
      <span
        aria-hidden="true"
        className="bg-teal-100 absolute inset-x-3.5 bottom-1 h-[1.5px] origin-left scale-x-0 transition-transform duration-200 ease-[var(--ease-brand)] group-hover:scale-x-100"
      />
    </a>
  )
}

/** Two-line hamburger that morphs into an X. */
function MenuToggle({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="text-foreground relative flex size-10 items-center justify-center rounded-md lg:hidden"
    >
      <span
        aria-hidden="true"
        className={cn(
          'bg-foreground absolute h-[1.5px] w-6 transition-transform duration-200 ease-[var(--ease-brand)]',
          open ? 'rotate-45' : '-translate-y-[3px]',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'bg-foreground absolute h-[1.5px] w-6 transition-transform duration-200 ease-[var(--ease-brand)]',
          open ? '-rotate-45' : 'translate-y-[3px]',
        )}
      />
    </button>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll state with hysteresis: engage at 80px, release at 60px.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => {
        if (!prev && y > 80) return true
        if (prev && y < 60) return false
        return prev
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b',
          scrolled
            ? 'bg-surface/92 border-ink-100/10 h-[68px] backdrop-blur-md'
            : 'h-20 border-transparent bg-transparent',
        )}
        style={{
          transitionProperty: 'background-color, height, border-color',
          transitionDuration: '220ms',
          transitionTimingFunction: 'var(--ease-brand)',
        }}
      >
        {/* `relative` anchors the Solutions mega-menu to the header's content
            width so it right-aligns with the nav instead of the viewport. */}
        <Container className="relative flex h-full items-center justify-between gap-6">
          <a
            href="#"
            aria-label="Uplift Path home"
            className="flex shrink-0 items-center rounded-sm"
          >
            <Logo variant="icon" height={34} className="md:hidden" alt="" priority />
            <Logo variant="lockup" height={34} className="hidden md:block" alt="" priority />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {plainLinks.before.map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
            <SolutionsMenu />
            {plainLinks.after.map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="#" size="md" className="hidden lg:inline-flex">
              Get in touch
            </ButtonLink>
            <MenuToggle open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
