# Buttons

Source: `components/uplift/button.tsx`.

```tsx
import { Button, ButtonLink } from '@/components/uplift'
```

Geometry comes from the brand guidelines button spec: 24px horizontal / 10px
vertical padding at the default size, ~8px radius (`rounded-md`).

## Button vs ButtonLink

`Button` renders `<button>` — for actions (submit, toggle, open). `ButtonLink`
renders `<a>` with identical styling — for navigation.

```tsx
<Button type="submit">Send message</Button>
<ButtonLink href="/programs">Explore programs</ButtonLink>
```

Don't use `Button` with an `onClick` that navigates — that breaks middle-click,
open-in-new-tab, and keyboard expectations. Don't wrap a `Button` in an `<a>`
either; that nests interactive elements.

With Next.js `Link`, pass it through `asChild`-style composition is not
supported — instead use `ButtonLink` directly for internal routes, or wrap:

```tsx
import Link from 'next/link'

<Link href="/programs" className={buttonVariants({ variant: 'primary' })}>
  Explore programs
</Link>
```

`buttonVariants` is exported for exactly this case.

## Variants

| Variant | Appearance | Use |
| --- | --- | --- |
| `primary` | Teal fill, **ink text** | The one main action per view |
| `secondary` | Deep blue fill, white text | Alternative primary action |
| `outline` | White fill, ink border, ink text | Secondary action beside a primary |
| `ghost` | No fill or border | Tertiary actions, nav items, toolbars |
| `link` | Deep blue text, underline on hover | Inline text actions |
| `onDark` | White fill, ink text | On dark or gradient backgrounds |
| `alert` | Orange fill, ink text | Urgent or destructive — **use rarely** |

Default is `primary`.

### The teal contrast rule

`primary` renders ink (`#2c3e50`) on teal because white on `#08d1a7` is 1.96:1
and fails WCAG AA. This intentionally overrides the brand guidelines PDF, which
shows white text.

```tsx
// Correct
<Button variant="primary">Get started</Button>

// Never — reintroduces the contrast failure
<Button variant="primary" className="text-white">Get started</Button>
```

`secondary` uses white text because deep blue passes. Don't assume the same for
teal.

### On dark backgrounds

Use `onDark`, not `primary`. A teal fill against `surface-dark` or the gradient
loses definition and the ink text drops below AA.

```tsx
<Section tone="dark">
  <Container>
    <Button variant="onDark">Start today</Button>
    <Button variant="ghost" className="text-foreground-on-dark">Learn more</Button>
  </Container>
</Section>
```

`ghost` on dark needs the on-dark text color passed explicitly — it inherits
`foreground` otherwise.

## Sizes

| Size | Height | Padding | Use |
| --- | --- | --- | --- |
| `sm` | 36px (`h-9`) | 16px / 8px | Dense desktop UI, inline actions |
| `md` | 44px (`h-11`) | **24px / 10px** — brand spec | Default |
| `lg` | 52px (`h-13`) | 32px / 12px | Hero CTAs |
| `icon` | 44×44px | — | Icon-only |

`md` and `icon` meet the 44px touch minimum. Avoid `sm` for primary mobile
actions.

## Icon-only buttons

Always give an accessible name — the icon alone is invisible to screen readers.

```tsx
import { X } from 'lucide-react'

<Button variant="ghost" size="icon" aria-label="Close menu">
  <X />
</Button>
```

## Icons with text

Pass the icon as a child. Sizing is handled per variant (`size-4` at `sm`/`md`,
`size-5` at `lg`) — don't set it yourself.

```tsx
import { ArrowRight } from 'lucide-react'

<Button size="lg">Start your path <ArrowRight /></Button>
```

Mark decorative icons `aria-hidden="true"` when the label already carries the
meaning.

## Full width

```tsx
<Button block>Send message</Button>
```

Use `block` for mobile forms and narrow cards. Avoid full-width buttons in wide
desktop containers — a 1280px-wide button looks broken.

## Grouping

One primary action per view. Pair it with `outline` or `ghost`, never two fills:

```tsx
<div className="flex flex-wrap gap-3">
  <Button size="lg">Start your path</Button>
  <Button variant="outline" size="lg">Talk to us</Button>
</div>
```

Use `flex-wrap` so buttons stack rather than overflow on narrow screens.

## Disabled and loading

Disabled state (`opacity-50`, no pointer events) is built in. For loading, keep
the button disabled and swap the label — never remove it, or the button collapses:

```tsx
<Button disabled={pending}>
  {pending ? 'Sending…' : 'Send message'}
</Button>
```

## Common mistakes

- White text on `primary`.
- `Button` with a navigating `onClick` instead of `ButtonLink`.
- `primary` on a dark section instead of `onDark`.
- Icon-only buttons with no `aria-label`.
- Two filled variants side by side, so neither reads as primary.
- Setting `rounded-*` or `px-*` overrides — the geometry is the brand spec.
- Using `alert` for ordinary actions; it's reserved for genuinely urgent ones.
