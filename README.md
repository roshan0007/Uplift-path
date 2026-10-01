# Uplift Path — website

The Uplift Path site: Next.js 16 (App Router) + Tailwind v4, exported as
a static site to `out/` and served by Cloudflare Workers.

Every visual decision lives in the design skill at
`.claude/skills/uplift-path-design/` — read `readme.md` there before touching UI.
`CLAUDE.md` covers the repo layout and the rules that come with it.

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

`next.config.mjs` sets `output: 'export'`, so the build writes a fully static site
to `out/`. There are no API routes, no middleware and no server actions, and
`next/image` optimization is off.

## Deploy

There is no CI deploy. Build and deploy `out/` to Cloudflare Workers by hand
(`wrangler.jsonc` points at it):

    pnpm build && npx wrangler deploy

A plain build is the production build for upliftpathwellness.com — indexable,
with canonicals on the apex. For a noindexed staging build, pass
`NEXT_PUBLIC_INDEXABLE=false` (see `lib/site.ts`).
