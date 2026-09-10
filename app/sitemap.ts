import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// `output: 'export'` has no server to run this per-request, so it must be
// declared static — Next refuses to export the route otherwise. The values it
// bakes in are whatever the environment held at build time, which is exactly
// the intent: the staging lock is a property of the build, not of the request.
export const dynamic = "force-static";

/**
 * The eleven public routes, listed by hand.
 *
 * Deliberately not derived from the filesystem: `app/` also holds the two
 * Relume scratch pages (`/faq-for-test`, `/page-20`) and the three intake-funnel
 * routes outside the `(site)` group, none of which belong in a sitemap. An
 * explicit list is one line to maintain per new page and cannot silently start
 * advertising a page that was never meant to be public.
 *
 * `priority` is left off everything but the homepage — Google has said for years
 * that it ignores the field, and a column of invented 0.8s is noise.
 */
const ROUTES = [
  "/",
  "/about-us",
  "/how-we-work",
  "/for-business",
  "/for-individual",
  "/advisory-services",
  "/ai-consultation",
  "/compliance-support",
  "/resource-assistance",
  "/systems-technology",
  "/careers",
  "/contact-us",
  "/accessibility",
  "/privacy-policy",
  "/terms-of-use",
  "/grievance",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified,
    ...(route === "/" ? { priority: 1 } : {}),
  }));
}
