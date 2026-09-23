"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Built to the 2026-09-18 `Marketing Page` design (2x render).
 *
 * This hero is **not** the `layout-134` every other service route opens with.
 * Those are a centred column with the illustration floated into the margins;
 * this frame draws a true two-column split — the telescope figure on the left,
 * an eyebrow / h1 / body / button stack left-aligned on the right — so it is
 * built as a grid rather than as a `layout-134` with the art moved. Same
 * tokens, same type ladder, different composition.
 *
 * `text-h1` for the title, as on every other route's hero: this is the page's
 * only <h1> and `--font-weight-bold` is 400 here, so size is the only signal
 * of rank available. `text-balance` keeps the two-line frame composition from
 * orphaning "organizations." on a phone measure.
 *
 * The illustration is decorative — the eyebrow, heading and body carry every
 * claim in it — so it takes no alt text.
 */
export function Header01() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 lg:grid-cols-[2fr_3fr] lg:gap-x-20">
          {/* `order-last` on one column so a phone gets the heading and the
              call to action before the decoration; it returns to the left of
              the row from lg up, which is where the frame draws it. */}
          <div className="order-last flex justify-center lg:order-none">
            <img
              src="/images/marketing-hero-telescope.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-[420px] select-none"
            />
          </div>

          {/* `lg:max-w-none` — the cap is there to hold the measure while
              this stack is full-width on one column. From `lg` the grid track
              is already the frame's own 3/5 share of the row, and keeping a
              560px cap inside it is what pushed the title from the frame's two
              lines onto four. */}
          <div className="max-w-lg lg:max-w-none">
            <p className="mb-3 font-semibold md:mb-4">Marketing</p>
            <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">
              Marketing for Behavioral Health Organizations.
            </h1>
            <p className="text-medium">
              Most marketing agencies have never read a HIPAA marketing rule or
              sat through a CARF survey. We have. We help care organizations
              fill their caseload without writing a single claim they&rsquo;d
              have to defend later.
            </p>
            <div className="mt-6 flex items-center gap-x-4 md:mt-8">
              {/* `variant="secondary"` — the outlined button the frame draws,
                  and the same treatment every other service hero uses. */}
              <Button asChild title="Book a Marketing Review" variant="secondary">
                <a href="/contact-us">Book a Marketing Review</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
