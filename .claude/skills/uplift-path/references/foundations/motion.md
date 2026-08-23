# Motion

Source: `app/globals.css` (`@theme inline` motion tokens, reduced-motion block).

Motion in Uplift Path is functional, not decorative — it confirms interaction and
smooths state changes. The brand is calm and supportive; bouncy or attention-
grabbing animation is off-tone.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-brand` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions |
| `--duration-fast` | `120ms` | Hover, focus, small color shifts |
| `--duration-base` | `200ms` | Buttons, cards, most state changes |
| `--duration-slow` | `320ms` | Disclosure, mobile menu, larger movement |

One easing curve for everything — a gentle standard ease-in-out. Don't introduce
spring, bounce, or `ease-linear` (except for continuous spinners).

## Applying them

```tsx
<div className="transition-colors duration-[var(--duration-fast)] ease-[var(--ease-brand)] hover:bg-surface-subtle">
```

`Button` and `Card` already carry their transitions. You only wire motion
manually on custom interactive elements.

## Transition the specific property

Use `transition-colors`, `transition-transform`, `transition-opacity`, or
`transition-shadow` — not `transition-all`. `transition-all` animates layout
properties like `width` and `height`, which forces reflow and stutters.

```tsx
// Correct
<div className="transition-shadow duration-[var(--duration-base)] hover:shadow-lg">

// Avoid
<div className="transition-all hover:shadow-lg">
```

Animate `transform` and `opacity` where possible — they're GPU-composited and
don't trigger layout.

## Interaction conventions

| Element | Behavior |
| --- | --- |
| Buttons | Background darkens on hover; no lift, no scale |
| Cards (`interactive`) | Shadow deepens, `-translate-y-0.5` |
| Links | Underline appears on hover |
| Inputs | Border color shifts to ring color on focus |
| Focus rings | Appear instantly — never transitioned |

Keep hover lift subtle: `-translate-y-0.5` (2px). Larger movement reads as
playful and makes dense card grids feel unstable.

Never transition the focus ring. A delayed or faded ring is a real accessibility
problem for keyboard users — it must appear the moment focus lands.

## Reduced motion

`globals.css` includes a global `prefers-reduced-motion: reduce` block that
collapses all animation, transition, and smooth scrolling to near-zero:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Standard CSS transitions are therefore covered automatically. But this does not
cover JS-driven animation — if you add any (a scroll-triggered reveal, a counter
that ticks up), check the preference yourself and skip straight to the final
state:

```tsx
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

Never gate *content* behind an animation. If a scroll-reveal doesn't fire, the
text must still be visible and readable.

## What not to add

- Autoplaying carousels or looping background animation.
- Parallax on the hero.
- Entrance animations on every section as the user scrolls — a whole page of
  staggered reveals delays reading and feels unsettled.
- Animated gradients. The gradient is already a strong accent; moving it makes
  it louder still.
