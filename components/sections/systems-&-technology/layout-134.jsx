"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The 2026-09-09 Figma (frame `System & Technology`) leaves the type untouched
 * -- tagline 16/24 w600, heading 52/62.4 Playfair 400, body 18/27 -- and adds
 * two decorative line-art vignettes: an envelope on the left, an open laptop on
 * the right. Both cut from the 2x reference render (the Figma API is paywalled;
 * see the import record) and un-composited off white with a min-channel alpha
 * key. Isolating them needed the same care as on Advisory: the heading and the
 * body copy each share rows with a vignette, so both boxes were measured over
 * the y bands those rows leave free.
 *
 * Promoted from <h2> to <h1>. The route's only <h1> was on `layout-564`'s
 * "What we do", which is not the page title.
 *
 * The body's first sentence is dropped. The frame opens it "Technology should
 * remove work, not add it." -- the heading, repeated verbatim two lines below
 * itself. Raised and settled: the echo goes, the rest of the sentence is the
 * frame's.
 */
export function Layout134() {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      {/* Frame-relative, measured from the top of this section (y=72):
          envelope at 132,296 138.5x127; laptop at 1185,109 169.5x178. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      >
        <img
          src="/images/systems-hero-envelope.png"
          alt=""
          className="absolute top-[296px] left-[132px] h-[127px] w-[138.5px]"
        />
        <img
          src="/images/systems-hero-laptop.png"
          alt=""
          className="absolute top-[109px] right-[85.5px] h-[178px] w-[169.5px]"
        />
      </div>

      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Systems & Technology</p>
        <h1 className="mb-5 text-h2 font-bold md:mb-6">
          Technology should remove work, not add it
        </h1>
        <p className="text-medium">
          We map your operations, then build systems that give your people
          time back.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Book a discovery call" variant="secondary">
            <a href="/contact-us">Book a discovery call</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
