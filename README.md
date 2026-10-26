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
to `out/`. There are no Next API routes, no middleware and no server actions, and
`next/image` optimization is off. The one server-side route is a plain Cloudflare
Worker script, below.

## Deploy

There is no CI deploy. Build and deploy `out/` to Cloudflare Workers by hand
(`wrangler.jsonc` points at it):

    pnpm build && npx wrangler deploy

A plain build is the production build for upliftpathwellness.com — indexable,
with canonicals on the apex. For a noindexed staging build, pass
`NEXT_PUBLIC_INDEXABLE=false` (see `lib/site.ts`).

## Coach accept / decline (`/accept-client`)

A coach opens `/accept-client?case=UPW-123` from an email, types their own
email, and presses **Accept** or **Decline**. The page calls
`POST /api/coach-response`, which is `worker/index.ts` — a Worker script that
sits in front of the static assets and runs only for `/api/*` (see
`run_worker_first` in `wrangler.jsonc`). It adds the Zoho API key and calls the
CRM function `uplift_coach_response`; the browser never sees Zoho or the key.

The key is a Worker **secret** named `ZOHO_COACH_API_URL`: the full Zoho
"execute" URL including its `auth_type=apikey&zapikey=…`. It is never in the
repo. Set it yourself, on the account that owns the `uplift-path` Worker:

```bash
npx wrangler secret put ZOHO_COACH_API_URL
```

Without it the route answers `503` and the page shows its generic error.

To run it locally, put the same name in a `.dev.vars` file (gitignored) and run
`pnpm build && npx wrangler dev`. Test with `decision=check`, which is
read-only; `accept` and `reject` change CRM data.
