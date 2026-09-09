"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `AI Consultancy`). The copy was
 * already right; three things about how it was built were not.
 *
 * 1. **The icons were hot-linked off jsdelivr at `@latest`** -- an unpinned
 *    runtime dependency on a third-party CDN for four files that never change.
 *    They are now the same four Material Symbols saved into `/svgs` (pinned
 *    from `@material-symbols/svg-500@0.38.0`), which is the treatment
 *    `how-we-work/layout-254` already established.
 *
 * 2. **They rendered black.** The export set `text-scheme-text` on an `<img>`,
 *    which cannot tint anything. The frame draws them `#06A785`, which is
 *    already `--color-caribbean-green-dark` in the palette -- no new token.
 *    Tinting needs the file as a mask, and a mask needs a same-origin file, so
 *    (1) and (2) are the same fix.
 *
 * 3. **They were 48px; the frame draws 40.** All four measure 40.5-41px tall in
 *    the render (the widths vary with the glyph, which is why height is the
 *    reliable dimension).
 *
 * The four card titles were each an `<h1>`. On a page that also had an `<h1>`
 * in the hero's sibling section, that put five on the route. They are `<h3>`
 * now, under this section's `<h2>`.
 *
 * "Our Approch" is the frame's own typo and is corrected here, as the brief
 * directs for obvious design-file typos.
 */

/** One approach. The icon is a mask so the fill comes from the palette. */
function Approach({ icon, title, children }) {
  return (
    <div>
      <div className="mb-5 md:mb-6">
        <span
          aria-hidden="true"
          className="block size-10 bg-caribbean-green-dark"
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
      <h3 className="mb-5 text-h4 font-bold md:mb-6">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Layout253() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-start justify-start gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-12 md:gap-y-16 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Our Approach: Your Strategic AI Partner
            </h2>
          </div>
          <div className="grid w-full auto-cols-fr grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:gap-x-12">
            <Approach icon="strategy" title="Strategic">
              We align every AI initiative with your core business goals to
              ensure a significant return on investment.
            </Approach>
            <Approach icon="integration_instructions" title="Integrated">
              We connect AI tools with your existing workflows to ensure
              seamless operation and user adoption.
            </Approach>
            <Approach icon="encrypted_add" title="Secure &amp; Compliant">
              We build with a focus on security and governance, setting up AI
              compliance frameworks tailored to your industry&rsquo;s needs
              (including healthcare and other regulated sectors).
            </Approach>
            <Approach icon="align_justify_center" title="Human-Centered">
              We focus on empowering your workforce, ensuring your team can
              adopt and leverage AI to become more efficient and effective.
            </Approach>
          </div>
        </div>
      </div>
    </section>
  );
}
