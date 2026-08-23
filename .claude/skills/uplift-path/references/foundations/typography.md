# Typography

Source: `app/globals.css` (`@theme inline`), `app/layout.tsx`,
`components/uplift/text.tsx`.

## Font families — the indirection rule

The production typeface is **Tenon**, licensed via Adobe Fonts and added at
deploy. Development builds use **Figtree** as a metric stand-in.

Families are declared in exactly one place:

```css
--font-heading: var(--font-figtree), ui-sans-serif, system-ui, sans-serif;
--font-body: var(--font-figtree), ui-sans-serif, system-ui, sans-serif;
```

`--font-figtree` comes from `next/font/google` in `app/layout.tsx`. Swapping to
Tenon means editing those two lines and nothing else.

**Never write `font-family` in a component, and never use Tailwind's `font-sans`
or a `font-[Figtree]` arbitrary value.** Any component that hardcodes a family
silently survives the Tenon swap and ends up off-brand.

`globals.css` already applies `--font-body` to `body` and `--font-heading` to
`h1`–`h6`, so most code needs nothing. When you need headline type on a
non-heading element (a button, a stat number), reference the variable:

```tsx
<span className="font-[family-name:var(--font-heading)] font-semibold">42%</span>
```

## The scale

Eight steps, all fluid via `clamp()`. This replaces the four fixed sizes in the
brand guidelines PDF — the 70px display would otherwise overflow on mobile.

| Token | Mobile → Desktop | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| `text-display` | 40 → 70px | 700 | -0.03em | 1.05 |
| `text-h1` | 32 → 48px | 700 | -0.025em | 1.1 |
| `text-h2` | 26 → 32px | 600 | -0.02em | 1.2 |
| `text-h3` | 20 → 24px | 600 | -0.015em | 1.3 |
| `text-h4` | 17 → 20px | 600 | -0.01em | 1.4 |
| `text-body-lg` | 17 → 20px | 400 | — | 1.6 |
| `text-body` | 16px | 400 | — | 1.6 |
| `text-caption` | 14px | 400 | — | 1.5 |

Headings are semibold or bold with tight negative tracking. Body is regular at
1.6 line-height. Both are baked into the tokens — you don't restate them.

Because sizes are fluid, **never add responsive size variants** like
`text-h2 md:text-h1`. The clamp already handles it, and stacking breakpoint
overrides produces jumps.

## Heading

`as` sets the HTML tag (document outline); `size` sets the visual scale. They're
independent, so a visually large heading can still be an `h2`.

```tsx
import { Heading } from '@/components/uplift'

<Heading as="h1" size="display">Uplifting every life</Heading>
<Heading as="h2" size="h2">Why it works</Heading>

// Visually small, semantically an h2 — valid and useful.
<Heading as="h2" size="h4">Supporting detail</Heading>
```

| Prop | Type | Default |
| --- | --- | --- |
| `as` | `'h1'…'h6' \| 'p' \| 'span' \| 'div'` | `'h2'` |
| `size` | `'display' \| 'h1' \| 'h2' \| 'h3' \| 'h4'` | `'h2'` |
| `tone` | `'default' \| 'muted' \| 'on-dark'` | `'default'` |

Note `size` does **not** follow `as` — set both. `<Heading as="h1">` renders at
`h2` scale unless you also pass `size="h1"` or `size="display"`.

There is no `gradient` tone. For a gradient headline, apply the
`text-gradient-brand` utility to a `<span>` inside the heading:

```tsx
<Heading as="h1" size="display">
  Uplifting every <span className="text-gradient-brand">life</span>
</Heading>
```

Clipping one word rather than the whole line keeps contrast on the rest of the
headline. Use it once per page at most.

Exactly one `h1` per page.

`text-wrap: balance` is applied to all headings globally in `globals.css`, so
there's no prop for it.

## Text

```tsx
import { Text } from '@/components/uplift'

<Text size="body-lg" tone="muted">Lead-in paragraph.</Text>
<Text>Standard body copy.</Text>
<Text size="caption" tone="muted">Fine print.</Text>
```

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `'body-lg' \| 'body' \| 'caption'` | `'body'` |
| `as` | `'p' \| 'span' \| 'div' \| 'li' \| 'dt' \| 'dd'` | `'p'` |
| `tone` | `'default' \| 'muted' \| 'on-dark' \| 'on-dark-muted'` | `'default'` |

Note there is no teal or blue tone — that's deliberate, per the body-copy rule
in `colors.md`.

Use `as` to keep semantics right inside lists and description lists:

```tsx
<dl>
  <Text as="dt" size="caption" tone="muted">Families supported</Text>
  <dd className="text-h1 font-[family-name:var(--font-heading)]">2,400+</dd>
</dl>
```

## Eyebrow

Small uppercase label above a heading. Tracked wide, teal-tinted, and always
paired with a heading — never used alone.

```tsx
import { Eyebrow } from '@/components/uplift'

<Eyebrow>What we do</Eyebrow>
<Heading as="h2" size="h2">Support at every step</Heading>
```

`SectionHeading` composes eyebrow, title, and description together with correct
spacing — prefer it over assembling the three by hand.

## Measure

Cap line length for readability: roughly 60–75 characters. Use `max-w-[46ch]`
for lead paragraphs and `max-w-[65ch]` for long-form body. Don't let body copy
span a full 1440px container.
