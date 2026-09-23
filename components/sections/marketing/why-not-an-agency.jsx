"use client";

import React from "react";

/**
 * The 2026-09-18 `Marketing Page` design's second block: a centred h2 over a
 * single centred paragraph, nothing else. Built as its own section rather than
 * folded into the hero because the frame gives it a full section's rhythm above
 * and below.
 *
 * `scheme-mint`, not `scheme-1`. Left alone, this route would run seven
 * consecutive white sections; this one, `first-engagement` and `faq-01`
 * alternate them white MINT white MINT white MINT white. This brand has exactly
 * two depth cues — a scheme change and the button ledge — so the remedy for a
 * same-background run is the scheme, never a texture or a blurred shadow.
 * Same treatment as advisory-services/layout-374 and ai-consultation/layout-01.
 */
export function WhyNotAnAgency() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-5 text-balance text-h2 font-bold md:mb-6">
            Why This Isn&rsquo;t a General Marketing Agency
          </h2>
          <p className="text-medium">
            We hold the CARF Gold Seal for our own programs. Our Chief
            Compliance Officer is a licensed social worker. Our Chief Risk
            Officer spent twenty years in governance. So we start where most
            agencies never go: what you are legally allowed to say, who you are
            allowed to say it about, and what has to be documented before it
            goes live.
          </p>
        </div>
      </div>
    </section>
  );
}
