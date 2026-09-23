"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The site's standard CTA banner, matched to the 2026-09-18 `Marketing Page`
 * design, which draws it exactly as the v3 frames already built do: white
 * rather than green, copy left-aligned, envelope illustration beside it.
 * `home-cta-envelope.png` is reused, so no new asset.
 *
 * `.btn-dark` makes the button black with a white label. `.btn-dark-on-light`
 * is required alongside it: `scheme-1` carries the nested default-button colour
 * rule that `scheme-accent` omits and out-specifies `.btn-dark` alone, which
 * would put a black label on the black fill. See `globals.css`.
 *
 * The button goes to `/contact-us`, as it does on every other service route.
 */
export function Cta25() {
  return (
    <section className="px-[5%] pt-12 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28 scheme-1 btn-dark btn-dark-on-light badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="max-w-md">
            {/* Two lines in the frame, and the break carries meaning --
                "Ready to unlock" / "Your growth plan" -- so it is a <span>
                rather than left to the container width. */}
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Ready to Unlock
              <span className="block">Your Growth Plan</span>
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
            className="mx-auto h-auto w-full max-w-[400px] select-none lg:mx-0 lg:justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
