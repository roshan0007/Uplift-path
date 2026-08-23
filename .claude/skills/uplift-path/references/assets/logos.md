# Logos and brand assets

Source: `components/uplift/logo.tsx`, files in `public/brand/`.

The logo files are supplied brand assets. **Use them as-is.** Never redraw,
recolor, restyle, or reconstruct the mark — including "just" tracing it as inline
SVG or tinting it with CSS.

## Inventory

| File | Asset | Use |
| --- | --- | --- |
| `public/brand/uplift-path-logo.svg` | Full lockup, dark text | Light backgrounds |
| `public/brand/uplift-path-icon.svg` | Icon mark only | Nav, favicon, tight spaces, mobile |
| `public/brand/uplift-path-logo-white.png` | Lockup, white text | Dark and gradient backgrounds only |
| `public/brand/uplift-path-logo-light-bg.png` | Raster lockup on white | Fallback where SVG isn't viable (email, some social) |
| `public/icon.svg` | Icon mark, as favicon | Wired in metadata |

Prefer the SVGs on the web. The white-text asset is only available as PNG, which
is why `variant="onDark"` renders a raster image.

## Use the Logo component

```tsx
import { Logo } from '@/components/uplift'

<Logo />                                  // lockup, 40px tall
<Logo variant="icon" height={34} />       // icon mark
<Logo variant="onDark" height={38} />     // white text, dark backgrounds
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `'lockup' \| 'icon' \| 'onDark'` | `'lockup'` |
| `height` | `number` (px) | `40` |
| `alt` | `string` | `'Uplift Path'` |
| `priority` | `boolean` | `false` |
| `className` | `string` | — |

`height` is the only dimension you set — width is computed from the asset's real
aspect ratio (lockup `996 / 345`, icon `282 / 345`), so it can't be stretched.
Never pass `width`, and never set a conflicting `w-*` / `h-*` class.

## Choosing a variant

| Background | Variant |
| --- | --- |
| White, `surface-subtle`, `teal-10`, `blue-10` | `lockup` |
| `surface-dark`, gradient, photo | `onDark` |
| Narrow space (mobile nav, avatar, favicon) | `icon` |

The dark-text lockup on a dark background is unreadable, and the white-text
version on white is invisible. `SiteHeader` and `SiteFooter` already pick
correctly — this matters when you place a logo yourself.

### Responsive swap

Render both and toggle by breakpoint, as `SiteHeader` does:

```tsx
<Logo variant="icon" height={34} className="md:hidden" alt="" priority />
<Logo variant="lockup" height={34} className="hidden md:block" alt="" priority />
```

## Alt text

`alt` defaults to `'Uplift Path'`. Pass `alt=""` when the logo sits inside a link
or element that's already labeled — otherwise screen readers announce the brand
twice:

```tsx
<a href="/" aria-label="Uplift Path home">
  <Logo alt="" />
</a>
```

Use `priority` for an above-the-fold logo (the header) so it isn't lazy-loaded.

## Clear space

Keep clear space around the lockup equal to **the height of the icon mark**. In
practice, at a 40px-tall lockup that's roughly 32px of breathing room on all
sides. Don't crowd it against nav items, borders, or section edges.

## Prohibited

Per the brand guidelines:

- **No redrawing or reconstructing** — including inline SVG copies.
- **No recoloring or tinting** — no `fill`, `text-*`, `invert`, `brightness`, or
  `opacity` filters. To place it on dark, use `variant="onDark"`.
- **No stretching or distortion** — set `height` only.
- **No strokes, drop shadows, glows, or outlines.**
- **No bounding boxes, containers, or badges** around the lockup.
- **No removing or separating elements** — don't extract the leaf or the figure
  from the lockup to use alone. If you need a compact mark, that's
  `variant="icon"`, which is the approved standalone asset.
- **No rotation.**
- **No placing the light lockup over a busy photo or the gradient** where
  contrast can't be guaranteed.

```tsx
// Wrong
<Logo className="brightness-0 invert" />
<Logo className="drop-shadow-lg" />
<Logo className="h-10 w-40" />
<img src="/brand/uplift-path-logo.svg" width={200} height={40} />

// Correct
<Logo variant="onDark" height={40} />
```

The last wrong example matters: bypassing `Logo` with a raw `<img>` loses the
aspect-ratio guard and the Next.js image optimization.

## Favicon

`public/icon.svg` is the icon mark and is picked up automatically by Next.js
metadata conventions. It's already wired — don't add a second favicon or
overwrite it with a different mark.

## Other imagery

There are no illustration or photography assets in this design system. When a
page needs a visual:

- Prefer composition from tokens — tinted `Card`s, badges, the gradient accent.
- If a photograph is genuinely needed, source it separately and don't recolor it
  to force brand alignment.
- Never place placeholder stock imagery in delivered work.
