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
      className="scroll-mt-20 px-[5%] pt-12 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28 scheme-1 btn-dark btn-dark-on-light badge-alt"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="max-w-md">
            {/* Two lines in the Figma, and the break is meaningful — "Ready to
                unlock" / "your growth plan?" — so it is a <span> rather than
                left to the container width. The Figma capitalises the "Y",
                which is a mid-sentence capital in what is one sentence across
                two lines; lowercase, with the question mark the sentence was
                missing. */}
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Ready to unlock
              <span className="block">your growth plan?</span>
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

          {/* Decorative — the heading and the button carry the meaning, so no
              alt text. `justify-self-end` pins it to the right of the section
              as the Figma has it; on one column it centres instead. */}
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
