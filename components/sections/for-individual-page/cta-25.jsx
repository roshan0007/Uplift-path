"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import React from "react";

/**
 * Re-skinned to the 2026-09-08 Figma (node 10214-103875), which draws this
 * banner exactly as the homepage, About Us and How We Work v3 CTAs: white
 * rather than green, copy left-aligned, and the envelope illustration beside
 * it. It was `scheme-2` (Caribbean Green) with centred copy and no
 * illustration.
 *
 * The same illustration node backs all four frames, and it already ships as
 * `home-cta-envelope.png` at 924x888 -- exactly 2x the 462x444 this frame draws
 * it at -- so no new asset.
 *
 * `.btn-dark` makes the button black with a white label, which is what the
 * frame has (fill #000a08, label #ffffff). `.btn-dark-on-light` is required
 * alongside it and is not decoration: on the green scheme `.btn-dark` worked
 * alone because `scheme-accent` omits the nested default-button colour rule,
 * but `scheme-1` carries it and wins on specificity -- without this class the
 * label goes black on the black fill and disappears. See the utility's comment
 * in `globals.css`.
 *
 * One deliberate difference from the How We Work and About Us copies of this
 * section: the button opens the intake Application modal rather than linking to
 * /contact-us. That is this page's own wiring -- a general contact form is the
 * wrong destination for someone being matched to a Peer Coach -- and it is the
 * same action the hero and all three tabs offer.
 */
export function Cta25() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 btn-dark btn-dark-on-light badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="max-w-md">
            {/* Two lines in the frame, and the break carries meaning --
                "Ready to unlock" / "Your growth plan" -- so it is a <span>
                rather than left to the container width. */}
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Ready to unlock
              <span className="block">Your growth plan</span>
            </h2>
            <p className="text-medium">
              Book your discovery call for personalized, actionable strategies
              tailored to your goals.
            </p>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              <GetStartedButton label="Get Started" variant="default" />
            </div>
          </div>

          {/* Decorative -- the heading and the button carry the meaning, so no
              alt text. `justify-self-end` pins it right as the frame has it;
              on one column it centres instead. */}
          <img
            src="/images/home-cta-envelope.png"
            alt=""
            aria-hidden="true"
            className="mx-auto h-auto w-full max-w-[462px] select-none lg:mx-0 lg:justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
