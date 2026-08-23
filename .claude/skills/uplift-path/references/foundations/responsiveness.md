# Responsiveness

How Uplift Path handles screen size. Read this before laying out a page.

The system is responsive through three mechanisms, in order of preference:

1. **Fluid tokens** — type and section spacing scale continuously via `clamp()`.
2. **Layout primitives** — `Container` and `Section` own width and rhythm.
3. **Breakpoint utilities** — Tailwind's defaults, only for changing *layout
   structure* (column counts, stacking, showing/hiding).

Reach for the highest mechanism that solves the problem. Most responsive work
needs no breakpoints at all.

## Breakpoints

Tailwind's default scale, unmodified:

| Prefix | Min width | Typical role |
| --- | --- | --- |
| — | 0 | Mobile base — always the default |
| `sm:` | 640px | Large phones; two-column grids appear |
| `md:` | 768px | Tablets; gutters widen to 2rem, desktop nav appears |
| `lg:` | 1024px | Laptops; three-column grids, side-by-side hero |
| `xl:` | 1280px | Container reaches `--container-max` |
| `2xl:` | 1536px | Rarely needed |

`md:` (768px) is the meaningful brand threshold — `--container-gutter` steps from
`1.25rem` to `2rem` there, and `SiteHeader` swaps its mobile menu for inline nav.
Keep structural nav changes on `md:` so they stay in sync with the gutter.

## Mobile-first, always

Write the unprefixed mobile case first, then add breakpoints upward. Never use a
breakpoint to *undo* a desktop default.

```tsx
// Correct — mobile base, enhanced upward.
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

// Wrong — desktop-first, then walked back.
<div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
```

## Type and spacing need no breakpoints

Every type step and `--section-space` is already a `clamp()`. Adding breakpoint
overrides on top produces visible jumps mid-range.

```tsx
// Correct — the token is already fluid.
<Heading as="h1" size="display">Uplifting every life</Heading>

// Wrong — fights the clamp.
<Heading as="h1" size="h2" className="md:text-display" />
```

Same for section padding: don't add `py-12 md:py-24` to a `Section`. Use the
`space` prop.

## Never hard-code widths

Fixed pixel widths overflow small viewports and are the most common responsive
bug in this system.

```tsx
// Wrong
<div className="w-[480px]">
<Card className="w-96">

// Correct — constrain the maximum, let it shrink.
<div className="w-full max-w-[30rem]">
<div className="max-w-[46ch]">   {/* text measure */}
```

Use `max-w-*` and `ch` units. For text, cap by measure (`max-w-[46ch]` for
lead-ins, `max-w-[65ch]` for body) rather than by pixels.

## Grid patterns

Standard progressions used across the system:

```tsx
// Feature cards: 1 → 2 → 3
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

// Stats: 2 up on mobile (short values), 4 across on desktop
<dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">

// Form rows: stack, then pair
<div className="grid gap-4 sm:grid-cols-2">

// Hero: stack, then split
<div className="grid items-center gap-12 lg:grid-cols-2">
```

Prefer `auto-fit` when the item count is dynamic and you don't want orphan rows:

```tsx
<div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
```

`FeatureGrid` already implements the 1 → 2 → 3 progression with a `columns`
prop — use it rather than rebuilding the grid.

## Hero layout

Heroes stack on mobile with text first, then split at `lg:`. Center text while
stacked, left-align once side by side:

```tsx
<div className="grid items-center gap-12 lg:grid-cols-2">
  <div className="text-center lg:text-left">…</div>
  <div className="order-first lg:order-last">{/* visual */}</div>
</div>
```

## Touch targets

Interactive elements need at least 44×44px on touch. The `Button` `md` size is
`h-11` (44px) and `icon` is `size-11` — both compliant. If you build a custom
control, don't go below `h-11` on anything a thumb has to hit. `sm` (`h-9`) is
acceptable only for dense desktop UI or secondary inline actions.

## Overflow

Wide content — tables, code blocks, card rows — should scroll rather than force
the page horizontal:

```tsx
<div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
  <table className="min-w-[40rem]">…</table>
</div>
```

The negative margin lets the scroll area bleed to the gutter edge on mobile so
content doesn't look clipped.

## Verify

Check 375px, 768px, and 1440px at minimum. Look for: horizontal scrollbars,
display type wrapping badly, nav overlapping the logo, touch targets under 44px,
and body text running past ~75 characters.
