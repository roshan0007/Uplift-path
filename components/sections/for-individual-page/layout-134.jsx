"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * The 2026-09-24 For Individual frame keeps the hero's type as it was --
 * tagline 16/24 w600, heading Playfair 400, body 18/27, button 140x44 -- and
 * replaces the three line-art vignettes with a collage of ten photographs:
 * a strip of seven under the button, plus a column of three at the right
 * end that climbs up beside the copy.
 *
 * Every box below is the frame's own, in 1440-frame px, measured from the top
 * of the strip (frame y=417 below the navbar, 19px above the button's bottom
 * edge -- the button sits between columns, so they never touch; the overlap
 * is built as 20px, the nearest step on the spacing scale). Each file was
 * delivered at exactly 2x its box with its corners already rounded, so none
 * of them needs a radius or `object-fit` here.
 *
 * Two departures from the frame, both from review in the browser:
 *
 * 1. **The collage sits inside the page gutter, not flush to the edges.** The
 *    frame bleeds the left photo and the right column off the page; on a real
 *    screen that read as cut off. The strip now stops 2.5% short of each edge
 *    -- half the section's 5% gutter, which read as too much margin -- and the
 *    four photos that bled had their square side rounded to match their
 *    others.
 * 2. **The whole collage fits on the first screen.** The strip keeps the
 *    frame's 1440:298 shape (`x`/`w` a share of 1440, `y`/`h` a share of 298)
 *    but its width is also capped by the viewport *height*, so the photos plus
 *    48px of white under them land above the fold rather than half under it.
 *    `483.2vh - 2643px` is that cap: the copy above the strip is ~363px from
 *    the section top at lg, so the strip may be `100vh - 72 (nav) - 64 (pt) -
 *    363 - 48` tall, times 1440/298 for the width. It never goes below 52.5rem,
 *    under which the paragraph would reach the right column, and never above
 *    108rem, past which the right column would climb into the navbar. When
 *    the cap binds, the strip is centred and the side margins grow.
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
  // `lg:pt-16`, not 7rem, is what leaves room for the collage on the first
  // screen. `lg:pb-16` plus the next section's `lg:pt-12` puts 112px -- the
  // standard section rhythm -- between the photos and the next heading.
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:pt-16 lg:pb-16 scheme-1 badge-alt">
      <div className="relative container max-w-lg text-center">
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
        {/* `max-w-md` on the paragraph alone, not the container: at 48rem
            the lines ran ~84 characters, and at 992 they reached under the
            right column's top photo. Narrowing the container instead also
            split the h1 onto three lines up to ~1087px. `text-pretty` stops
            the phone wrap ending on a single word. */}
        <p className="mx-auto max-w-md text-pretty text-medium">
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

      {/* -2.7778% of the 90%-wide content box is 2.5% of the page: the strip
          reaches halfway into the gutter on each side. */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mx-[2.7778%] hidden select-none lg:-mt-5 lg:block"
      >
        <div className="relative mx-auto aspect-[1440/298] w-full max-w-[min(108rem,max(52.5rem,calc(483.2vh-2643px)))]">
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
      </div>
    </section>
  );
}
