"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The 2026-09-08 Figma (node 10214-104878) leaves the hero's type untouched --
 * tagline 16/24 w600, heading 52/62.4 Playfair 400, body 18/27 -- and adds two
 * decorative line-art vignettes either side of the copy: a target struck by
 * arrows on the left, a lit bulb on the right. Same treatment as the three on
 * `/for-individual-page`, which is this page's sibling frame.
 *
 * The Figma API's file-geometry and node-render endpoints are both paywalled on
 * this account (HTTP 429, `x-figma-rate-limit-type: low`, `Retry-After` ~3.8
 * days -- a quota, not a throttle), so unlike the previous four passes these
 * two could not be pulled from an `imageRef`. They are cut from the 2x
 * reference render instead, at exactly the box the frame draws them in, and
 * un-composited off the white page with a min-channel alpha key. That key
 * round-trips over white to a mean channel difference of 0.04, i.e. exactly.
 *
 * They are decorative, so `aria-hidden` and no alt text -- the heading and the
 * body carry every bit of the meaning. `lg:` only: the frame is a 1440 desktop
 * frame, and at tablet and below the vignettes would sit under the copy rather
 * than beside it.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72, the
          bottom of the navbar): target at 47.5,177 316x228; bulb at 1138.5,
          291.5 117x137.5, i.e. 184.5px in from the 1440 edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/for-business-hero-target.png"
          alt=""
          className="absolute top-[177px] left-[47.5px] h-[228px] w-[316px]"
        />
        <img
          src="/images/for-business-hero-bulb.png"
          alt=""
          className="absolute top-[291.5px] right-[184.5px] h-[137.5px] w-[117px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">
          Uplift Solutions · For Businesses
        </p>
        {/* The frame breaks this heading after "Services", and the break
            carries the phrasing, so it is a <span> rather than left to the
            container width. Promoted from <h2>: this route had no <h1> at all,
            the same gap the How We Work and For Individual passes found.
            The frame's own wording is "for Businesses Growth" -- a typo, and
            the kind the brief says to fix rather than reproduce. */}
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
          Consulting Services
          <span className="block">for Business Growth</span>
        </h1>
        <p className="text-medium">
          Expert guidance for founders and leaders. Transform challenges into
          opportunities with focused business consulting.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Get Started" variant="secondary">
            <a href="/contact-us">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
