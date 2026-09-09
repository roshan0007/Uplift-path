"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Compliance Support`, 1440x4527).
 *
 * The type is untouched -- tagline 16/24 w600, heading 52/62.4 Playfair 400,
 * body 18/27 -- and the frame adds two decorative line-art vignettes: an open
 * letter on the left, a globe on the right. Both cut from the 2x reference
 * render (the Figma API is paywalled on this account; see the import record)
 * and un-composited off white with a min-channel alpha key. The letter shares
 * rows with the body copy and the globe shares rows with the heading, so both
 * boxes were measured over only the y bands the neighbouring text leaves free.
 *
 * Promoted from <h2> to <h1>. The route's only <h1> was `layout-16`'s "Where
 * are you right now?", which is not the page title.
 *
 * **The CARF Gold Seal that stood above the tagline is gone.** The frame draws
 * nothing between the navbar (y=72) and the tagline (ink at y=197) -- the two
 * vignettes take that visual weight instead. No claim is lost: the body still
 * says we hold the seal, and the seal itself still renders in the footer
 * lockup on all 20 routes and in the homepage trust strip. Flagged in the
 * import record rather than treated as an oversight.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72):
          letter at 84,299.5 237.5x222; globe at 1167,153 156.5x153. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/compliance-hero-letter.png"
          alt=""
          className="absolute top-[299.5px] left-[84px] h-[222px] w-[237.5px]"
        />
        <img
          src="/images/compliance-hero-globe.png"
          alt=""
          className="absolute top-[153px] right-[116.5px] h-[153px] w-[156.5px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Compliance Support</p>
        <h1 className="mb-5 text-h2 font-bold md:mb-6">
          Be ready before the audit, not because of it
        </h1>
        <p className="text-medium">
          We hold the CARF Gold Seal ourselves. We have been through this as an
          organisation, not only advised on it.
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
