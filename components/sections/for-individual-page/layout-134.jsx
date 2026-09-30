"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * The 2026-09-30 For Individual frame (node 10634:7946) keeps the hero's type
 * -- tagline 16/24 w600, heading Playfair, body 18/27, button 140x44 -- and
 * redraws the collage below it: eight photographs plus four flat green shapes
 * (a rounded square, a pill under the embrace, a circle, and a block closing
 * the right column), all `#06a785`, which is `--color-caribbean-green-dark`.
 * It also sets two emphases in the copy: the first heading line in Playfair
 * ExtraBold, and "no-cost" / "Available for adults 18+" in the body.
 *
 * Every box below is the frame's own, in 1440-frame px, measured from the top
 * of the strip (frame y=598, the green square -- the highest item outside the
 * right column). The right column climbs above that, beside the copy, so its
 * first photo has a negative `y`. The strip starts 93px under the button in
 * the frame; it is built as 64px -- see 2 below. Each
 * file was delivered at exactly 2x its box with its corners already rounded,
 * so none of them needs a radius or `object-fit` here. The circle was not
 * delivered as a file, so it is the one shape drawn in CSS.
 *
 * Two departures from the frame, both kept from the 2026-09-24 review:
 *
 * 1. **The collage sits inside the page gutter, not flush to the edges.** The
 *    frame bleeds the left photo and the right column off the page; on a real
 *    screen that read as cut off. The strip stops 2.5% short of each edge, and
 *    the four pieces that bled had their square side rounded to match their
 *    others (done in the files, not here).
 * 2. **The whole collage fits on the first screen.** The strip keeps the
 *    frame's 1440:383 shape (`x`/`w` a share of 1440, `y`/`h` a share of 383)
 *    but its width is also capped by the viewport *height*, so the photos
 *    land above the fold. This collage is 85px taller than the 2026-09-24 one,
 *    so to keep it from shrinking to two-thirds of a 1440x900 screen the gap
 *    above it is 64px rather than the frame's 93, and the 48px of white the
 *    old cap left under the photos is gone. `375.98vh - 2263.4px` is that
 *    cap: the copy above the strip is ~402px from the section top at lg, so
 *    the strip may be `100vh - 72 (nav) - 64 (pt) - 402 - 64 (gap)` tall,
 *    times 1440/383 for the width. It never goes below 60rem, under
 *    which the right column would reach the paragraph, and never above 108rem,
 *    past which that column would climb into the navbar. When the cap binds,
 *    the strip is centred and the side margins grow.
 *
 * Decorative, so `aria-hidden` and no alt text -- the heading and body carry
 * the meaning. `lg:` only: at tablet and below the strip would shrink to
 * thumbnails and the right column would sit on the copy.
 */
const PIECES = [
  { src: "01-counselling", x: 0, y: 154, w: 169, h: 173 },
  { src: "02-green-square", x: 183, y: 0, w: 136, h: 139 },
  { src: "03-desk", x: 183, y: 154, w: 136, h: 88 },
  { circle: true, x: 193, y: 268, w: 115, h: 115 },
  { src: "04-thinking", x: 340, y: 70, w: 136, h: 139 },
  { src: "05-headache", x: 336, y: 229, w: 136, h: 139 },
  { src: "06-embrace", x: 494, y: 26, w: 231, h: 254 },
  { src: "07-green-pill", x: 492, y: 298, w: 233, h: 47 },
  { src: "08-hands", x: 743, y: 147, w: 465, h: 191 },
  { src: "09-pillow", x: 1232, y: -264, w: 208, h: 231 },
  { src: "10-knees", x: 1232, y: -13, w: 208, h: 205 },
  { src: "11-green-block", x: 1232, y: 210, w: 208, h: 173 },
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
        {/* The first line is Playfair ExtraBold (800) in the 2026-09-30 frame.
            800 is not self-hosted -- 700 is the heaviest Playfair face in
            globals.css -- so it is set at 700 rather than letting the browser
            synthesise a bolder one. `font-[700]`, not `font-bold`, because
            `--font-weight-bold` is 400 on purpose. */}
        <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">
          <span className="font-[700]">Individualized Support</span>{" "}
          <span className="block">for Ohio Adults</span>
        </h1>
        {/* `max-w-md` on the paragraph alone, not the container: at 48rem
            the lines ran ~84 characters, and at 992 they reached under the
            right column's top photo. Narrowing the container instead also
            split the h1 onto three lines up to ~1087px. `text-pretty` stops
            the phone wrap ending on a single word. */}
        <p className="mx-auto max-w-md text-pretty text-medium">
          {/* Emphases are the frame's: "Get no-cost" Bold, "Available for
              adults 18+" SemiBold. */}
          <strong className="font-[700]">Get no-cost</strong> Personalized
          Supportive Services from a dedicated Uplift Peer Coach to help you
          move toward your goals.{" "}
          <strong className="font-semibold">Available for adults 18+</strong>{" "}
          with active Ohio Medicaid.
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
        className="pointer-events-none -mx-[2.7778%] hidden select-none lg:mt-16 lg:block"
      >
        <div className="relative mx-auto aspect-[1440/383] w-full max-w-[min(108rem,max(60rem,calc(375.98vh-2263.4px)))]">
          {PIECES.map(({ src, circle, x, y, w, h }) => {
            const style = {
              left: `${(x / 1440) * 100}%`,
              top: `${(y / 383) * 100}%`,
              width: `${(w / 1440) * 100}%`,
              height: `${(h / 383) * 100}%`,
            };
            return circle ? (
              <div
                key="circle"
                className="absolute rounded-full bg-caribbean-green-dark"
                style={style}
              />
            ) : (
              <img
                key={src}
                src={`/images/for-individual-hero-${src}.png`}
                alt=""
                className="absolute"
                style={style}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
