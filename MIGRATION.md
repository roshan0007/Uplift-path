# Migrating `E:\uplift-path-website` from v0 to Relume + Uplift Path

Read this whole file before touching anything. Step 0 decides the rest.

---

## Step 0 — Confirm the Tailwind version

```
cat package.json | grep -i tailwind
ls tailwind.config.*
```

**Tailwind v4** (`"tailwindcss": "^4"`, no `tailwind.config.js`, `@tailwindcss/postcss` in
`postcss.config.mjs`) — the root listing suggests this is your case. Follow Track A.

**Tailwind v3** (`"tailwindcss": "^3"`, a `tailwind.config.js` exists) — follow Track B.

Do not mix them. Relume's `@relume_io/relume-tailwind` preset is v3-only and is silently
ignored by v4.

---

## What goes where

| Source | Destination | Notes |
|---|---|---|
| Design system zip | `.claude/skills/uplift-path-design/` | `.claude/` already exists |
| Relume export `components/**` | `components/sections/` | The page sections |
| Relume export `@/components/ui/**` | `components/ui/` | **Overwrites v0's** — see below |
| Design system `missing-components/*.jsx` | `components/sections/<matching folder>/` | 3 files Relume dropped |
| Design system `assets/fonts/*` | `public/fonts/` | Self-hosted woff2 |
| Design system `assets/logo/`, `assets/images/` | `public/` | |
| Relume export images | `public/images/` | Download before URLs expire |

---

## Delete (the v0 design system)

Inspect each before deleting — some may have been hand-edited since v0 generated them.

```
uplift-path-design-guidelines/     # superseded by the skill
components/ui/                     # v0's shadcn primitives — Relume's replace these
```

Also review, but **do not blind-delete**:

- `app/globals.css` — rewritten in Step 1, not deleted
- `components.json` — shadcn config. Keep if you still want `npx shadcn add`; the paths
  stay valid. Delete only if you're going all-Relume.
- `lib/utils.ts` — keep. Relume's components import `cn` from here too.
- `app/**` routes — keep the routing, replace the section imports inside each page.

Check nothing else imports from `components/ui` before overwriting:

```
grep -rn "@/components/ui" app components --include=*.tsx --include=*.jsx
```

---

## Track A — Tailwind v4 (likely your case)

Relume's preset can't be used. Port the tokens into CSS instead.

**1. `app/globals.css`** — replace the v0 theme block with:

```css
@import "tailwindcss";

/* paste the @theme block from the skill's tokens/tailwind-theme.css here */

/* then the @font-face rules from tokens/fonts.css,
   pointing at /fonts/ instead of ../assets/fonts/ */

/* then the .scheme-N classes from tokens/schemes.css */
```

The skill's `tokens/tailwind-theme.css` is already v4 `@theme` syntax — it drops in directly.

**2. Still install `@relume_io/relume-ui`** — you need it for the icon imports
(`relume-icons`) that the export's components reference. You just won't use its
Tailwind preset.

```
pnpm add @relume_io/relume-ui
```

**3. Expect class-name gaps.** Relume's components use utilities its v3 preset defines —
`text-h2`, `rounded-image`, `border-scheme-border`, `bg-scheme-foreground`, `md:mb-18`.
The `@theme` block covers most (`--text-h2`, `--radius-image`, `--spacing-18`). The
`scheme-*` colour utilities need explicit `@theme` entries:

```css
@theme {
  --color-scheme-background: var(--color-scheme-background);
  --color-scheme-foreground: var(--color-scheme-foreground);
  --color-scheme-text: var(--color-scheme-text);
  --color-scheme-border: var(--color-scheme-border);
  --color-scheme-accent: var(--color-scheme-accent);
}
```

Those resolve per-section against the `.scheme-N` class. Verify by rendering one section
of each scheme and checking nothing falls back to transparent.

---

## Track B — Tailwind v3

```
pnpm add @relume_io/relume-ui @relume_io/relume-tailwind
```

`tailwind.config.js`:

```js
module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
};
```

The preset supplies every token. Don't redefine colours or type scale on top of it.

---

## Both tracks

**Fonts.** Copy the woff2 files to `public/fonts/`, add `@font-face` in `globals.css`.
Do not load from the Google Fonts CDN — the export self-hosts deliberately. Or use
`next/font/local` if you'd rather.

**Images expire 4 Sep 2026.** Every `imagedelivery.net` URL is signed with
`exp=1788307200`. Download what you're keeping into `public/images/` now:

```
grep -rho "https://imagedelivery.net[^\"]*" components/ | sort -u
```

**Cloudflare.** You have `wrangler.jsonc` and `out/`, so this is a static export.
Confirm `next.config.mjs` still has `output: "export"` and that
`images: { unoptimized: true }` is set — `next/image` optimization doesn't run on a
static export.

**The three recovered components.** `missing-components/` in the skill holds `Layout613`,
`Layout564`, `Layout615`, which Relume's exporter refused because of an invalid nested
`<img>`. Copy them into the matching section folders.

---

## `CLAUDE.md` at the repo root

```md
## Design

Follow `.claude/skills/uplift-path-design/readme.md` for all visual decisions,
and `production.md` in that skill for the component map.

- Page sections live in `components/sections/`, primitives in `components/ui/`.
  Never rewrite a primitive — compose it.
- Never invent colors, shadows, or radii. Everything comes from the tokens.
- Every section gets exactly one `.scheme-N` class; children read `--color-scheme-*`.
- Headings are Playfair Display weight 400. Never bold.
- Cards: 2px border, 8px radius, no shadow. This brand has no elevation system.
- Inputs: 2px bottom border only, transparent fill, no focus ring.
- No emoji, no gradients, no press-state transforms.
```

---

## Order of operations

1. `git checkout -b relume-migration`
2. Confirm Tailwind version (Step 0)
3. Unzip the skill into `.claude/skills/uplift-path-design/`
4. `grep` for `@/components/ui` imports, note what breaks
5. Delete `uplift-path-design-guidelines/` and `components/ui/`
6. Copy in Relume's `components/ui/` and `components/**`
7. Copy in `missing-components/*.jsx`
8. Install packages, rewrite `globals.css` (Track A or B)
9. `pnpm dev` — fix class-name gaps one section at a time
10. Download the expiring images
11. Write `CLAUDE.md`

Do step 9 before step 10; broken styling is easier to diagnose than broken styling plus
broken images.

---

## Known unknowns

I could not read the project itself — this is written from the root directory listing and
the Relume export. Before executing, verify:

- whether `app/` pages import v0 components that don't exist in the Relume export
- whether `components/` has hand-written non-v0 code worth keeping
- what `.claude/` already contains (an existing `CLAUDE.md` should be merged, not replaced)
