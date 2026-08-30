"use client";

import { Card } from "@/components/ui/card";
import React from "react";

/**
 * The export shipped this as a feature card plus four small cards that were
 * byte-identical to each other — same eyebrow, same "Business Structuring"
 * heading, same sentence, same image, four times over. Three of them now carry
 * the advisory work this page actually describes elsewhere (the problem section
 * above and the pathway-plan tabs below).
 *
 * The small cards also lost their images. With them the section ran past a
 * single 900px screen, and four copies of one photograph was the thing that made
 * the duplication obvious in the first place. One image, on the feature card, is
 * enough for the section.
 */
const FOCUS_AREAS = [
  {
    eyebrow: "Structure",
    title: "Business Structuring",
    body: "Operational clarity, so the organization runs without depending on any individual.",
  },
  {
    eyebrow: "Readiness",
    title: "Accreditation Readiness",
    body: "Read your practice against the standard you are pursuing, then close the gaps in order.",
  },
  {
    eyebrow: "Funding",
    title: "Payer Readiness",
    body: "Service definitions, credentialing and documentation in place before a contract depends on them.",
  },
  {
    eyebrow: "Growth",
    title: "Growth Planning",
    body: "What to add, in what order, and what your operation has to carry before you add it.",
  },
];

export function Layout374() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-8 md:mb-10">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-h2 font-bold">What we do</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="flex flex-col sm:col-span-2 sm:row-span-2">
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="mb-2 text-small font-semibold">Clarity</p>
              <h3 className="mb-3 text-h3 font-bold md:mb-4">
                Program Development
              </h3>
              <p>
                Design and refine evidence-informed programmes that align with
                your mission and your payer requirements — service definitions,
                staffing model, documentation standards, and the outcome
                measures you will be held to.
              </p>
            </div>
            {/* `min-h-0` matters: this card spans two grid rows, so without it
                the image's intrinsic height sets the row height and the whole
                section grows past a screen again. */}
            <div className="min-h-0 flex-1">
              <img
                src="/images/advisory-services-features-list-section-0.jpg"
                alt="A team mapping out a programme on a wall of sticky notes"
                className="size-full min-h-40 object-cover"
              />
            </div>
          </Card>
          {FOCUS_AREAS.map((area) => (
            <Card key={area.title} className="flex flex-col p-6">
              <p className="mb-2 text-small font-semibold">{area.eyebrow}</p>
              <h3 className="mb-2 text-h6 font-bold">{area.title}</h3>
              <p>{area.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
