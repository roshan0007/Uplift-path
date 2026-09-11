"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Resource Assistance`, 1440x3793).
 *
 * The type is untouched -- tagline 16/24 w600, heading 52/62.4 Playfair 400,
 * body 18/27 -- and the frame adds two decorative line-art vignettes: a speech
 * bubble on the left, a three-node network on the right. Both cut from the 2x
 * reference render (the Figma API is paywalled on this account; see the import
 * record) and un-composited off white with a min-channel alpha key. The bubble
 * shares rows with the body copy and the network shares rows with the tagline
 * and heading, so both boxes were measured over only the y bands the
 * neighbouring text leaves free.
 *
 * Promoted from <h2> to <h1>. The route's only <h1> was `layout-491`'s "What do
 * you need?", which is not the page title.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72):
          bubble at 140.5,324.5 147.5x156.5; network at 1176,106 180x141. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/resource-hero-bubble.png"
          alt=""
          className="absolute top-[324.5px] left-[140.5px] h-[156.5px] w-[147.5px]"
        />
        <img
          src="/images/resource-hero-network.png"
          alt=""
          className="absolute top-[106px] right-[84px] h-[141px] w-[180px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Resource Assistance</p>
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
          You should not have to fund it, or build it, alone
        </h1>
        <p className="text-medium">
          The funding is available, the right staff are in place, and strong
          partners are ready to collaborate. Our proven expertise connects you
          directly to these vital resources.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Book a Discovery Call" variant="secondary">
            <a href="/contact-us">Book a Discovery Call</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
