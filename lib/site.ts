/**
 * Where the site thinks it lives, and whether it is allowed to be indexed.
 *
 * One switch, not two. `INDEXABLE` decides both, so a build is either wholly a
 * staging build or wholly a production one and there is no third state to get
 * half-right:
 *
 *   - default (staging) — every absolute URL the build emits names the
 *     workers.dev host it is actually served from, and `robots.txt` plus the
 *     per-page robots meta keep it out of the index.
 *   - `NEXT_PUBLIC_INDEXABLE=true` (production) — the same URLs all move to
 *     the production domain together, in one build, at the cutover.
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
 * The defaults are chosen so that a forgotten environment variable fails safe:
 * no flag means noindex *and* staging URLs, never a staging build quietly
 * competing with the client's live site for its own keywords. Turning it on is
 * an explicit act:
 *
 *     NEXT_PUBLIC_INDEXABLE=true pnpm build && npx wrangler deploy
 *
 * Read at build time, not request time: `output: 'export'` means there is no
 * server, so whatever these are when the static export runs is what ships.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/** The production domain. Used once the site is allowed to be indexed. */
const PRODUCTION_URL = "https://upliftpathwellness.com";

/** Where the build is really served until the domain cutover. */
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
