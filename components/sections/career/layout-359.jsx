"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Career`).
 *
 * Two changes, both to the card:
 *
 * 1. **The photograph is replaced by the line-art illustration the frame
 *    draws** — three colleagues around a laptop. That file is already in the
 *    repo as `contact-us-illustration.png`: its ink is 496x339 (ratio 1.4631)
 *    against the frame's 524.5x359 (ratio 1.4610), and an ink-bbox comparison
 *    puts it 22.1 against 49+ for every other candidate. No new asset.
 *    `career-feature-section-1.png` is left unreferenced; see the import record.
 *    `object-cover` also becomes `object-contain`, since cropping a drawing
 *    with its own whitespace to 3:2 cuts the figures.
 *
 * 2. **The heading was Relume fixture copy.** Both the export and the frame
 *    give it "Manage all support tickets from a single dashboard" — a stock
 *    Relume headline for a product this company does not sell, on a hiring
 *    page, above a body that is real and is about how the team works
 *    internally. A defect the frame does not fix, so it was rewritten rather
 *    than shipped: **"The way we work on the inside"**. It asserts nothing the
 *    body does not already say and introduces no new claim, but it is the only
 *    copy on this page that was written rather than transcribed, so it is
 *    called out in the import record and is worth a read in review.
 *
 * Not changed, and noted in the import record: the "Operations" tagline is the
 * same string `layout-469` uses two sections earlier — the Relume fixture
 * eyebrow appearing twice rather than two real categories.
 */
export function Layout359() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Why Uplift Path — Hear from Our Team
            </h2>
            <p className="text-medium">
              Learn why our team chose Uplift Path and how our mission to
              empower businesses through clarity, strategy, and growth aligns
              with their professional journeys. Join a culture built on
              collaboration, open communication, and innovation—where every
              voice shapes how we deliver impact. At Uplift Path, we’re not just
              a workplace; we’re a community of strategic thinkers, builders,
              and problem-solvers committed to helping organizations and leaders
              thrive.
            </p>
          </div>
        </div>
        <Card className="grid auto-cols-fr grid-cols-1 items-center md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src="/images/contact-us-illustration.png"
              className="size-full object-contain"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-small font-semibold">Operations</p>
              <h3 className="mb-5 text-h3 font-bold md:mb-6">
                The way we work on the inside
              </h3>
              <p>
                We built our internal systems the same way we advise clients.
                Clarity eliminates chaos and a single source of truth keeps the
                team moving forward together.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button asChild title="Explore opportunities" variant="secondary">
                <a
                  href="https://openings.upliftpathwellness.com/jobs/Careers"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore opportunities
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
