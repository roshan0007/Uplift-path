/**
 * Where the site thinks it lives, and whether it is allowed to be indexed.
 *
 * Two switches, deliberately independent:
 *
 * `SITE_URL` is the canonical production origin. Canonical tags, the sitemap
 * and (later) the JSON-LD `@id`s all resolve against it, so it is the
 * production domain even while we are deployed to staging — that way the URLs
 * we emit are already correct on the day of the cutover and nothing has to be
 * remembered. Staging is kept out of the index by `INDEXABLE`, not by pointing
 * canonicals at the workers.dev host.
 *
 * `INDEXABLE` gates `robots.txt` and the per-page robots meta. **It defaults to
 * false**, so the failure mode of a forgotten environment variable is a site
 * that is invisible to search — never a staging build quietly competing with
 * the client's live site for its own keywords. Turning it on is an explicit act:
 *
 *     NEXT_PUBLIC_INDEXABLE=true pnpm build
 *
 * Read at build time, not request time: `output: 'export'` means there is no
 * server, so whatever these are when the static export runs is what ships.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://upliftpathwellness.com";

export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/** Routes that exist but must never be indexed, whatever `INDEXABLE` says. */
export const NOINDEX_ROUTES = [
  "/faq-for-test",
  "/page-20",
  "/booking",
  "/cmps",
  "/consent-form",
];
