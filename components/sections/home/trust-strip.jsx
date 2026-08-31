"use client";

import { CarfSeal } from "@/components/brand/carf-seal";
import React from "react";
import { ChevronRight } from "relume-icons";

/**
 * CARF accreditation is the strongest trust signal this business has, so it sits
 * directly under the hero rather than buried on the compliance page. The seal is
 * a third-party accreditation mark: it renders at its native 1:1 with its own
 * colours untouched, and gets clear space of its own — no cropping, tinting or
 * stretching, per CARF's usage rules and the brand doc's own logo guidance.
 */
export function TrustStrip() {
  return (
    // Tight bottom padding on purpose. This strip is a footnote to the hero
    // rather than a section in its own right, and the section below it opens
    // with its own generous top padding - at the export's pb-24 the two
    // stacked into a gap wide enough to read as a missing section.
    <section className="px-[5%] pb-8 md:pb-10 lg:pb-12 scheme-1 badge-alt">
      <div className="container">
        {/* `id` is what the hero's scroll cue watches. The cue exists to say
            "there is more below"; once this block is on screen that is
            answered, so the arrow stands down. It is on the content rather
            than the <section> on purpose - the section's top edge sits right
            at the fold, so observing the section would retire the arrow before
            anything here is actually readable. */}
        <div
          id="carf-trust-strip"
          className="mx-auto flex max-w-lg flex-col items-center gap-5 border-t border-scheme-border pt-8 text-center sm:max-w-none sm:flex-row sm:justify-center sm:gap-8 sm:text-left md:pt-10"
        >
          <CarfSeal className="size-16 md:size-20" />
          <div className="sm:max-w-md">
            <p className="font-semibold">CARF accredited</p>
            <p className="mt-1 text-small">
              We hold the CARF Gold Seal ourselves — the same standard we help
              behavioral health organizations reach.
            </p>
            <a
              href="/compliance-support"
              className="mt-2 inline-flex items-center gap-1 text-small font-medium underline"
            >
              How we support compliance
              <ChevronRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
