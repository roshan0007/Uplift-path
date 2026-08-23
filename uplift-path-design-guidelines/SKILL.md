---
name: uplift-path
description: "The Uplift Path design system — the canonical source for all UI in Uplift Path apps. Use whenever building or editing any Uplift Path interface: landing pages, marketing sites, forms, dashboards, or individual components. Covers the brand palette and token ramps, the responsive clamp() type scale, the Tenon/Figtree font-variable indirection, logo usage rules, the signature teal-to-blue gradient, and the accessibility overrides that forbid white text on teal. Triggers on 'Uplift Path', 'uplift', brand colors like #08d1a7 or #019ed0, or any request to build UI in this design system."
metadata:
  v0.kind: design-system
  v0.design-system:
    appearance:
      light:
        background: "#E6FAF6"
        foreground: "#14503F"
      dark:
        background: "#2C3E50"
        foreground: "#9CECDB"
---

# Uplift Path Design System

Uplift Path is a warm, optimistic brand: minty teal and deep blue over white and
near-white neutrals, with dark slate ink for all text. This design system is the
canonical source for its UI. Build every interface from these components and
tokens — do not introduce another component library, and do not hand-roll
styling that a token already expresses.

**Light mode only.** There is no dark theme. Never add a theme toggle, a `.dark`
variant, or `dark:` classes. Dark *sections* on a light page are a layout choice
(`Section tone="dark"`), not a color mode.

## Setup is already done

The starter ships wired: `app/globals.css` holds the tokens, `app/layout.tsx`
mounts the Figtree font variable and metadata, and the brand assets live in
`public/brand/`. There is no provider to mount and no theme context.

Your job is to add routes and compose components — not to re-create the
scaffold. Don't rewrite `globals.css` wholesale; extend it if a genuinely new
token is needed.

```tsx
// Every component comes from the one barrel.
import { Section, Container, Heading, Text, Button, Card } from '@/components/uplift'
```

Import from `@/components/uplift`, never from a deep path like
`@/components/uplift/button`. The barrel is the public surface; see
`references/components/index.md` for the full export list.

## Hard rules

These are non-negotiable. Violating them produces off-brand or inaccessible UI.

1. **Never put white text on a teal fill.** `#08d1a7` with white is 1.96:1 and
   fails WCAG AA. Ink (`#2c3e50`) is the only approved foreground on teal — the
   `primary` button variant already does this. Never override it.
2. **Never set `font-family` in a component.** Families are defined once, as
   `--font-heading` and `--font-body`. Tenon replaces Figtree at deploy by
   editing those two variables. Use `font-[family-name:var(--font-heading)]` if
   you need headline type on a non-heading element.
3. **Body copy is ink or muted gray — never teal, never deep blue.** Brand
   colors are for fills, accents, and headline gradient clips, not for reading.
4. **Use the gradient sparingly.** One hero element, a section divider, or an
   icon accent. Never as a large background surface. See
   `references/foundations/colors.md`.
5. **Use the supplied logo files as-is.** Never redraw, recolor, stretch, or add
   shadows or bounding boxes. Use the `Logo` component, which picks the right
   file per context. See `references/assets/logos.md`.
6. **Every interactive element needs a visible focus ring.** The global
   `:focus-visible` rule in `globals.css` covers standard elements; if you build
   a custom control from a `div`, wire the ring yourself.
7. **Use tokens, not raw values.** `bg-primary`, `text-foreground-muted`,
   `rounded-md`, `shadow-md` — not `bg-[#08d1a7]` or `rounded-[8px]`.
8. **Build responsively with the system's own scale.** Read
   `references/foundations/responsiveness.md` before laying out a page. The type
   scale is already fluid via `clamp()`; never hard-code a fixed pixel width.

## Where to look

Read the reference file for the task at hand rather than guessing at an API.

| Task | Read |
| --- | --- |
| Picking colors, tints, or using the gradient | `references/foundations/colors.md` |
| Headings, body copy, the type scale, font swapping | `references/foundations/typography.md` |
| Page rhythm, containers, section spacing | `references/foundations/spacing-layout.md` |
| Breakpoints, responsive layout, fluid type | `references/foundations/responsiveness.md` |
| Transitions and reduced motion | `references/foundations/motion.md` |
| Full export list and component map | `references/components/index.md` |
| Buttons and link-buttons | `references/components/buttons.md` |
| Forms, inputs, validation states | `references/components/forms.md` |
| Alerts and badges | `references/components/feedback.md` |
| Cards, stats, testimonials | `references/components/data-display.md` |
| Header, footer, nav | `references/components/navigation.md` |
| Hero, feature grid, CTA band | `references/components/marketing.md` |
| Logo files and usage rules | `references/assets/logos.md` |
| A full validated page | `references/examples/landing-page.md` |
| A validated form | `references/examples/contact-form.md` |
| Screen-level composition guidance | `references/patterns.md` |

Reference files document the system; they are not importable modules. Import
only from `@/components/uplift`.

## Composing a page

Pages are built from `Section` bands, each wrapping a `Container`. `Section`
owns vertical rhythm and background tone; `Container` owns max width and
gutters. Don't add your own wrapper divs with padding for this.

```tsx
import { Section, Container, SectionHeading, FeatureGrid } from '@/components/uplift'

export default function Page() {
  return (
    <Section tone="subtle">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Support at every step"
          description="Practical guidance from people who have walked the path."
        />
        <FeatureGrid features={features} />
      </Container>
    </Section>
  )
}
```

Alternate `tone` between adjacent sections (`default` → `subtle` → `default`) so
bands read as distinct without borders. Use `tone="dark"` at most once or twice
per page, and switch text to the on-dark tones there.

## Server and client components

Everything in the barrel is a Server Component except `SiteHeader`, which is
`'use client'` for its mobile menu state. Keep pages as Server Components and
push interactivity into small leaf components.

`Field` is a plain wrapper, not a render prop — pass a matching `id` to both the
`Field` and its control so the label associates correctly. See
`references/components/forms.md`.

## Final checks

Before calling UI done:

- No white-on-teal anywhere; no teal or blue body text.
- No `font-family` declarations outside `globals.css`.
- No raw hex, px radii, or ad-hoc media queries — tokens and system breakpoints only.
- Gradient used once or twice at most, never on a large surface.
- Logo rendered via `Logo`, from the real asset files.
- Interactive elements reachable by keyboard with a visible focus ring.
- Renders correctly from 375px to 1440px+.
