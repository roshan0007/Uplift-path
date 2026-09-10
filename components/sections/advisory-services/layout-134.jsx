"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The 2026-09-09 Figma (frame `Advisory Services`) leaves the type untouched --
 * tagline 16/24 w600, heading 52/62.4 Playfair 400, body 18/27 -- and adds two
 * decorative line-art vignettes: paper planes on the left, a framed rising
 * chart on the right. Both cut from the 2x reference render (the Figma API is
 * paywalled; see the import record) and un-composited off white with a
 * min-channel alpha key, round-tripping to 0.06 and 0.05 of a channel step.
 *
 * Isolating their bounding boxes needed care: at several y values the vignette
 * and the centred copy share a row, so a naive bounding box swallowed the text.
 * They were measured over the four horizontal bands the hero leaves text-free.
 *
 * It swallowed some anyway: `advisory-hero-planes.png` shipped with the left
 * stem of the heading's "S" and the "M" of "Most organizations" baked into its
 * right edge, plus a stray speck of the body copy. Because the vignette is
 * anchored 32px clear of the text column, those glyphs rendered as a second,
 * detached "S" and "M" floating to the left of the real ones. Erased from the
 * PNG on 2026-09-10 -- everything at x>=430 above y=330, which is empty of
 * plane geometry (the lower plane's tip only enters that band at y=404), plus
 * the speck. The two planes themselves are untouched, so the positioning
 * below still holds.
 *
 * Promoted from <h2> to <h1> -- the route had no <h1> at all.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72): planes
          at 101,175.5 254x308; chart at 1106,347 212.5x180.

          **Anchored off the centre line, not off the viewport edges.** The
          frame's own x offsets put the planes at 101-355 and the chart at
          1091-1304 against a text column running 329-1097 — so at the design
          width both vignettes already overlapped the column, and the planes
          crossed 26px into the body copy's own box. "Most organizations stall
          not from a lack of ideas" is a full-measure line, so they collided
          visibly. Every width below 1440 made it worse, because the column is
          centred and slides outward into art pinned to the edges.

          `calc(50% + 416px)` is the column's own half-measure (384px, from
          `max-w-lg`) plus a 32px gutter, so each vignette starts exactly
          32px clear of the text at every width and can never reach it. At
          1440 that lands the planes at 50-304 and the chart at 1136-1348.5,
          within 1px of the frame's intent minus the collision.

          `min-[1280px]:` rather than `lg:`: below 1280 the guaranteed gutter
          pushes the planes far enough left that most of the drawing is off
          canvas, and half a paper plane is worse than none.

          Written as an arbitrary min-width and not as a breakpoint variant
          because **this theme has no `xl`.** `globals.css` sets
          `--breakpoint-*: initial` and then declares exactly three - sm 480,
          md 768, lg 992 - so `xl:block` compiles to a class that no media
          query ever matches and the element stays `display: none` at every
          width. Worth knowing before reaching for `xl:` anywhere else. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none min-[1280px]:block"
      >
        <img
          src="/images/advisory-hero-planes.png"
          alt=""
          className="absolute top-[175.5px] right-[calc(50%+416px)] h-[308px] w-[254px]"
        />
        <img
          src="/images/advisory-hero-chart.png"
          alt=""
          className="absolute top-[347px] left-[calc(50%+416px)] h-[180px] w-[212.5px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Advisory Services</p>
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
          Strategy that is built with you, not handed to you
        </h1>
        <p className="text-medium">
          Most organizations stall not from a lack of ideas, but from a lack of
          alignment. We turn intent into a clear, written path your team can
          follow.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Book a discovery call" variant="secondary">
            <a href="/contact-us">Book a discovery call</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
