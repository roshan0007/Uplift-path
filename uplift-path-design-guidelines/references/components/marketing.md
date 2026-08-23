# Marketing bands — Hero, SectionHeading, FeatureGrid, CtaBand

Source: `components/uplift/hero.tsx`, `section-heading.tsx`, `feature-grid.tsx`,
`cta-band.tsx`.

```tsx
import { Hero, SectionHeading, FeatureGrid, CtaBand } from '@/components/uplift'
```

`Hero` and `CtaBand` render their own `<section>` and `Container` — do **not**
wrap them in `Section` or `Container`. `SectionHeading` and `FeatureGrid` are
content blocks that go inside your own `Section`/`Container`.

## Hero

Page opener. Carries the gradient once, as a soft ambient wash.

```tsx
import { ArrowRight } from 'lucide-react'
import { Hero, Button, ButtonLink, Heading } from '@/components/uplift'

<Hero
  eyebrow="People first. Kaizen always."
  headline={<>Uplifting every <span className="text-gradient-brand">life</span> we touch</>}
  subhead="Practical coaching and community for people building a better path forward."
  actions={
    <>
      <ButtonLink href="/contact" size="lg">Start your path <ArrowRight /></ButtonLink>
      <ButtonLink href="/programs" variant="outline" size="lg">Explore programs</ButtonLink>
    </>
  }
/>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `headline` | `ReactNode` (required) | Renders as `h1` at `display` size |
| `eyebrow` | `string` | Small uppercase label above |
| `subhead` | `string` | Supporting paragraph, muted, `max-w-xl` |
| `actions` | `ReactNode` | Buttons — pass a fragment |
| `media` | `ReactNode` | Visual beside the copy at `lg:` |

### The gradient wash

`Hero` renders a blurred gradient circle at low opacity (`0.14`) behind the
content, marked `role="presentation"`. This is **the** hero gradient element.
Don't add another gradient to the same page beyond a thin `SectionDivider` or the
`CtaBand` glow.

`headline` is `ReactNode` so you can clip one word with `text-gradient-brand`.
Clip a word, not the whole line — a fully gradient headline loses contrast at the
light teal end.

### Layout

Without `media`, copy is a single `max-w-3xl` column. With `media`, it becomes
two columns at `lg:` and stacks below. Padding is `py-16` → `md:py-24`.

Only one `Hero` per page — it renders the `h1`.

## SectionHeading

Eyebrow + title + description opening a section. Prefer it over assembling the
three by hand; it owns the spacing.

```tsx
<Section tone="subtle">
  <Container>
    <SectionHeading
      eyebrow="What we do"
      title="Support at every step"
      description="Practical guidance from people who have walked the path."
    />
    <FeatureGrid features={features} className="mt-12" />
  </Container>
</Section>
```

| Prop | Type | Default |
| --- | --- | --- |
| `title` | `string` (required) | Renders as `h2` at `h2` size |
| `eyebrow` | `string` | — |
| `description` | `string` | Muted, `max-w-2xl` |
| `align` | `'start' \| 'center'` | `'start'` |
| `tone` | `'default' \| 'on-dark'` | `'default'` |

`align="center"` also applies `mx-auto max-w-2xl`. Use `start` for most content
sections; `center` reads as a statement and works for a single feature band or a
pricing intro. Don't center every section — it flattens the page's hierarchy.

Pass `tone="on-dark"` inside a dark `Section` so the eyebrow shifts to `teal-40`
and the description to on-dark muted.

Add your own top margin on the following block (`mt-10`, `mt-12`) —
`SectionHeading` doesn't reserve space beneath itself.

## FeatureGrid

Grid of icon + title + description cards. Renders a semantic `<ul>`.

```tsx
import { Compass, HeartHandshake, Users } from 'lucide-react'

const features = [
  { icon: Compass, title: 'Clear direction', description: 'Map the next step, not the whole mountain.' },
  { icon: HeartHandshake, title: 'Real support', description: 'Matched with someone who has walked it.' },
  { icon: Users, title: 'Community', description: 'Progress is easier alongside other people.' },
]

<FeatureGrid features={features} columns={3} />
```

| Prop | Type | Default |
| --- | --- | --- |
| `features` | `Feature[]` | required |
| `columns` | `2 \| 3 \| 4` | `3` |

`Feature` is `{ icon?: React.ComponentType<{ className?: string }>; title: string; description: string }`.

### Icons

Pass the lucide **component itself**, not an element:

```tsx
{ icon: Compass, … }      // correct
{ icon: <Compass />, … }  // wrong — won't render
```

Icons render in a `surface-teal` rounded square with ink glyphs, already
`aria-hidden`. Sizing is handled — don't pass `className`.

`icon` is optional; omit it across all features for a text-only grid. Don't mix
some-with and some-without, which leaves ragged cards.

### Columns

All variants stack to 1 column on mobile and 2 at `sm:`. Match `columns` to your
item count: `3` for 3 or 6 items, `4` for 4 or 8, `2` for 2 or 4. A count that
doesn't divide evenly leaves an orphan card on the last row.

Cards use `flex` on the `<li>` so all cards in a row are equal height regardless
of description length.

## CtaBand

Closing call to action on a dark rounded panel with a gradient glow.

```tsx
<CtaBand
  headline="Ready to take the next step?"
  body="Tell us where you are. We'll help you find the path forward."
  actions={
    <>
      <ButtonLink href="/contact" variant="onDark" size="lg">Get started</ButtonLink>
      <ButtonLink href="/programs" variant="ghost" size="lg" className="text-foreground-on-dark">
        Browse programs
      </ButtonLink>
    </>
  }
/>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `headline` | `string` (required) | Renders as `h2` at `h1` size |
| `body` | `string` | On-dark muted |
| `actions` | `ReactNode` | Buttons |

Because the panel is dark, use `variant="onDark"` for the primary button — a
teal fill loses definition against the gradient glow. `ghost` needs
`className="text-foreground-on-dark"` passed explicitly.

Place it last on the page, above the footer. One per page — a second CTA band
splits the reader's attention. Keep the copy encouraging and specific: name the
next step ("Tell us where you are"), not a generic "Sign up today".

## Page order

A typical marketing page:

```
SiteHeader
Hero
Section (subtle) → SectionHeading + FeatureGrid
Section (dark, sm) → StatBand tone="dark"
Section (default) → SectionHeading + Testimonial grid
CtaBand
SiteFooter
```

See `../examples/landing-page.md` for the full validated version.

## Common mistakes

- Wrapping `Hero` or `CtaBand` in `Section`/`Container` — double padding.
- More than one `Hero`, producing multiple `h1`s.
- Extra gradient surfaces on a page that already has the hero wash.
- Passing `<Compass />` instead of `Compass` for `Feature.icon`.
- `columns` not matching the feature count, leaving orphans.
- `variant="primary"` inside `CtaBand` instead of `onDark`.
- Forgetting `tone="on-dark"` on `SectionHeading` in a dark section.
- Centering every `SectionHeading`.
