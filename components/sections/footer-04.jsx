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
 * TEXT COLOUR IS A DELIBERATE DEPARTURE FROM THE FIGMA, and the only one left
 * in this footer. The Figma sets white text on the green. Measured against
 * every green in the brand, white fails WCAG AA for body text at this size:
 *
 *     caribbean-green        #08d1a7   1.96:1
 *     caribbean-green-dark   #06a785   3.06:1
 *     viking-dark            #41b19a   2.63:1
 *     the Figma's own green  ~#1db35a  2.75:1
 *
 * CLAUDE.md names dark-on-green as the only approved pairing, and the brief
 * was to follow the brand guidelines where the Figma's colours disagree. So
 * the fill is the brand green and the text is the dark neutral, at 10.21:1.
 *
 * If white text is wanted, the fix is the fill and not the label: swap
 * `scheme-accent` for `scheme-deep-teal` on the green band below
 * (caribbean-green-darker #035342), which carries white at 9.05:1 and is a
 * real brand scheme — DESIGN.md's scheme 7. The torn edge would want
 * re-toning to match. Never pair white with `scheme-accent`.
 *
 * The torn edge is `/images/footer-torn-edge.png`, pinned above the green
 * band's own straight top edge; both are the same green, so the straight edge
 * disappears and the ragged one is the boundary. It is two-tone on purpose —
 * the Figma has a darker green shadow just under the tear, so the source's
 * two greens are mapped to `caribbean-green` and `caribbean-green-dark`
 * rather than flattened to one.
 *
 * That source file was a stock *preview*: "Torn Paper" in large white serif
 * over a Lorem ipsum paragraph, baked in from y≈260 down. Only the top 250px
 * were clean, so it is cropped to those and re-toned. The filename is a
 * stock-library ID, so this asset wants a licensing check before launch — a
 * properly licensed clean download drops in at the same path and needs
 * neither the crop nor the re-tone.
 */
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
          the viewport. That asset is 2880x250 drawn at the full band width, so
          its rendered height is always width * 250/2880 = 8.68vw — 124px at
          1440, 167px at 1920. A fixed `pb-24` (96px) was less than the tear
          at every width above ~1100px, which is why the tear was riding up
          over the wordmark and clipping "PATH".

          The +2.5rem is the 40px the Figma leaves between the bottom of the
          lockup and the highest point of the tear. */}
      <div className="px-[5%] pt-12 pb-[calc(8.7vw+2.5rem)] md:pt-18 lg:pt-20">
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

      {/* Band two: the green. `scheme-accent` — see the note at the top of this
          file about why the text on it is dark and not the Figma's white. */}
      <div className="relative px-[5%] pt-14 pb-10 md:pt-16 md:pb-12 scheme-accent">
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
          {/* The nav is centred on the band and the LinkedIn mark sits out at
              the right, which is how the Figma has it — so the mark is taken
              out of the flow rather than given a grid track. A three-track
              grid would push the nav off the true centreline the moment one
              outer column outgrew the other, which is the bug the previous
              `1fr auto 1fr` was written to solve; absolute positioning
              sidesteps it entirely.

              It reflows into the normal flow below md, where there is no room
              beside the nav for it. */}
          <div className="relative flex flex-col items-center gap-y-8 md:block">
            <ul className="grid grid-flow-row grid-cols-1 items-center justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center">
              <li className="font-semibold">
                <a href="/">Home</a>
              </li>
              <li className="font-semibold">
                <a href="/for-business-page">Services</a>
              </li>
              <li className="font-semibold">
                <a href="/about-us">About</a>
              </li>
              <li className="font-semibold">
                <a href="/contact-us">Contact</a>
              </li>
              <li className="font-semibold">
                <a href="/contact-us">Get started</a>
              </li>
            </ul>
            {/* LinkedIn is the only social account this site has a verified URL
                for. The Facebook mark beside it never had one — it pointed at
                "#" from the Relume export onward — and a dead icon is worse
                than no icon. */}
            <a
              href="https://www.linkedin.com/in/uptech-support"
              target="_blank"
              rel="noreferrer"
              className="inline-flex transition-opacity duration-200 ease-in-out hover:opacity-70 md:absolute md:top-1/2 md:right-12 md:-translate-y-1/2"
              aria-label="Uplift Path on LinkedIn"
            >
              <LinkedinLogo className="size-8 text-scheme-text" />
            </a>
          </div>
          {/* Narrow and centred, roughly the width of the nav above it — the
              Figma does not run this rule the full width of the band.

              454px is measured off the export. Written as an arbitrary value
              rather than `max-w-md` on purpose: this design system remaps the
              max-w scale onto its own container tokens, so `max-w-md` here is
              35rem/560px, not Tailwind's stock 448px. */}
          <div className="mx-auto mt-8 h-px w-full max-w-[454px] bg-scheme-border" />
          {/* The export had `flex-col-reverse items-start` here against
              `md:justify-center`, so the bottom bar was left-aligned on mobile
              and centred from 768px up, and the reversal put the copyright
              line above the legal links on mobile only. Centred at every width
              now, in one reading order. */}
          <div className="flex flex-col items-center pt-6 text-small md:flex-row md:justify-center md:gap-x-6 md:pt-8">
          {/* The export puts a <p> and four bare <a> elements directly inside this
              <ul>, which is invalid HTML. The browser's parser rebuilds it, so the
              server markup and the client tree disagree and React throws a
              hydration error on every route (the navbar and footer are site
              chrome). Each item is wrapped in an <li>; Tailwind's preflight
              already strips list styling, so nothing about the layout changes. */}
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-items-center gap-y-4 text-small md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li>
              <p>© 2026 Uplift Path Inc. All rights reserved.</p>
            </li>
            <li>
              <a href="/accessibility" className="underline">
                Accessibility
              </a>
            </li>
            <li>
              <a href="/terms-of-use" className="underline">
                Terms of service
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
