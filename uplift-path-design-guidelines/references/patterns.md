# Screen-level patterns

Cross-cutting guidance for composing whole pages. Component APIs live in
`components/`; this is about how pages hold together.

## Page skeleton

```tsx
<SiteHeader items={nav} cta={cta} />
<main>
  {/* bands */}
</main>
<SiteFooter columns={columns} blurb={blurb} />
```

Header and footer belong in `app/layout.tsx` for any multi-page site. `<main>` is
required — it's the landmark keyboard and screen-reader users jump to.

## Banding

Pages are a vertical stack of `Section` bands. The rhythm carries the structure,
so vary tone deliberately:

- Never repeat a tone in adjacent bands — they merge visually.
- `default` and `subtle` are the workhorses; alternate freely.
- `teal` / `blue` tints are occasional emphasis, roughly once per page.
- `dark` is a punctuation mark — once or twice, usually for stats or a quote.
- If two same-tone bands must sit adjacent, separate them with `SectionDivider`.

A reliable long-page shape:

```
hero (white) → subtle → white → dark → subtle → white → CTA → footer
```

## Gradient budget

Treat the gradient as a budget of **two placements per page**. Typical spend:

1. The `Hero` wash (automatic).
2. One of: a clipped headline word, `StatBand` values on light, a
   `SectionDivider`, or the `CtaBand` glow (also automatic).

`Hero` and `CtaBand` each already spend one. If a page has both, that's your
budget — don't add more. Never a large gradient surface; see
`foundations/colors.md`.

## Visual hierarchy per page

- Exactly one `h1`, from `Hero` or a page heading.
- Exactly one primary action per view. Everything else is `outline` or `ghost`.
- One `CtaBand`, last, before the footer.
- Section headings are `h2` (via `SectionHeading`); card titles are `h3`.

Don't skip heading levels for visual reasons — use `as` for semantics and `size`
for appearance. See `foundations/typography.md`.

## Content width

Match the container to the content:

| Content | Container |
| --- | --- |
| Long-form prose, policy, article | `width="narrow"` |
| Forms | `width="narrow"` or inside a `Card` |
| Standard marketing sections | default |
| Dense grids, wide tables | `width="wide"` |

Cap text measure independently: `max-w-[46ch]` for lead paragraphs,
`max-w-[65ch]` for body. A full-container line of body text is unreadable
regardless of container choice.

## Voice

The brand voice is person-centered, hopeful, and concrete — "People first.
Kaizen always. Excellence expected."

- Lead with the person, not the organisation. "Tell us where you are today," not
  "Our team offers comprehensive services."
- Be specific about the next step. "Start the conversation" beats "Learn more".
- Warm, not saccharine. Avoid hype, superlatives, and exclamation marks.
- Plain language. No jargon where a common word works.
- Never invent statistics, outcomes, testimonials, or credentials. Placeholder
  numbers in a health-adjacent context are actively harmful — if you don't have a
  real figure, omit the stat band rather than filling it.

## Accessibility per page

Beyond the component-level rules:

- Logical heading order, one `h1`.
- `<main>`, `<nav>`, `<header>`, `<footer>` landmarks present.
- Every image has `alt`, or `alt=""` when decorative or redundant.
- Keyboard-reachable interactive elements with visible focus rings (global rule
  covers standard elements).
- Decorative gradient and icon elements marked `role="presentation"` or
  `aria-hidden="true"`.
- Colour is never the sole carrier of meaning — pair it with text, an icon, or
  `aria-invalid`.
- Body text at 4.5:1 minimum. The tokens guarantee this if you use `foreground`
  and `foreground-muted`; a custom gray may not.

## Dark sections checklist

When you set `Section tone="dark"`, four things must change with it:

1. `Text` / `Heading` → `tone="on-dark"` or `"on-dark-muted"`.
2. `SectionHeading` → `tone="on-dark"`.
3. `Button` → `variant="onDark"`; `ghost` needs
   `className="text-foreground-on-dark"`.
4. `Badge` → `tone="onDark"`; `StatBand` → `tone="dark"`; `Logo` →
   `variant="onDark"`.

Missing any one of these is the most common visual bug in this system — usually
ink-on-ink text that's invisible.

## Server and client

Default to Server Components. `SiteHeader` is the only client component in the
system, and it's a leaf.

When you need interactivity, isolate it:

```tsx
// Page stays a Server Component.
export default function Page() {
  return (
    <Section>
      <Container>
        <SectionHeading title="Get in touch" />
        <ContactForm />   {/* 'use client' leaf */}
      </Container>
    </Section>
  )
}
```

Never add `'use client'` to a page to enable one widget — it opts the whole
subtree into the client bundle.

## Things not to add

- A dark mode toggle. The system is light mode only.
- shadcn/ui or another component library — a second token system will conflict.
- Carousels, parallax, or scroll-reveal animation on every section.
- Placeholder stock photography or lorem ipsum in delivered work.
- Fixed pixel widths or ad-hoc media queries.

## Before you finish

Run through the final checks in `SKILL.md`, then verify at 375px, 768px, and
1440px.
