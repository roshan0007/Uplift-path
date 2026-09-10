"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Career`, 1440x6198).
 *
 * **This hero is not the centred `layout-134` the other nine routes carry.**
 * The frame sets the tagline, heading, body and button left-aligned in a
 * left-hand column and puts a single large line-art vignette -- a hand holding
 * a flash camera -- in the right-hand one, 384.5x363.5 in the frame. So this is
 * a two-column hero rather than the centred column with small decorative
 * vignettes that Compliance Support, Resource Assistance and the six earlier v3
 * pages use. The section keeps its `layout-134` name because the route's page
 * map does.
 *
 * Because the vignette is a column of the grid rather than absolutely
 * positioned decoration, it stacks under the copy below `md` instead of being
 * hidden, which is what the frame's own single-column behaviour implies.
 *
 * Promoted from <h2> to <h1>. **`/career` had no `<h1>` at all** -- the only
 * route in the batch where the outline was missing rather than misplaced.
 *
 * The camera was cut from the 2x reference render (the Figma API is paywalled
 * on this account; see the import record) and un-composited off white with a
 * min-channel alpha key.
 */
export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Careers</p>
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
              Thrive and grow along your unique uplift path.
            </h1>
            <p className="text-medium">
              Join a team designing strategies that create measurable, lasting
              business results.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 md:mt-8">
              <Button asChild title="Explore Opportunities" variant="secondary">
                <a
                  href="https://openings.upliftpathwellness.com/jobs/Careers"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore Opportunities
                </a>
              </Button>
            </div>
          </div>

          {/* Decorative -- the heading and the button carry the meaning.
              384.5px is the width the frame draws it at. */}
          <img
            src="/images/career-hero-camera.png"
            alt=""
            aria-hidden="true"
            className="mx-auto w-full max-w-[384.5px] select-none"
          />
        </div>
      </div>
    </section>
  );
}
