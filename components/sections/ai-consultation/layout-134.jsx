"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The 2026-09-09 Figma (frame `AI Consultancy`) leaves the hero's type
 * untouched -- tagline 16/24 w600, heading 52/62.4 Playfair 400, body 18/27 --
 * and adds two decorative line-art vignettes either side of the copy: a green
 * notepad with a rising arrow on the left, a monitor on the right.
 *
 * The Figma API is paywalled on this account (see the import record), so both
 * are cut from the 2x reference render at exactly the box the frame draws them
 * in and un-composited off the white page with a min-channel alpha key. Round
 * trip over white: 0.19 and 0.17 of a channel step.
 *
 * `aria-hidden` and no alt text -- the heading and body carry the meaning.
 * `lg:` only, as on the other v3 heroes.
 *
 * Promoted from <h2> to <h1>. The route previously put its <h1> on
 * `layout-01`'s heading, and `layout-253` carried four more, so the page had
 * five <h1>s and none of them on the hero.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72): notepad
          at 112,173.5 165.5x154; monitor at 1167.5,331 145.5x136. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/ai-consultation-hero-notepad.png"
          alt=""
          className="absolute top-[173.5px] left-[112px] h-[154px] w-[165.5px]"
        />
        <img
          src="/images/ai-consultation-hero-monitor.png"
          alt=""
          className="absolute top-[331px] right-[127px] h-[136px] w-[145.5px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">AI Consultation</p>
        {/* `text-h1`, not `text-h2`. Every section heading on this route is
            `text-h2` -- 40px at 375, 52px at 1440 -- and so was the page
            title, which made the h1 the joint-largest heading rather than the
            largest. Weight cannot recover the rank here: `--font-weight-bold`
            is 400 on purpose, so size is the only signal available. One token
            step up is 44px / 72px, which clears every h2 at both widths. The
            lg step is 20px over the frame's 52, and that is the deliberate
            trade -- the frame giving the h1 and the h2 the same size is
            exactly the finding. Same resolution as the homepage h1.

    `text-balance` is what makes 44px survive a 338px measure: these
    titles run to three and four lines on a phone at the new size, and
    without it the last line orphans a single word. It is inert on the
    one-line titles and at lg, so it only acts where the wrap is real. */}
        <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">
          Unlock Your Business Potential with AI
        </h1>
        <p className="text-medium">
          From complex technology to tangible, measurable business results that
          drive real growth and lasting value.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button
            asChild
            title="Book your AI strategy session"
            variant="secondary"
          >
            <a href="/contact-us">Book your AI strategy session</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
