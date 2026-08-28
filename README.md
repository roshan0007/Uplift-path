# Uplift Path — website

The Uplift Path marketing site: Next.js 16 (App Router) + Tailwind v4, exported as
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

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and deploys
`out/` to Cloudflare Workers via `wrangler.jsonc`.
