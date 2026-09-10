"use client";

import React from "react";

import { SymbolIcon } from "@/components/ui/symbol-icon";

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 scheme-1 badge-alt">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-12 lg:mb-12">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Our Core Values</h2>
            <p className="text-medium">
              Our leadership brings decades of hard-won experience from the
              front lines of social work, education, and clinical practice. They
              guide our mission with steady hands and clear eyes.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="diversity_2"
                  className="size-12 text-scheme-text"
                />
              </div>
              {/* Two lines' worth of height whether the heading takes one or
                  two. Without it a one-line heading pulls its paragraph up and
                  the row's supporting text sits on three different baselines —
                  "Unity Through Collaboration" wraps, its neighbours do not.
                  `lh` is the element's own line-height, so this holds at both
                  ends of the type scale instead of needing a magic rem value. */}
              {/* `mb-2 md:mb-3`, not the icon block's own `mb-5 md:mb-6`. The heading
                  belongs to the paragraph under it, but at an equal 20/24px above and
                  below it read as floating between the icon and the body rather than
                  grouped with either. Same fix as home/layout-237. */}
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Unity Through Collaboration
              </h3>
              <p>Partnership where everyone rises together.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon name="map" className="size-12 text-scheme-text" />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Pathways with Clarity
              </h3>
              <p>Clear, transparent routes to meaningful progress.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="leaderboard"
                  className="size-12 text-scheme-text"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Lead with Compassion
              </h3>
              <p>Empathy and person-centered care in every interaction.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="all_inclusive"
                  className="size-12 text-scheme-text"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Inclusion for All
              </h3>
              <p>Cultural humility and equity for marginalized populations.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="support"
                  className="size-12 text-scheme-text"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Foster Hope
              </h3>
              <p>
                Unlock true potential through strength-based, holistic support.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="security"
                  className="size-12 text-scheme-text"
                />
              </div>
              <h3 className="mb-2 text-h4 font-bold md:mb-3 md:min-h-[2lh]">
                Total Person Care
              </h3>
              <p>Holistic support addressing all dimensions of wellness.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
