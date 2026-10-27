"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Unchanged against the 2026-09-09 Figma (frame `Career`) apart from the alt
 * text. The heading, the body word for word, the Apply button and the
 * illustration are all the frame's, and the illustration is the file already in
 * the repo (ink-bbox match, mean channel difference 0.1 against 51+ for every
 * other candidate). `alt="An illustration of three hands stacked together"` now describes the drawing.
 */
export function Layout213() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // /careers ran seven consecutive white sections, the longest on the site.
    // This one, layout-469 and faq-01 alternate it clean: white MINT white
    // MINT white MINT white.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
      <div className="container">
        {/* Three children, not two (2026-09-29): heading, image, then the
            paragraph and button, so phones read text -> media -> text instead
            of all the text before one lone picture. The md: placement keeps
            desktop as before, image left and copy right. */}
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-0 lg:gap-x-20">
          <h2 className="mb-5 text-h2 font-bold md:col-start-2 md:row-start-1 md:mb-6 md:self-end">
            Who We Are
          </h2>
          <div className="md:col-start-1 md:row-span-2 md:row-start-1">
            <img
              src="/images/career-feature-section-0.png"
              className="w-full rounded-image object-cover"
              alt="An illustration of three hands stacked together"
            />
          </div>
          <div className="md:col-start-2 md:row-start-2 md:self-start">
            <p className="text-medium">
              We chose the name "Uplift Path" because our mission is to elevate
              businesses at every stage, every day. The word “uplift” embodies
              progress, innovation, and positive change. We’re dedicated to
              ensuring every Founder, leader, and team can access clear
              strategies and practical solutions—no matter who they are or where
              they operate.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button asChild title="Apply" variant="secondary">
                <a href="https://openings.upliftpathwellness.com/jobs/Careers" target="_blank" rel="noreferrer">Apply</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
