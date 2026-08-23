# Components — index

Source: `components/uplift/`. Public surface: `components/uplift/index.ts`.

All 17 components are imported from the single barrel:

```tsx
import { Section, Container, Heading, Button } from '@/components/uplift'
```

Never import from a deep path (`@/components/uplift/button`). The barrel is the
contract; deep paths are internal and may be reorganized.

## Full export list

| Export | Source file | Reference |
| --- | --- | --- |
| `Container` | `container.tsx` | `foundations/spacing-layout.md` |
| `Section`, `SectionDivider` | `section.tsx` | `foundations/spacing-layout.md` |
| `Heading`, `Text`, `Eyebrow` | `text.tsx` | `foundations/typography.md` |
| `SectionHeading` | `section-heading.tsx` | `marketing.md` |
| `Button`, `ButtonLink`, `buttonVariants` | `button.tsx` | `buttons.md` |
| `Logo` | `logo.tsx` | `../assets/logos.md` |
| `Card`, `CardHeader`, `CardContent`, `CardFooter` | `card.tsx` | `data-display.md` |
| `Badge`, `badgeVariants` | `badge.tsx` | `feedback.md` |
| `Alert` | `alert.tsx` | `feedback.md` |
| `Field`, `Input`, `Textarea`, `Select`, `Checkbox` | `field.tsx` | `forms.md` |
| `SiteHeader` | `site-header.tsx` | `navigation.md` |
| `SiteFooter` | `site-footer.tsx` | `navigation.md` |
| `Hero` | `hero.tsx` | `marketing.md` |
| `FeatureGrid` | `feature-grid.tsx` | `marketing.md` |
| `StatBand` | `stat-band.tsx` | `data-display.md` |
| `Testimonial` | `testimonial.tsx` | `data-display.md` |
| `CtaBand` | `cta-band.tsx` | `marketing.md` |

Types are exported alongside each component (`ButtonProps`, `CardProps`,
`Feature`, `Stat`, `NavItem`, `FooterColumn`, and so on).

## By task

- **Page shell** — `SiteHeader`, `SiteFooter`
- **Layout** — `Container`, `Section`, `SectionDivider`
- **Type** — `Heading`, `Text`, `Eyebrow`, `SectionHeading`
- **Actions** — `Button`, `ButtonLink`
- **Marketing bands** — `Hero`, `FeatureGrid`, `StatBand`, `Testimonial`, `CtaBand`
- **Content** — `Card` (+ subcomponents), `Badge`
- **Forms** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`
- **Messaging** — `Alert`
- **Brand** — `Logo`

## Server vs client

Everything is a Server Component except **`SiteHeader`**, which is `'use client'`
for its mobile menu toggle.

Keep pages as Server Components. When you need interactivity (a controlled form,
a disclosure), put it in a small `'use client'` leaf component rather than
converting the whole page.

## Conventions across the system

- **`tone`** controls color treatment (`Section`, `Card`, `Badge`, `Alert`, `Text`,
  `Heading`, `StatBand`).
- **`variant`** controls visual style within a role (`Button`, `Logo`).
- **`size`** controls scale (`Button`, `Badge`, `Text`).
- Every component forwards `className` and merges via `cn()`, so one-off
  adjustments are possible — but reach for a prop first.
- Every component spreads the rest of its native props, so `id`, `aria-*`,
  `data-*`, and event handlers all work.

## Icons

`lucide-react` is the icon library (already a dependency, used by `Alert`).
Buttons and badges auto-size nested SVGs — pass the icon as a child and don't set
its dimensions:

```tsx
import { ArrowRight } from 'lucide-react'

<Button>Get started <ArrowRight /></Button>
```

Decorative icons need `aria-hidden="true"`. Icons that carry the only meaning in
a control need an accessible label on the control.

## What isn't here

There is no table, tabs, modal, dropdown, accordion, tooltip, or pagination
component. If you need one, build it from the tokens and existing primitives
(`Card`, `Button`, the border and shadow tokens) and match the conventions
above — don't pull in shadcn/ui or another library, which would introduce a
second, conflicting token system.
