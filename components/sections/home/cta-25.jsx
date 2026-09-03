"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Re-skinned to the 2026-09 Figma: the banner is no longer green.
 *
 * It was `scheme-2` (Caribbean Green) with centred copy. The Figma puts it on
 * white, left-aligns the copy, and moves the envelope illustration in beside
 * it — the green has moved down to the footer instead, so the page now ends on
 * one green band rather than two.
 *
 * `.btn-dark` stays. It is what makes the button black with a white label, and
 * the Figma's "Get Started" is still exactly that. Worth knowing that
 * `btn-dark` also drops the 3px ledge and the hover translate (see
 * `button.jsx`), which is why this button does not press like the others.
 *
 * `.btn-dark-on-light` is required here and is not optional decoration. On the
 * green scheme `.btn-dark` worked alone, because `scheme-accent` omits the
 * nested default-button colour rule. `scheme-1` carries it, and it wins on
 * specificity — without this class the label goes black on the black fill and
 * vanishes. See the utility's comment in `globals.css`.
 */
export function Cta25() {
  return (
    // `id` is what the sticky IntakeBar watches to know it should get out of
    // the way. Still true, and still worth keeping now that this banner is
    // white rather than green: the bar is green, and it sitting on top of the
    // page's final call to action was the actual problem, not the colour clash.
    <section
      id="home-cta"
      className="scroll-mt-20 px-[5%] py-16 md:py-24 lg:py-28 scheme-1 btn-dark btn-dark-on-light badge-alt"
    >
      <div className="container">
        {/* Single column for now. The Figma is two — copy left, envelope right
            — but `lg:grid-cols-2` with nothing in the second cell would pin
            the copy into a half-width track and leave the right half blank,
            which looks like a load failure rather than a layout. See the ASSET
            SLOT note below for the two-line change once the illustration
            exists. */}
        <div>
          <div className="max-w-md">
            {/* Two lines in the Figma, and the break is meaningful — "Ready to
                unlock" / "Your growth plan" — so it is a <span> rather than
                left to the container width. */}
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

          {/* ASSET SLOT — the opened envelope with the pen and sparkles sits
              here in the Figma, filling the right half. It is not in
              `public/images/`, `public/svgs/` or the design system's
              `assets/images/` yet.

              When it lands, put the grid back on the wrapper above:
                className="grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-2"
              and add this as its second child:
                <img src="/svgs/home-cta-envelope.svg" alt="" aria-hidden="true"
                     className="h-auto w-full max-w-md justify-self-end" />

              Decorative — the heading and button carry the meaning, so `alt=""`
              and `aria-hidden`. */}
        </div>
      </div>
    </section>
  );
}
