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

## Coach accept / decline (`/accept-client`)

A coach opens `/accept-client?case=UPW-123` from an email, types their own
email, and presses **Accept** or **Decline**. The page posts
`{ action: "coachResponse", caseId, email, decision }` to the `uplift-api`
Worker (`lib/booking-api.js`), which adds the Zoho API key and calls the CRM
function `uplift_coach_response`. The browser never sees Zoho or the key.

`uplift-api` is not deployed from this repo: its code is edited in the
Cloudflare dashboard, and its key is the Worker **secret**
`ZOHO_COACH_API_URL` (the full Zoho "execute" URL including
`auth_type=apikey&zapikey=…`). It is never in this repo. The Worker answers
only the production domain and the workers.dev host, so the page does not work
from `localhost`.

`decision=check` is read-only; `accept` and `reject` change CRM data.
