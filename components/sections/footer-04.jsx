"use client";

import { CARF_PROVIDER_URL, CarfSeal } from "@/components/brand/carf-seal";
import React from "react";
import { LinkedinLogo } from "relume-icons";

/**
 * Two bands, per the 2026-09 Figma: a white band carrying the logo lockup,
 * then a torn paper edge, then the green band with the nav and the legal row.
 *
 * That split is why this file carries two scheme classes rather than one. The
 * usual rule is one scheme per section, and the intent behind it — a region's
 * colours all resolve from a single scheme — still holds here: the white band
 * is `scheme-1` throughout and the green band is `scheme-accent` throughout.
 * They are two regions that happen to share a `<footer>`, not one region with
 * two minds.
 *
 * Site chrome, so all of this lands on every route at once. That is intended.
 *
 * TEXT ON THE GREEN IS WHITE, MATCHING THE FIGMA, AND THAT IS A KNOWN
 * CONTRAST EXCEPTION. Earlier passes of this file used the dark neutral and
 * argued for it; white was then explicitly asked for. The numbers:
 *
 *     white   on #01a66e (this band)   3.14:1   fails WCAG AA body text
 *     #000a08 on #01a66e               6.38:1   passes
 *
 * These are 14px links, which do not qualify for the 3:1 large-text allowance
 * (24px, or 18.66px bold). So CLAUDE.md's "never white on the green" is
 * overridden here by decision, not satisfied — this is the only place in the
 * brand that is true, and `scheme-jade` exists partly so it cannot leak into
 * the eleven `cta-25` banners still on `scheme-accent`.
 *
 * If AA is wanted back, `globals.css` [10] lists the two fixes: darken the
 * fill to ~#017a51 and keep white, or move the band to `scheme-deep-teal`
 * (white at 9.05:1). Either way the torn edge PNG needs re-toning, because its
 * bottom row has to equal the band colour exactly or a seam shows.
 *
 * The torn edge is `/images/footer-torn-edge.png`, pinned above the green
 * band's own straight top edge; both are the same green, so the straight edge
 * disappears and the ragged one is the boundary. It is two-tone on purpose —
 * there is a darker green shadow just under the tear.
 *
 * As of v3 it is no longer a re-toned stock preview. It is rendered straight
 * out of the Figma's own `9833802_27050 1` node at 2x and cropped to the
 * 1440-wide window the frame actually shows, ending on the first row that is
 * flat #01a66e with zero variance — so it meets the `scheme-jade` band below
 * it without a seam, and its greens are the design's rather than a mapping of
 * them. The underlying artwork is still a stock file whose name is a
 * stock-library ID, so it wants a licensing check before launch.
 */
/**
 * Three headed groups rather than the Figma's one heading over a two-column
 * spill of services. The frame stacks all seven service links in the middle of
 * the band under a single "Uplift Services", which reads as one undifferentiated
 * block; asked to reorganise it so it reads. The content is unchanged — same
 * thirteen destinations — regrouped by what the links actually are:
 *
 *   Company     the site's own pages
 *   Start here  the two audience doors, which are this site's whole IA
 *   Services    the five service pages
 *
 * "Company" and "Start here" are headings the Figma does not have. They are the
 * one addition here; without them column one is an unlabelled list sitting
 * beside a labelled one, which is the imbalance that made the original look
 * wrong.
 */
/**
 * The fourth column: "Get in touch". Added because the band was three link
 * columns and a lone LinkedIn icon out on the right, which read as three
 * columns plus a loose glyph rather than four deliberate ones — and because
 * "Start here" has only two links, so the left half of the band was two full
 * columns beside a short one with nothing to balance it.
 *
 * The content is not invented. Address, email and phone are the same three
 * facts `contact-us/contact-panel.jsx` already publishes, and the social mark
 * moves in under them rather than standing on its own.
 */
const FOOTER_GROUPS = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us" },
      { label: "How we work", href: "/how-we-work" },
      { label: "Career", href: "/careers" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    heading: "Start here",
    links: [
      { label: "For Individuals", href: "/for-individual" },
      { label: "For Businesses", href: "/for-business" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "AI Consultation", href: "/ai-consultation" },
      { label: "Advisory Services", href: "/advisory-services" },
      { label: "Systems & Technology", href: "/systems-technology" },
      { label: "Compliance Support", href: "/compliance-support" },
      { label: "Resource Assistance", href: "/resource-assistance" },
    ],
  },
];

export function Footer4() {
  return (
    <footer className="scheme-1 badge-alt">
      {/* Band one: white, and it carries nothing but the logo lockup, centred.
          In the Figma the logo and the CARF seal sit above the tear on the
          white page rather than inside the green — which is also the more
          honest place for the accreditation mark, since it reads against the
          page instead of against a brand-coloured field.

          The bottom padding is a calc, not a step on the spacing scale,
          because it has to clear the torn edge and the torn edge scales with
          the viewport. That asset is 2880x341 drawn at the full band width, so
          its rendered height is always width * 341/2880 = 11.84vw — 170px at
          1440, 227px at 1920. A fixed `pb-24` (96px) was less than the tear
          at every width above ~1100px, which is why the tear was riding up
          over the wordmark and clipping "PATH".

          The +2.5rem is the 40px the Figma leaves between the bottom of the
          lockup and the highest point of the tear. */}
      {/* Top padding trimmed from 40/48/56. The section above this band is a
          `cta-25` carrying the full section rhythm (`lg:pb-28`, 112px), and
          that landed on top of the band's own 56px for a 170px void between
          the CTA's last line and the wordmark at 1440 — QA filed it as
          excessive spacing above the logo lockup. This band is chrome rather
          than a section, so its own padding is the half that gives; the CTA's
          bottom rhythm is left alone. */}
      <div className="px-[5%] pt-4 pb-[calc(11.85vw+1.5rem)] md:pt-6 lg:pt-8">
        <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <a href="/" className="inline-flex items-center">
            <img
              src="/brand/uplift-path-logo.svg"
              alt="Uplift Path"
              className="h-15 w-auto"
            />
          </a>
          {/* The seal travels with the brand on every page. Third-party
              accreditation mark: native 1:1, colours untouched, never cropped.

              It goes to CARF's provider listing rather than to
              /compliance-support — our own page about the seal. The nav below
              carries the internal routes; this mark's job is proof.

              The "CARF accredited" text label that used to sit beside it is
              gone, per the Figma: the seal is legible on white at this size
              and the word is already on the homepage's trust strip. */}
          <a
            href={CARF_PROVIDER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center transition-opacity duration-200 ease-in-out hover:opacity-70"
            title="Verify our accreditation on carf.org"
          >
            <CarfSeal className="size-16" />
          </a>
        </div>
      </div>

      {/* Band two: the green. `scheme-jade` (#01a66e) as of the v3 Figma, which
          took this band off `scheme-accent` (#08d1a7) - see the note at the top
          of this file about why the text on it is still dark and not the
          Figma's white. */}
      <div className="relative px-[5%] pt-12 pb-8 md:pt-14 md:pb-10 scheme-jade">
        {/* `bottom-full` puts the strip immediately above this band, so its
            straight bottom butts against the band's straight top and its
            ragged top eats up into the white above. Decorative, and
            `pointer-events-none` so it cannot intercept a click on the logo
            lockup it overlaps. */}
        <img
          src="/images/footer-torn-edge.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full block w-full select-none"
        />
        <div className="relative container">
          {/* Left-aligned and spread across the container, not centred as one
              clump. The three link columns take equal share and the social
              mark sits out at the end, so the band reads left-to-right like
              the rest of the page instead of as a centred island. */}
          <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 text-left sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-12">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                {/* The heading is a plain <p>, not an <h*>: this band sits
                    below the page's real heading outline on every route, and
                    globals.css binds Playfair to h1-h6 — an <h4> here would
                    both serif these labels and inject a heading level into
                    every page's outline. */}
                <p className="text-small font-semibold">{group.heading}</p>
                <ul className="mt-4 flex flex-col gap-y-3 text-small">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* The fourth column. It is what balances the band: three lists of
                5 / 2 / 5 links left a short middle column and an empty right
                third, and the social mark had a whole track to itself for one
                glyph.

                LinkedIn is the only social account this site has a verified URL
                for. The Facebook mark beside it never had one — it pointed at
                "#" from the Relume export onward — and a dead icon is worse
                than no icon. It sits under the contact details now rather than
                standing as a column of its own. */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="text-small font-semibold">Get in touch</p>
              <ul className="mt-4 flex flex-col gap-y-3 text-small">
                <li>
                  <a
                    href="mailto:info@upliftpathinc.com"
                    className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                  >
                    info@upliftpathinc.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15132994553"
                    className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                  >
                    (513) 299-4553
                  </a>
                </li>
                {/* Linked to Google Maps, alongside the map on /contact-us.
                    An address in a "Get in touch" list is an action, and the
                    action people take with one is look it up — QA raised it
                    reading as inert text next to two live controls. Opens in a
                    new tab because it leaves the site; `address` so the
                    semantics match what it is. */}
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=20+E+Broad+St+Suite+225+Columbus+OH+43215"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                  >
                    <address className="not-italic">
                      20 E Broad St, Suite 225
                      <br />
                      Columbus, OH 43215
                    </address>
                  </a>
                </li>
              </ul>
              <a
                href="https://www.linkedin.com/in/uptech-support"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex transition-opacity duration-200 ease-in-out hover:opacity-70"
                aria-label="Uplift Path on LinkedIn"
              >
                <LinkedinLogo className="size-7 text-scheme-text" />
              </a>
            </div>
          </div>
          {/* Full width of the container now. The Figma runs this rule at
              454px, centred under a centred nav; with the columns left-aligned
              and spread, a short centred rule floats with nothing to align to.
              Full width is what separates the two bands. */}
          <div className="mt-10 h-px w-full bg-scheme-border/40" />
          {/* Copyright left, legal links right from md up; stacked and centred
              below that. The copyright is a sibling of the <ul> rather than
              its first <li> — it is not one of the legal links, and while it
              sat inside the list `justify-between` could only spread all five
              items evenly instead of splitting the two groups.

              (The export originally put a bare <p> and four bare <a> elements
              directly inside the <ul>, which is invalid HTML: the browser's
              parser rebuilt it, the server markup and client tree disagreed,
              and React threw a hydration error on every route because this is
              site chrome. Hence the <li> wrappers.) */}
          <div className="flex flex-col items-center gap-y-4 pt-5 text-small md:flex-row md:items-center md:justify-between md:gap-x-6 md:pt-6">
            {/* The brand name in the copyright line is the conventional
                home link, and QA asked for it. */}
            <p>
              ©{" "}
              <a href="/" className="hover:underline">
                2026 Uplift Path Inc.
              </a>{" "}
              All rights reserved.
            </p>
            <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-items-center gap-y-4 md:flex md:flex-row md:gap-x-6 md:gap-y-0">
              <li>
                <a href="/accessibility" className="underline">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="/terms-of-use" className="underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/grievance" className="underline">
                  Grievance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
