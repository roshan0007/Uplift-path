import { Container } from './container'
import { Logo } from './logo'
import { Text } from './text'
import { cn } from '@/lib/utils'
import type { NavItem } from './site-header'

export interface FooterColumn {
  heading: string
  items: NavItem[]
}

export interface SiteFooterProps {
  columns?: FooterColumn[]
  /** Short brand statement under the logo. */
  blurb?: string
  className?: string
}

/**
 * Dark footer. Uses the white-text lockup, which is the only approved logo
 * asset on a dark background.
 */
export function SiteFooter({ columns = [], blurb, className }: SiteFooterProps) {
  return (
    <footer className={cn('bg-surface-dark text-foreground-on-dark', className)}>
      <div className="bg-gradient-brand-horizontal h-1 w-full" role="presentation" />
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(auto-fit,minmax(9rem,1fr))] md:py-16">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo variant="onDark" height={38} alt="Uplift Path" />
            {blurb ? (
              <Text size="caption" tone="on-dark-muted">
                {blurb}
              </Text>
            ) : null}
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-3">
              <p className="text-caption text-teal-40 font-semibold uppercase tracking-[0.12em]">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-caption text-foreground-on-dark-muted hover:text-foreground-on-dark rounded-sm transition-colors duration-[var(--duration-fast)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/15 py-6">
          <Text size="caption" tone="on-dark-muted">
            {`© ${new Date().getFullYear()} Uplift Path, Inc. People first. Kaizen always. Excellence expected.`}
          </Text>
        </div>
      </Container>
    </footer>
  )
}
