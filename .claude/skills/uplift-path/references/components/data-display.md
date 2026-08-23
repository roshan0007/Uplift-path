# Data display — Card, StatBand, Testimonial

Source: `components/uplift/card.tsx`, `stat-band.tsx`, `testimonial.tsx`.

```tsx
import {
  Card, CardHeader, CardContent, CardFooter,
  StatBand, Testimonial,
} from '@/components/uplift'
```

## Card

Bordered container with `rounded-xl` and responsive padding (`p-6` → `p-8` at
`md:`).

```tsx
<Card>
  <CardHeader>
    <Heading as="h3" size="h4">Coaching</Heading>
  </CardHeader>
  <CardContent>
    <Text tone="muted">One-to-one guidance matched to your goals.</Text>
  </CardContent>
  <CardFooter>
    <ButtonLink href="/coaching" variant="outline" size="sm">Learn more</ButtonLink>
  </CardFooter>
</Card>
```

| Prop | Type | Default |
| --- | --- | --- |
| `tone` | `'default' \| 'subtle' \| 'teal' \| 'blue' \| 'dark'` | `'default'` |
| `interactive` | `boolean` | `false` |

### Tone against section tone

Cards need contrast with the band behind them. Match them deliberately:

| Section tone | Card tone |
| --- | --- |
| `default` (white) | `subtle`, `teal`, or `blue` |
| `subtle` | `default` (white) |
| `dark` | `dark` (with on-dark text) |

A `default` white card on a `default` white section is invisible except for its
border — use `subtle` or flip the section.

### Subcomponents

All three are optional layout helpers:

- `CardHeader` — `mb-4`, column with `gap-2`. Title and eyebrow/badge.
- `CardContent` — column with `gap-3`. Body.
- `CardFooter` — `mt-6`, wrapping row with `gap-3`. Actions.

For a simple card, skip them and pass children directly.

### Interactive cards

`interactive` adds a hover lift and deeper shadow. Use it **only when the whole
card is a link** — otherwise it promises an affordance that doesn't exist.

```tsx
<Link href="/programs/coaching" className="block rounded-xl">
  <Card interactive>…</Card>
</Link>
```

Wrap with a real `Link` so keyboard and middle-click work. Don't put `onClick`
on the card. If the card has multiple links inside it, don't make the card
itself interactive — nested interactive elements are an accessibility problem.

## StatBand

Row of headline metrics, rendered as a `<dl>`.

```tsx
<StatBand
  stats={[
    { value: '2,400+', label: 'Families supported' },
    { value: '38', label: 'Partner organisations' },
    { value: '92%', label: 'Would recommend' },
    { value: '11', label: 'Years of service' },
  ]}
/>
```

| Prop | Type | Default |
| --- | --- | --- |
| `stats` | `Stat[]` — `{ value: string; label: string }` | required |
| `tone` | `'light' \| 'dark'` | `'light'` |

Grid is `2` columns on mobile, `4` at `lg:`. It's built for **four stats** —
three leaves a gap at `lg:`, five wraps awkwardly. Use `FeatureGrid` or cards for
other counts.

`value` is a string, so units and separators are yours to control (`'2,400+'`,
`'92%'`, `'11'`).

Values use `text-gradient-brand` on light and `teal-70` on dark — one of the
approved gradient uses. Set `tone="dark"` inside a dark section so labels switch
to on-dark muted:

```tsx
<Section tone="dark">
  <Container>
    <StatBand stats={stats} tone="dark" />
  </Container>
</Section>
```

The markup puts `<dd>` (the value) visually first via `order`, while keeping
`<dt>` before it in the DOM — so the label is read first by assistive tech but
the number leads visually. Don't restructure this.

## Testimonial

Single pull quote in a `subtle` card with a teal left rule.

```tsx
<Testimonial
  quote="They helped me see a path I didn't know existed."
  author="Maya R."
  role="Program graduate, 2024"
/>
```

| Prop | Type | Default |
| --- | --- | --- |
| `quote` | `string` | required |
| `author` | `string` | required |
| `role` | `string` | — |

Pass `quote` **without** quotation marks — curly quotes are added automatically.
Passing your own produces doubled quotes.

Renders semantic `<blockquote>` and `<footer>`. For multiple testimonials, use a
grid — don't build a carousel (see `foundations/motion.md`):

```tsx
<div className="grid gap-6 lg:grid-cols-3">
  {testimonials.map((t) => <Testimonial key={t.author} {...t} />)}
</div>
```

Keep quotes to one or two sentences. Long quotes break the visual rhythm of a
grid and read as body copy rather than a highlight.

## Common mistakes

- White card on a white section — no separation.
- `interactive` on a card that isn't a link, or with links nested inside.
- `onClick` on a `Card` instead of wrapping in `Link`.
- `StatBand` with three or five stats.
- Manual quotation marks in `Testimonial`'s `quote`.
- Forgetting `tone="dark"` on `StatBand` inside a dark section.
- Overriding `rounded-xl` or card padding instead of using `tone`.
