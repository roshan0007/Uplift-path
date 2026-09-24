"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * The 2026-09-24 For Individual frame keeps the hero's type as it was --
 * tagline 16/24 w600, heading Playfair 400, body 18/27, button 140x44 -- and
 * replaces the three line-art vignettes with a collage of ten photographs:
 * a strip of seven under the button, plus a column of three flush to the
 * right edge that climbs up beside the copy.
 *
 * Every box below is the frame's own, in 1440-frame px, measured from the top
 * of the strip (frame y=417 below the navbar, 19px above the button's bottom
 * edge -- the button sits between columns, so they never touch). Each file was
 * delivered at exactly 2x its box with its corners already rounded, including
 * the square edge where a photo bleeds off the page, so none of them needs a
 * radius or `object-fit` here.
 *
 * The strip scales with the viewport: `x`/`w` are a share of 1440, `y`/`h` a
 * share of the strip's 298px height, and the strip keeps that 1440:298 aspect.
 * The right column's top photo runs 319px (scaled) above the strip, so above
 * 1440 the section's top padding grows by the same amount -- `22.153vw - 207px`
 * is 7rem at 1440 -- and that photo stays 98px under the navbar at any width
 * rather than sliding up under it.
 *
 * Decorative, so `aria-hidden` and no alt text -- the heading and body carry
 * the meaning. `lg:` only, as the vignettes were: at tablet and below the
 * strip would shrink to thumbnails and the right column would sit on the copy.
 */
const PHOTOS = [
  { src: "01-resting", x: 0, y: 125, w: 169, h: 173 },
  { src: "02-couple", x: 185, y: 56, w: 136, h: 139 },
  { src: "03-desk", x: 185, y: 210, w: 136, h: 88 },
  { src: "04-sofa", x: 336, y: 0, w: 136, h: 139 },
  { src: "05-headache", x: 332, y: 159, w: 136, h: 139 },
  { src: "06-embrace", x: 490, y: 56, w: 231, h: 242 },
  { src: "07-hands", x: 743, y: 107, w: 465, h: 191 },
  { src: "08-window", x: 1232, y: -319, w: 208, h: 271 },
  { src: "09-knees", x: 1232, y: -28, w: 208, h: 205 },
  { src: "10-phone", x: 1232, y: 195, w: 208, h: 103 },
];

export function Layout134() {
  // `lg:pb-0`: the strip is the bottom of the section, and the frame starts
  // the next heading straight under it.
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:pt-[max(7rem,calc(22.153vw-207px))] lg:pb-0 scheme-1 badge-alt">
      {/* The right column starts at 85.6% of the width, so between 992 and
          ~1150 the 48rem measure would run the paragraph under its top photo.
          `71vw - 48px` keeps the copy clear of it and meets 48rem at 1150. */}
      <div className="relative container max-w-lg text-center lg:max-w-[min(48rem,calc(71vw-48px))]">
        <p className="mb-3 font-semibold md:mb-4">Ohio Residents:</p>
        {/* The frame carries a literal newline in this string --
            "Individualized Support / for Ohio Adults" -- and left to the
            container the line falls after "Ohio" instead, orphaning "Adults".
            Same treatment as the CTA heading. */}
        {/* `text-h1`, not `text-h2`. Every section heading on this route is
            `text-h2` -- 40px at 375, 52px at 1440 -- and so was the page
            title, which made the h1 the joint-largest heading rather than the
            largest. Weight cannot recover the rank here: `--font-weight-bold`
            is 400 on purpose, so size is the only signal available. One token
            step up is 44px / 72px, which clears every h2 at both widths. The
            lg step is 20px over the frame's 52, and that is the deliberate
            trade -- the frame giving the h1 and the h2 the same size is
            exactly the finding. Same resolution as the homepage h1.

    `text-balance` is what makes 44px survive a 338px measure: these
    titles run to three and four lines on a phone at the new size, and
    without it the last line orphans a single word. It is inert on the
    one-line titles and at lg, so it only acts where the wrap is real. */}
        <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">
          Individualized Support
          <span className="block">for Ohio Adults</span>
        </h1>
        <p className="text-medium">
          Get no-cost Personalized Supportive Services from a dedicated Uplift
          Peer Coach to help you move toward your goals. Available for adults
          18+ with active Ohio Medicaid.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          {/* Opens the intake Application modal (step 1). It used to link to
              /contact-us, which dropped people into the general contact form
              rather than the Peer Coach matching flow. */}
          <GetStartedButton label="Get Started" />
        </div>
      </div>

      {/* Full-bleed: -5.5556% of the 90%-wide content box cancels the
          section's 5% gutter on each side. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mx-[5.5556%] hidden aspect-[1440/298] select-none lg:-mt-[19px] lg:block"
      >
        {PHOTOS.map(({ src, x, y, w, h }) => (
          <img
            key={src}
            src={`/images/for-individual-hero-${src}.png`}
            alt=""
            className="absolute"
            style={{
              left: `${(x / 1440) * 100}%`,
              top: `${(y / 298) * 100}%`,
              width: `${(w / 1440) * 100}%`,
              height: `${(h / 298) * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
