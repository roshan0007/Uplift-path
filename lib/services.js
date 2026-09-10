import { SYMBOL_BASE } from "@/components/ui/symbol-icon";

/**
 * The canonical service lists.
 *
 * These used to live at the top of `components/sections/navbar-12.jsx`. They
 * were lifted here when the merged `/for-business` started rendering the
 * same six services as cards: the nav and the page have to say the same thing,
 * and the only way to guarantee that is for them to read the same array.
 *
 * The descriptions are the page subheadings from
 * `.claude/skills/uplift-path-design/design-export/sitemap.md`, so each one
 * matches what its destination actually says. `icon` is a Material Symbols
 * Rounded glyph name — see `iconUrl` in navbar-12.
 *
 * `description` is the full line, which the service cards on /for-business
 * render. `short` is the one-line version the navbar's mega-menu renders: at the
 * sheet's column width the full descriptions run to two lines each, and six of
 * those stacked made the menu taller than it needed to be. Same service, same
 * claim, fewer words — not a different promise.
 *
 * Plain data, no "use client": both a server page and a client section can
 * import it.
 */

export const BUSINESS_SERVICES = [
  {
    label: "AI Consultation",
    description:
      "Leverage AI-driven strategies to streamline operations and decision-making.",
    short: "AI strategies for operations and decisions.",
    href: "/ai-consultation",
    icon: "business_messages",
  },
  {
    label: "Advisory Services",
    description:
      "Strategic guidance tailored for behavioral health, nonprofit, education, and growing organizations.",
    short: "Strategic guidance for growing organizations.",
    href: "/advisory-services",
    icon: "medical_services",
  },
  {
    // The slug was renamed to `/systems-technology` on 2026-09-11 and the
    // ampersand problem went with it. What used to be here was a note that no
    // spelling of the old slug worked in both environments — raw "&" served 200
    // in dev but took a 307 to the encoded form in production, and
    // "%26" did the reverse — so it picked the form that cost a redirect hop
    // rather than the one that hard-404s locally, and said not to rename.
    //
    // Renaming was in fact the fix: the auditors' crawler reported the page as
    // "/systems-%26-technology", which is what an ampersand in a path becomes
    // on the wire. The old slug 301s in `public/_redirects`.
    label: "Systems & Technology",
    description:
      "Build scalable systems, streamline operations, and improve organizational efficiency.",
    short: "Scalable systems and cleaner operations.",
    href: "/systems-technology",
    icon: "devices",
  },
  {
    label: "Compliance Support",
    description: "Support operational readiness and compliance processes.",
    short: "Operational readiness and compliance.",
    href: "/compliance-support",
    icon: "more_time",
  },
  {
    // `/business-conusltation` was merged into `/for-business` and now 301s
    // there (see `public/_redirects`). The service itself is still a real
    // offering, so the entry stays and points at the section of the merged page
    // that carries the old page's content.
    label: "Business Consultation",
    description: "Expert guidance to grow, optimize, and scale your business.",
    short: "Grow, optimize and scale your business.",
    href: "/for-business#business-consulting",
    icon: "add_business",
  },
  {
    label: "Resource Assistance",
    description:
      "Helping organizations access tools, systems and operational support resources.",
    short: "Tools, systems and operational support.",
    href: "/resource-assistance",
    icon: "support",
  },
];

// Peer Coaching is the individual offering. It is deliberately absent from
// BUSINESS_SERVICES and must not be listed on the business page.
export const INDIVIDUAL_SERVICES = [
  {
    label: "Peer Coaching Support (Telehealth)",
    description: "Help navigating difficulties of life.",
    short: "Help navigating difficulties of life.",
    href: "/for-individual",
    icon: "chat_info",
  },
];

// Pinned via `SYMBOL_BASE`, not `@latest`. The export requested `@latest`,
// which re-resolves on every visitor's request and can change the glyphs under
// a static build with no deploy. This is the same base the `SymbolIcon`
// primitive uses, so the nav icons and the section icons cannot drift onto
// two different versions of the set.
export const iconUrl = (name) => `${SYMBOL_BASE}/${name}.svg`;
