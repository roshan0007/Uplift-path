"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * The 2026-09-08 Figma (node 10214-103875) leaves the hero's type untouched --
 * tagline 16/24 w600, heading 52/62.4 Playfair 400 at -0.52, body 18/27, button
 * 140x44 -- and adds three decorative line-art vignettes around it: a heart
 * being handed over on the left, a flower on the right, and a wrapped gift
 * below the button.
 *
 * All three are crops of one 4096x2731 sheet (`18880313_v911-a-01-b`), placed
 * in the frame with non-uniform STRETCH scaling. Rather than ship the sheet and
 * fight `object-position`, each crop was cut at its own `imageTransform` matrix
 * and exported at exactly 2x the box the frame draws it in, so each file is
 * already the right shape and needs no fitting.
 *
 * They are decorative, so `aria-hidden` and no alt text -- the heading and the
 * body carry every bit of the meaning. `lg:` only: the frame is a 1440 desktop
 * frame, and at tablet and below the vignettes would sit under the copy rather
 * than beside it. The section clips them so the right-hand pair, which the
 * frame runs 17px past the page edge, creates no horizontal scroll.
 */
export function Layout134() {
  // `lg:pb-52` rather than the standard `lg:py-28`: the gift vignette runs to
  // y=655 in the frame, 150px below where the button's own bottom padding would
  // end the section, and `overflow-hidden` would otherwise slice it. The extra
  // depth is the frame's own -- it leaves the hero 735px tall.
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:pt-28 lg:pb-52 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72, the
          bottom of the navbar): heart at 0,0 358x333; flower at 1031,0
          426x333, i.e. 17px past the 1440 edge; gift at 888,411 421x172. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/for-individual-hero-heart.png"
          alt=""
          className="absolute top-0 left-0 h-[333px] w-[358px]"
        />
        <img
          src="/images/for-individual-hero-flower.png"
          alt=""
          className="absolute top-0 -right-[17px] h-[333px] w-[426px]"
        />
        <img
          src="/images/for-individual-hero-gift.png"
          alt=""
          className="absolute top-[411px] right-[131px] h-[172px] w-[421px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Ohio Residents:</p>
        {/* The frame carries a literal newline in this string --
            "Individualized Support / for Ohio Adults" -- and left to the
            container the line falls after "Ohio" instead, orphaning "Adults".
            Same treatment as the CTA heading. */}
        <h1 className="mb-5 text-h2 font-bold md:mb-6">
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
    </section>
  );
}
