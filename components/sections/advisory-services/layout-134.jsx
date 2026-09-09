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
 * Promoted from <h2> to <h1> -- the route had no <h1> at all.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72): planes
          at 101,175.5 254x308; chart at 1106,347 212.5x180. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/advisory-hero-planes.png"
          alt=""
          className="absolute top-[175.5px] left-[101px] h-[308px] w-[254px]"
        />
        <img
          src="/images/advisory-hero-chart.png"
          alt=""
          className="absolute top-[347px] right-[121.5px] h-[180px] w-[212.5px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Advisory Services</p>
        <h1 className="mb-5 text-h2 font-bold md:mb-6">
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
