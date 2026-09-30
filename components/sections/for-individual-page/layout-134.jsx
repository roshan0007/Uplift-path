"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * Built from the 2026-09-30 For Individual frame (node 10634:7946), which
 * keeps the hero's type -- tagline 16/24 w600, heading Playfair, body 18/27,
 * button 140x44 -- and sets two emphases in the copy: the first heading line
 * in Playfair ExtraBold, and "no-cost" / "Available for adults 18+" in the
 * body.
 *
 * The collage is the frame's eight photographs, re-packed on review
 * (2026-10-01). The frame mixed them with four flat green shapes (a square, a
 * pill, a circle and a block) and left gaps between the pieces; those shapes
 * are gone and the photos now fill the strip edge to edge in a tight grid:
 *
 * - a column at each end, two photos tall, that climbs up beside the copy --
 *   the frame's right column, mirrored on the left so neither side of the
 *   page is empty;
 * - between them, the embrace full height, then the hands across the top
 *   and two landscapes under it.
 *
 * The boxes are in 1440-wide px measured from the top of the strip, with a
 * 16px gap everywhere; the columns start above it, so they have a negative
 * `y`. Each file is cut from the full-size original at exactly 2x its box,
 * so no `object-fit` is needed. The corners are the frame's 25px, which the
 * old delivered PNGs had baked in; it is in `cqw` here -- 25/1440 of the
 * strip's width -- so it scales with the photos.
 *
 * The collage sits 2.5% short of each page edge (the frame bleeds it off the
 * page; on a real screen that read as cut off). It is a share of the page
 * width at every size, up to 108rem. The 2026-09-24 cap that shrank it to
 * fit the first screen is gone: on a 1440x900 screen that left it two-thirds
 * wide with wide white margins, and filling the width was the call.
 *
 * Decorative, so `aria-hidden` and no alt text -- the heading and body carry
 * the meaning. `lg:` only: at tablet and below the strip would shrink to
 * thumbnails and the end columns would sit on the copy.
 */
const PIECES = [
  { src: "01-pillow", x: 0, y: -214, w: 208, h: 290 },
  { src: "02-thinking", x: 0, y: 92, w: 208, h: 291 },
  { src: "03-embrace", x: 224, y: 0, w: 260, h: 383 },
  { src: "04-hands", x: 500, y: 0, w: 716, h: 200 },
  { src: "05-counselling", x: 500, y: 216, w: 350, h: 167 },
  { src: "06-desk", x: 866, y: 216, w: 350, h: 167 },
  { src: "07-knees", x: 1232, y: -214, w: 208, h: 290 },
  { src: "08-headache", x: 1232, y: 92, w: 208, h: 291 },
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
        <div className="@container relative mx-auto aspect-[1440/383] w-full max-w-[108rem]">
          {PIECES.map(({ src, x, y, w, h }) => (
            <img
              key={src}
              src={`/images/for-individual-hero-${src}.jpg`}
              alt=""
              className="absolute rounded-[1.7361cqw]"
              style={{
                left: `${(x / 1440) * 100}%`,
                top: `${(y / 383) * 100}%`,
                width: `${(w / 1440) * 100}%`,
                height: `${(h / 383) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
