"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Re-skinned to the 2026-09-09 Figma (frame `AI Consultancy`), which draws this
 * banner exactly as the five v3 frames already built do: white rather than
 * green, copy left-aligned, and the envelope illustration beside it. It was
 * `scheme-2` (Caribbean Green) with centred copy and no illustration. This is
 * the sixth copy of a decision already taken.
 *
 * The same illustration node backs every one of those frames and it already
 * ships as `home-cta-envelope.png` at 924x888, so no new asset. This frame
 * draws it slightly smaller than the others -- 426x415 against their 462x444,
 * the same 1.03 aspect -- which is inside the hand-placed-block error the
 * design skill warns about, so it keeps the shared 462px cap.
 *
 * `.btn-dark` makes the button black with a white label, which is what the
 * frame has (fill #000a08, label #ffffff). `.btn-dark-on-light` is required
 * alongside it and is not decoration: on the green scheme `.btn-dark` worked
 * alone because `scheme-accent` omits the nested default-button colour rule,
 * but `scheme-1` carries it and wins on specificity -- without this class the
 * label goes black on the black fill and disappears. See the utility's comment
 * in `globals.css`.
 *
 * The button keeps `/contact-us`, as on For Business: the intake Application
 * modal drives individual Peer Coach matching, which is not what an
 * organisation booking an AI strategy call needs.
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
