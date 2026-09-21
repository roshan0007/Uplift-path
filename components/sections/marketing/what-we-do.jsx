"use client";

import React from "react";

/**
 * The 2026-09-18 `Marketing Page` design's five capabilities, drawn radially
 * around the heading and the collage illustration: two down the left, two down
 * the right, the fifth centred underneath.
 *
 * That composition is the point of the section — it is what stops five equal
 * services reading as a ranked list — so it is built with explicit grid
 * placement at `lg` rather than approximated as a 3x2. Below `lg` the whole
 * thing collapses to one column in DOM order: heading, illustration, then the
 * five in reading order. The placement classes only apply from `lg`, so the
 * source order *is* the mobile order and no `order-*` juggling is needed.
 *
 * **The icons are not the frame's.** The design repeats one placeholder glyph —
 * a circle with three dots, the Relume default — five times, so it carries no
 * information. Each card gets the semantically right Material Symbol from
 * `/svgs` instead, which is the treatment `ai-consultation/layout-253` and
 * `how-we-work/layout-254` already established, drawn as a mask so the fill
 * comes from `--color-caribbean-green-dark` (an `<img>` cannot be tinted). No
 * new asset and no new token.
 */
const CAPABILITIES = [
  {
    icon: "target",
    title: "Positioning & messaging",
    body: "One clear sentence about what you do, who you serve and why you're different — then used in the same words on your website, your intake scripts and your referral conversations. Most organizations we meet describe themselves three different ways in three places.",
    // Left column, top.
    place: "lg:col-start-1 lg:row-start-1",
  },
  {
    icon: "search_insights",
    title: "Local search & paid advertising",
    body: "Google Business Profile, service-area pages and paid campaigns measured against cost per inquiry, not impressions. Every campaign is scoped against the rules ad platforms apply to health advertisers, so nothing is rejected or pulled a week after it launches.",
    // Right column, top.
    place: "lg:col-start-3 lg:row-start-1",
  },
  {
    icon: "groups",
    title: "Referral & community outreach",
    body: "In behavioral health most admissions come from a person, not an ad. We build the referral list, the one-page leave-behind and the follow-up rhythm that keeps your name on it, so that referrals arrive steadily instead of whenever someone happens to remember you.",
    // Left column, bottom.
    place: "lg:col-start-1 lg:row-start-2",
  },
  {
    icon: "design_services",
    title: "Website & content",
    body: "Pages built around the two people who actually arrive: someone looking for help, and a referral partner checking that you're credible. Both should find their answer quickly without having to call first, and know what to do next when they're ready to act on it.",
    // Right column, bottom.
    place: "lg:col-start-3 lg:row-start-2",
  },
  {
    icon: "encrypted_add",
    title: "Compliance-safe marketing review",
    body: "We audit everything you already publish: testimonials, outcome claims, photography, intake forms and tracking pixels. You get back a written list of what to keep, what to reword and what to take down today, with the reason for each one given in plain language.",
    // Centred beneath the illustration.
    place: "lg:col-start-2 lg:row-start-3",
  },
];

/** One capability. The icon is a mask so the fill comes from the palette. */
function Capability({ icon, title, children }) {
  return (
    <div className="flex gap-x-3">
      <span
        aria-hidden="true"
        // `mt-1` optically centres the glyph on the first line of the title
        // rather than on its box.
        className="mt-1 size-6 shrink-0 bg-caribbean-green-dark"
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
      <div>
        {/* `<h3>` under the section's `<h2>`, and it has to be an element in
            the h1-h6 range: `globals.css` binds Playfair Display to those
            selectors and nowhere else, and the frame sets these titles in
            Playfair. */}
        <h3 className="mb-2 text-h5 font-bold md:mb-3">{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 lg:grid-cols-3 lg:gap-x-16">
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <h2 className="mb-8 text-center text-h2 font-bold md:mb-10">
              What we do
            </h2>
            {/* Decorative — the five capabilities beside it carry the meaning. */}
            <img
              src="/images/marketing-what-we-do.png"
              alt=""
              aria-hidden="true"
              className="mx-auto h-auto w-full max-w-[400px] select-none"
            />
          </div>
          {CAPABILITIES.map((capability) => (
            <div key={capability.title} className={capability.place}>
              <Capability icon={capability.icon} title={capability.title}>
                {capability.body}
              </Capability>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
