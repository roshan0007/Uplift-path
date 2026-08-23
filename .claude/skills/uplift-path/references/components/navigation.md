# Navigation — SiteHeader and SiteFooter

Source: `components/uplift/site-header.tsx`, `components/uplift/site-footer.tsx`.

```tsx
import { SiteHeader, SiteFooter } from '@/components/uplift'
import type { NavItem, FooterColumn } from '@/components/uplift'
```

## Page shell

Header and footer bracket the page. Put them in `app/layout.tsx` for a
multi-page site so nav state and markup stay consistent:

```tsx
const nav: NavItem[] = [
  { label: 'Programs', href: '/programs' },
  { label: 'Approach', href: '/approach' },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/about' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader items={nav} cta={{ label: 'Get started', href: '/contact' }} />
        <main>{children}</main>
        <SiteFooter columns={footerColumns} blurb="Practical support for people building a better path." />
      </body>
    </html>
  )
}
```

Always wrap page content in `<main>` — it's the landmark screen readers jump to.

## SiteHeader

| Prop | Type | Notes |
| --- | --- | --- |
| `items` | `NavItem[]` — `{ label, href }` | Primary nav |
| `cta` | `NavItem` | Optional trailing button |

`'use client'` — it holds mobile menu state. That's the only client component in
the system; it doesn't force the rest of the page to be client-side, since it's a
leaf.

### Behavior

- Sticky at `top-0`, `z-50`, translucent white with `backdrop-blur-md`.
- **Logo**: icon mark below `md:`, full lockup at `md:` and up. Both have `alt=""`
  because the wrapping link already carries `aria-label="Uplift Path home"`.
- **Nav**: hidden below `lg:`, inline at `lg:` and up.
- **CTA**: hidden below `sm:` in the bar; reappears inside the mobile menu as a
  full-width button.
- **Menu button**: visible below `lg:`, with `aria-expanded` and `aria-controls`
  wired to the disclosure panel. Mobile links close the menu on click.

Keep `items` to 4–6 entries. More overflows the bar at `lg:` before the mobile
breakpoint takes over.

### Nav thresholds

Nav switches at `lg:` (1024px), not `md:` — with the lockup plus a CTA, four or
more items don't fit at 768px. If you change the item count substantially, verify
at 768–1024px that the bar doesn't collide.

### Active state

`SiteHeader` doesn't track the current route. If you need an active indicator,
use `usePathname()` in a wrapping client component, or pass styling through
`className` on a custom header built from the same parts.

## SiteFooter

| Prop | Type | Notes |
| --- | --- | --- |
| `columns` | `FooterColumn[]` — `{ heading, items }` | Link groups |
| `blurb` | `string` | Short statement under the logo |

```tsx
const footerColumns: FooterColumn[] = [
  {
    heading: 'Programs',
    items: [
      { label: 'Coaching', href: '/programs/coaching' },
      { label: 'Workshops', href: '/programs/workshops' },
    ],
  },
  {
    heading: 'Organisation',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
]
```

### Details

- Dark (`surface-dark`) with on-dark text throughout.
- A 4px `bg-gradient-brand-horizontal` rule sits at the top edge — an approved
  gradient use, marked `role="presentation"`.
- Uses `Logo variant="onDark"` (the white-text PNG), the only approved logo asset
  on dark.
- Column headings are `teal-40` uppercase with wide tracking.
- Each column is its own `<nav>` with `aria-label` from its heading — so screen
  readers can distinguish them.
- Bottom bar carries the copyright and the brand's values line, with the year
  computed at render.

Two to four columns works well. The grid uses
`md:grid-cols-[1.4fr_repeat(auto-fit,minmax(9rem,1fr))]`, so the brand block
stays wider than the link columns and columns fit themselves to the space.

### Don't invert the footer

The footer is dark by design — it anchors the page and is the one place the
white-text logo is used. Don't pass a light `className` background; the on-dark
text colors are hardcoded and would drop below AA.

## Links

Both components render plain `<a>` elements, which works for any framework. In a
Next.js app you'll get client-side navigation only if you build a custom header
using `next/link`. For most sites the plain anchors are fine; if you need
prefetching on primary nav, compose your own header from `Container`, `Logo`, and
`ButtonLink` following the same structure.

## Common mistakes

- Placing header and footer inside each page instead of the layout.
- Omitting `<main>` around page content.
- More than six `items`, overflowing the bar.
- Recoloring the footer light.
- Using the lockup (dark text) on the dark footer instead of `variant="onDark"`.
- Adding a theme toggle to the header — this system is light mode only.
- Duplicating `SiteHeader` inside a page that already inherits one from layout.
