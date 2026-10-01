/**
 * Where the site thinks it lives, and whether it is allowed to be indexed.
 *
 * One switch, not two. `INDEXABLE` decides both, so a build is either wholly a
 * staging build or wholly a production one and there is no third state to get
 * half-right:
 *
 *   - default (production) — every absolute URL the build emits names
 *     upliftpathwellness.com, and the site is indexable.
 *   - `NEXT_PUBLIC_INDEXABLE=false` (staging) — every absolute URL names the
 *     workers.dev host, and `robots.txt` plus the per-page robots meta keep
 *     it out of the index.
 *
 * This is a change of approach, and the reason is worth keeping. `SITE_URL`
 * used to be pinned to the production domain even on staging, on the argument
 * that the URLs we emit would then already be correct on cutover day. That is
 * true of a canonical, which a crawler reads as a claim and files away — being
 * early is harmless there. It is not true of anything a machine goes and
 * *fetches*. An `og:image` is fetched the instant someone pastes the link into
 * Slack, LinkedIn or iMessage; pointed at a production domain that is still
 * serving someone else's site, it 404s and the preview comes back as bare
 * text. That is exactly what happened on the first share of the staging link.
 *
 * Rather than special-case the image, the origin now simply describes reality.
 * A staging build that says staging everywhere is a faithful rehearsal of the
 * live one: what you see in a share preview, a canonical or the sitemap on
 * workers.dev is what production will emit, with only the host differing.
 *
 * `NEXT_PUBLIC_SITE_URL` still overrides both, for a preview deploy on some
 * other host.
 *
 * The default is the production build. It used to be the other way round —
 * staging unless `NEXT_PUBLIC_INDEXABLE=true` — so that a forgotten variable
 * could never let a staging copy compete with the client's old site. That
 * reasoning expired at the domain cutover on 2026-09-29: the Worker now *is*
 * upliftpathwellness.com, and the same default turned into the opposite
 * failure. The go-live deploy was a plain build, so the live site shipped
 * `noindex, nofollow`, a blanket `Disallow: /` and canonicals pointing at
 * workers.dev — de-indexing the domain it was meant to replace. Failing safe
 * now means failing to production. A staging build is the explicit act:
 *
 *     NEXT_PUBLIC_INDEXABLE=false pnpm build
 *
 * The workers.dev host serves the same production build; its canonicals name
 * the apex, so a crawler that finds it files the pages under the apex.
 *
 * Read at build time, not request time: `output: 'export'` means there is no
 * server, so whatever these are when the static export runs is what ships.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE !== "false";

/** The production domain, live since 2026-09-29. */
const PRODUCTION_URL = "https://upliftpathwellness.com";

/** The workers.dev host, for a staging build. */
const STAGING_URL = "https://uplift-path.black-cake-c8c6.workers.dev";

/**
 * The origin every absolute URL resolves against: `metadataBase`, canonicals,
 * the sitemap, the share card and (later) the JSON-LD `@id`s.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (INDEXABLE ? PRODUCTION_URL : STAGING_URL);

/** Routes that exist but must never be indexed, whatever `INDEXABLE` says. */
export const NOINDEX_ROUTES = [
  "/faq-for-test",
  "/page-20",
  "/booking",
  "/cmps",
  "/consent-form",
];
