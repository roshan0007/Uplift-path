import type { MetadataRoute } from "next";
import { INDEXABLE, NOINDEX_ROUTES, SITE_URL } from "@/lib/site";

// `output: 'export'` has no server to run this per-request, so it must be
// declared static — Next refuses to export the route otherwise. The values it
// bakes in are whatever the environment held at build time, which is exactly
// the intent: the staging lock is a property of the build, not of the request.
export const dynamic = "force-static";

/**
 * While `INDEXABLE` is false — which is every build that does not explicitly
 * opt in — this emits a blanket disallow. The site is a rebuild of a live,
 * indexed upliftpathwellness.com; a staging copy that gets crawled would be
 * duplicate content competing with the client's own pages.
 *
 * The disallow is belt to the per-page `noindex` braces: robots.txt asks a
 * crawler not to fetch, `noindex` tells it not to list what it fetched anyway.
 * Neither alone is reliable, so we ship both until launch.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: NOINDEX_ROUTES }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
