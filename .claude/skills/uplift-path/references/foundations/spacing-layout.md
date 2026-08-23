# Spacing and Layout

Source: `app/globals.css` (`:root`), `components/uplift/container.tsx`,
`components/uplift/section.tsx`.

## The two primitives

Every page is `Section` bands, each wrapping a `Container`. This split is the
whole layout model:

- **`Section`** owns vertical rhythm and background tone. Full-bleed width.
- **`Container`** owns max width and horizontal gutters. Centered.

```tsx
<Section tone="subtle">
  <Container>{/* content */}</Container>
</Section>
```

Don't reach for a hand-rolled `<div className="py-20 px-4 max-w-7xl mx-auto">`.
That drifts from the shared rhythm and breaks when the tokens change.

## Layout tokens

| Token | Value | Meaning |
| --- | --- | --- |
| `--container-max` | `80rem` (1280px) | Default content max width |
| `--container-gutter` | `1.25rem` → `2rem` at 768px | Horizontal page padding |
| `--section-space` | `clamp(3.5rem, 2rem + 6vw, 6.5rem)` | Section vertical padding, 56 → 104px |

Section spacing is fluid, so bands tighten on mobile and open up on desktop
without breakpoint overrides.

## Container

```tsx
import { Container } from '@/components/uplift'

<Container>Default — 1280px max</Container>
<Container width="narrow">Long-form prose — 768px</Container>
<Container width="wide">Dense grids — 1440px</Container>
<Container width="full">Edge-to-edge, gutters only</Container>
```

| Prop | Type | Default |
| --- | --- | --- |
| `width` | `'narrow' \| 'default' \| 'wide' \| 'full'` | `'default'` |
| `as` | `'div' \| 'section' \| 'main' \| 'header' \| 'footer'` | `'div'` |

Use `narrow` for anything text-heavy — article bodies, single-column forms,
policy pages. Reading comfort beats filling the viewport.

## Section

```tsx
import { Section } from '@/components/uplift'

<Section>Default white</Section>
<Section tone="subtle">Near-white #f7f9fa</Section>
<Section tone="teal">Teal-10 tint</Section>
<Section tone="blue">Blue-10 tint</Section>
<Section tone="dark">Ink, on-dark text</Section>
```

| Prop | Type | Default |
| --- | --- | --- |
| `tone` | `'default' \| 'subtle' \| 'teal' \| 'blue' \| 'dark'` | `'default'` |
| `space` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` |
| `as` | `'section' \| 'div' \| 'header' \| 'footer'` | `'section'` |

`tone="dark"` sets `surface-dark` background and on-dark text color, so nested
`Text` and `Heading` inherit correctly — you still pass `tone="on-dark"` to them
for muted variants.

### Banding rhythm

Alternate tones between adjacent sections so bands separate without borders:

```
default → subtle → default → dark → default
```

Never place two identical tones back to back — they merge into one band and the
page loses structure. Use `tone="dark"` once or twice per page at most; more
than that and it stops being an accent.

## Section spacing scale

| `space` | Padding | Use |
| --- | --- | --- |
| `none` | 0 | Section supplies its own (hero) |
| `sm` | ~60% of default | Tight bands: stat strips, logo clouds |
| `default` | `--section-space` | Standard content bands |
| `lg` | ~140% of default | Statement bands, major CTAs |

## SectionDivider

A thin gradient rule between bands. One of the few approved gradient uses.

```tsx
import { SectionDivider } from '@/components/uplift'

<Section>…</Section>
<SectionDivider />
<Section tone="subtle">…</Section>
```

Use it where two bands share a tone and you can't alternate, or to mark a major
shift in a long page. Don't put one between every section — the gradient loses
its meaning through repetition.

## Internal spacing

Inside a container, use Tailwind's standard scale and prefer flexbox for
one-dimensional stacks:

```tsx
<div className="flex flex-col gap-6">…</div>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">…</div>
```

Rough conventions:

- `gap-2` / `gap-3` — within a component (label to input, icon to text)
- `gap-4` / `gap-6` — between cards or grid items
- `gap-8` / `gap-12` — between distinct blocks inside one section
- Between sections — that's `Section`'s job, not a gap

Use `gap` on a flex or grid parent rather than margins on children. Margins
collapse unpredictably and leak spacing when items are conditionally rendered.
