"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Compliance Support`).
 *
 * Three changes:
 *
 * 1. **`<h1>` -> `<h2>`.** This section held the route's only `<h1>` ("Where
 *    are you right now?"), which is not the page title. The hero has it now.
 *
 * 2. **The four icons are served from `/svgs` instead of hot-linked off
 *    jsdelivr at `@latest`,** and they are applied as a CSS mask so the fill
 *    comes from the palette. The export set `text-scheme-text` on an `<img>`,
 *    which cannot tint anything. The frame draws them at the dark neutral
 *    (sampled: darkest channel triple 0,10,8), so `bg-scheme-text` is the
 *    fill. Same treatment as `how-we-work/layout-254` and
 *    `ai-consultation/layout-253`; pinned at `@material-symbols/svg-500@0.38.0`.
 *
 * 3. **Each item's quoted situation gets its own line.** The frame sets the
 *    quote on line one and the answer beneath it in every one of the five
 *    blocks; the export ran them together into a single run of text, so a
 *    reader had to find the sentence boundary themselves.
 *
 * Not changed: the frame draws this whole block 90px right of the container
 * edge, with its right-hand column running past 1440. That is a pasted
 * screenshot of the built page, not design intent -- the two columns are the
 * container's own 600/600 either way, so the block stays container-aligned.
 * The illustration is the file already in the repo (ink-bbox match, mean
 * channel difference 0.5).
 */

/** One situation. The icon is a mask so the fill comes from the palette. */
function Situation({ icon, quote, children }) {
  return (
    <li className="flex self-start">
      <div className="mr-4 flex-none self-start">
        <span
          aria-hidden="true"
          className="block size-6 bg-scheme-text"
          style={{
            maskImage: `url(/svgs/icon-${icon}.svg)`,
            WebkitMaskImage: `url(/svgs/icon-${icon}.svg)`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>
      <span>
        <span className="block">{quote}</span>
        {children}
      </span>
    </li>
  );
}

export function Layout16() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Where are you right now?
            </h2>
            <p className="mb-5 text-medium md:mb-6">
              <span className="block">&quot;We are brand new.&quot;</span>
              Licensure requirements, foundational policies, and payer enrolment
              readiness — built correctly from the start, which is far cheaper
              than retrofitting later.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <Situation
                icon="strategy"
                quote="&quot;We are pursuing accreditation.&quot;"
              >
                Gap analysis against your standard, policy build-out, evidence
                preparation, and a mock survey before the real one.
              </Situation>
              <Situation
                icon="search_insights"
                quote="&quot;Our policies have drifted from what we actually do.&quot;"
              >
                Chart audits and policy realignment, so the documented process
                and the real process are the same thing again — plus a review
                cycle that keeps them aligned.
              </Situation>
              <Situation
                icon="support"
                quote="&quot;We have findings.&quot;"
              >
                A corrective action plan with owners and deadlines, addressed at
                the root rather than patched. We will be direct with you about
                what has to change.
              </Situation>
              <Situation
                icon="send"
                quote="&quot;We passed — now we need to stay ready.&quot;"
              >
                An internal audit cadence, staff training, and a risk register,
                owned by your team rather than by us.
              </Situation>
            </ul>
          </div>
          <div>
            <img
              src="/images/compliance-support-feature-section-0.png"
              className="w-full rounded-image object-cover"
              alt="An illustration of a person holding up a drawing of a flower"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
