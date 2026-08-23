# Colors

Source: `app/globals.css` (`@theme inline` block), derived from the Uplift Path
Brand Guidelines palette slide and the brand owner's accessibility overrides.

Light mode only. There is no dark palette.

## Brand ramps

Four ramps, each at the palette slide's 10% / 40% / 70% / 100% tints. The `100`
step is the true brand color; lower steps are tints toward white.

| Token | Hex | Typical use |
| --- | --- | --- |
| `teal-10` | `#e6faf6` | Tinted section backgrounds, badge fills |
| `teal-40` | `#9cecdb` | Selection highlight, soft accents, dividers |
| `teal-70` | `#52dec1` | Primary button hover, stats on dark |
| `teal-100` | `#08d1a7` | **Primary brand.** Fills, icon accents |
| `blue-10` | `#e5f5fa` | Tinted backgrounds, informational fills |
| `blue-40` | `#99d8ec` | Soft accents on dark |
| `blue-70` | `#4dbbde` | Secondary hover states |
| `blue-100` | `#019ed0` | **Secondary brand.** Fills, links, focus ring |
| `ink-10` | `#e9ebed` | Borders, pressed states |
| `ink-40` | `#aab1b9` | Strong borders, disabled text |
| `ink-70` | `#6b7784` | Muted body copy |
| `ink-100` | `#2c3e50` | **Headings, body text, dark sections** |
| `orange-10` | `#fff2ea` | Alert background tint |
| `orange-40` | `#ffd8c1` | Alert border |
| `orange-70` | `#ffa56f` | Alert accent on dark |
| `orange-100` | `#ff7f32` | **Alert accent — use rarely** |

Use as Tailwind utilities: `bg-teal-10`, `text-ink-70`, `border-ink-10`.

## Semantic roles

Prefer these over raw ramp steps — they carry intent and survive a palette
change.

| Token | Value | Notes |
| --- | --- | --- |
| `background` | `#ffffff` | Page canvas |
| `surface` | `#ffffff` | Cards, inputs |
| `surface-subtle` | `#f7f9fa` | Alternating section bands |
| `surface-teal` | `#e6faf6` | Teal-tinted band |
| `surface-blue` | `#e5f5fa` | Blue-tinted band |
| `surface-dark` | `#2c3e50` | Dark sections, footer |
| `primary` | `#08d1a7` | Primary fill |
| `primary-foreground` | `#2c3e50` | **Ink, not white** — see below |
| `secondary` | `#019ed0` | Secondary fill |
| `secondary-foreground` | `#ffffff` | Passes AA on deep blue |
| `alert` | `#ff7f32` | Alert fill |
| `alert-foreground` | `#2c3e50` | Ink on orange |
| `foreground` | `#2c3e50` | Default text |
| `foreground-muted` | `#6b7784` | Secondary text |
| `foreground-on-dark` | `#ffffff` | Text on dark sections |
| `foreground-on-dark-muted` | `#d7dde3` | Secondary text on dark |
| `border` | `#e9ebed` | Default border |
| `border-strong` | `#aab1b9` | Emphasized border |
| `ring` | `#019ed0` | Focus ring |

## The white-on-teal rule

This overrides the button spec in the brand guidelines PDF.

`#08d1a7` against white is **1.96:1** — far below the 4.5:1 AA threshold. On any
teal fill, use ink text.

```tsx
// Correct — primary already resolves to ink on teal.
<Button variant="primary">Get started</Button>

// Wrong — never force white onto a teal fill.
<Button variant="primary" className="text-white">Get started</Button>
```

Deep blue (`#019ed0`) *does* pass with white, which is why `secondary` uses
white text. Teal does not. Don't generalize from one to the other.

## Body copy

Body text is `foreground` (ink) or `foreground-muted` (gray). Never teal, never
deep blue — those fail or barely pass at body sizes and read as links.

```tsx
<Text>Readable ink body copy.</Text>
<Text tone="muted">Secondary supporting copy.</Text>

// Wrong
<Text className="text-primary">Teal body copy</Text>
```

Deep blue is acceptable for inline *links* (`Button variant="link"`), where the
underline carries the affordance alongside color.

## The signature gradient

`--gradient-brand` runs `#08d1a7 → #019ed0` at 135°. A horizontal variant,
`--gradient-brand-horizontal`, exists for thin dividers.

Utilities: `bg-gradient-brand`, `bg-gradient-brand-horizontal`,
`text-gradient-brand` (clips the gradient to text).

**Use it sparingly — one or two placements per page.** Approved uses:

- A single hero element (a headline word clipped with `text-gradient-brand`, or
  a low-opacity ambient wash).
- Thin section dividers (`SectionDivider`).
- Small icon accents and avatar rings.
- The CTA band's glow.

```tsx
// Good — one clipped headline word.
<Heading as="h1" size="display">
  Uplifting every <span className="text-gradient-brand">life</span>
</Heading>

// Bad — gradient as a large surface.
<section className="bg-gradient-brand min-h-screen">…</section>
```

Large gradient surfaces fight the logo, break text contrast, and cheapen the
brand. When you need a full-width colored band, use `surface-dark` or a
`teal-10` / `blue-10` tint instead.

## Text on gradient or dark

On `surface-dark` or a gradient, use `foreground-on-dark` /
`foreground-on-dark-muted`, and switch the logo to the white-text file with
`<Logo variant="onDark" />`. Buttons should use `variant="onDark"`
(white fill, ink text) rather than a teal fill, which loses contrast against the
gradient.
