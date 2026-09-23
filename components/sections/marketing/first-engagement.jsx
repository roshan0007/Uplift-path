"use client";

import React from "react";

/**
 * The 2026-09-18 `Marketing Page` design: heading and one paragraph on the
 * left, the tangled-figure illustration on the right.
 *
 * **One sentence of the frame's copy is deliberately not built.** It reads
 * "[length and fee — CLIENT TO CONFIRM]", which is an instruction to the
 * client inside the draft, not page copy — and this site commits to no price
 * anywhere. The surrounding sentence ships; the bracket does not. Same call as
 * advisory-services/layout-374, which dropped its frame's "Free, with no
 * obligation." pending confirmation. Fill it in once the figure is settled.
 *
 * `scheme-mint` — second of the three breaks in this route's white run. See
 * the note in `why-not-an-agency`.
 */
export function FirstEngagement() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-20">
          <div>
            {/* The break after "first" is the frame's and holds at every width
                the heading fits on two lines, so it is left to the measure
                rather than forced with a <span> — unlike cta-25's, this one
                carries no meaning. */}
            <h2 className="mb-5 text-balance text-h2 font-bold md:mb-6">
              What the First Engagement Looks Like
            </h2>
            <p className="text-medium">
              A marketing review. We look at your website, your search presence,
              your referral sources and everything you currently publish, then
              deliver a written report: where your inquiries come from now, the
              three fixes with the largest effect, and anything that carries
              compliance risk. No obligation to continue.
            </p>
          </div>

          {/* Decorative: the heading and the paragraph carry the meaning. */}
          <div className="flex justify-center">
            <img
              src="/images/marketing-first-engagement.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-[400px] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
