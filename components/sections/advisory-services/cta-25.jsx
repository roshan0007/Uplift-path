"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Re-skinned to the 2026-09-09 Figma (frame `Advisory Services`), which draws
 * this banner exactly as the six v3 frames already built do: white rather than
 * green, copy left-aligned, and the envelope illustration beside it. It was
 * `scheme-2` (Caribbean Green) with centred copy and no illustration. Seventh
 * copy of a decision already taken; `home-cta-envelope.png` is reused, so no
 * new asset.
 *
 * `.btn-dark` makes the button black with a white label, which is what the
 * frame has. `.btn-dark-on-light` is required alongside it: `scheme-1` carries
 * the nested default-button colour rule that `scheme-accent` omits, and it
 * out-specifies `.btn-dark` alone, which would put a black label on the black
 * fill. See the utility's comment in `globals.css`.
 *
 * The button keeps `/contact-us` -- the intake Application modal drives
 * individual Peer Coach matching, not an organisation booking a discovery call.
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
              <Button asChild title="Get Started">
                <a href="/contact-us">Get Started</a>
              </Button>
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
