# Feedback — Alert and Badge

Source: `components/uplift/alert.tsx`, `components/uplift/badge.tsx`.

```tsx
import { Alert, Badge } from '@/components/uplift'
```

Both follow the same contrast principle: **tone is carried by a 10% tint
background and a border, with ink text on top.** Never a 100% brand fill with
white text — that's where the palette fails AA.

## Alert

Inline message block with an icon, optional title, and body content.

```tsx
<Alert tone="info" title="Applications open">
  Spring cohort applications close on 30 April.
</Alert>
```

| Prop | Type | Default |
| --- | --- | --- |
| `tone` | `'info' \| 'success' \| 'alert'` | `'info'` |
| `title` | `string` | — |

| Tone | Background / border | Icon | Use |
| --- | --- | --- | --- |
| `info` | `surface-blue` / `blue-40` | `Info` | Neutral information, deadlines |
| `success` | `surface-teal` / `teal-40` | `CircleCheck` | Confirmations |
| `alert` | `orange-10` / `orange-70` | `TriangleAlert` | Errors, urgent warnings |

Icons come from `lucide-react` and are chosen per tone — you don't pass one.

### Roles are automatic

`tone="alert"` renders `role="alert"` (interrupts screen readers immediately);
the others render `role="status"` (announced politely). Don't override these.

This means `alert` should only be used for genuinely urgent messages. Overusing
it makes screen-reader output hostile, and it burns the orange accent that the
brand reserves for rare emphasis.

### Text color

Body and title text is always ink. Orange or teal text on the tint would fall
below 4.5:1. Don't restyle it:

```tsx
// Wrong
<Alert tone="alert" className="text-alert">…</Alert>
```

### Placement

- **Form-level** — above the submit button, after the fields.
- **Page-level** — top of the content area, inside the `Container`.
- **Not for per-field errors** — use `Field`'s `error` prop instead.

```tsx
<form className="flex flex-col gap-5">
  {/* fields */}
  {error ? <Alert tone="alert" title="Couldn't send">{error}</Alert> : null}
  <Button type="submit">Send message</Button>
</form>
```

## Badge

Small pill for status, category, or metadata.

```tsx
<Badge>Now enrolling</Badge>
<Badge tone="blue" size="sm">Beta</Badge>
```

| Prop | Type | Default |
| --- | --- | --- |
| `tone` | `'teal' \| 'blue' \| 'neutral' \| 'alert' \| 'onDark'` | `'teal'` |
| `size` | `'sm' \| 'md'` | `'md'` |

| Tone | Use |
| --- | --- |
| `teal` | Default, positive or brand-forward status |
| `blue` | Informational, secondary categories |
| `neutral` | Low-emphasis metadata, counts |
| `alert` | Urgent status — use rarely |
| `onDark` | On dark sections or the gradient (translucent white) |

All tones except `onDark` use ink text on a tint with an inset ring. `onDark`
uses `bg-white/10` with white text.

### With icons

Nested SVGs are auto-sized to `size-3.5`:

```tsx
import { Sparkles } from 'lucide-react'

<Badge tone="teal">
  <Sparkles aria-hidden="true" />
  New program
</Badge>
```

### Badges are not buttons

`Badge` renders a `<span>` with no interactive affordance. If it needs to be
clickable, use a `Button` (`variant="ghost"`, `size="sm"`) or wrap the badge in a
real link — don't attach `onClick` to the span.

### On dark sections

```tsx
<Section tone="dark">
  <Container>
    <Badge tone="onDark">Spring 2026</Badge>
  </Container>
</Section>
```

Using a light-tint badge tone on a dark section produces a bright chip that
fights the section — use `onDark`.

## Choosing between them

- **`Badge`** — a static, one- or two-word label attached to something.
- **`Alert`** — a sentence the user needs to read and act on.

If you're writing more than three words, it's an `Alert`.

## Common mistakes

- `tone="alert"` for routine messages, hijacking `role="alert"`.
- Restyling alert text to orange or teal (fails AA).
- Using `Alert` for per-field validation instead of `Field`'s `error`.
- Light badge tones on dark sections instead of `onDark`.
- Attaching click handlers to `Badge`.
- Overriding `rounded-pill` on badges.
