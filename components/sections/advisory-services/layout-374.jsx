"use client";

import { Card } from "@/components/ui/card";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Advisory Services`).
 *
 * The export shipped the four small cards byte-identical -- same eyebrow, same
 * "Business Structuring" heading, same sentence, same image, four times over.
 * An earlier pass patched that by writing three replacements from the advisory
 * work described elsewhere on the page, and dropped the images to keep the
 * section under a single screen. It was working without the design to hand.
 *
 * The frame gives its own four, and they are the original set: **the four
 * photos already in the repo are named for exactly these cards** --
 * `advisory-services-business-structuring.jpg`,
 * `-growth-expansion-strategy.jpg`, `-operational-advisory.jpg` and
 * `-growth-gap-assessment.jpg`. That naming is what settled it. The frame's
 * copy and its images both ship, which makes the section taller than the
 * earlier pass wanted; that trade was taken deliberately.
 *
 * One thing the frame asks for is **not** built: its "Growth & Gap Assessment"
 * body ends "Free, with no obligation." That is a pricing commitment, and
 * nothing anywhere else in the codebase offers a free service. The sentence is
 * dropped pending confirmation; the rest of the card is the frame's.
 *
 * Which photo goes where was settled by matching each of the frame's five
 * photo regions against every `advisory-services-*` file in the repo: each
 * best match scored 2-18 against a runner-up of 68+, so none of them is a
 * guess. The feature card's is `features-list-section-0.jpg` (the sticky-note
 * planning table), not the file the export had there.
 *
 * Geometry: a four-column grid across the 1280 container, the feature card
 * spanning two columns and two rows -- which is what the export already built
 * and what the frame draws (feature ~612 wide, smalls ~311, gaps ~24).
 * Type is 16 w600 eyebrows, Playfair headings, 16/24 bodies.
 */
const FOCUS_AREAS = [
  {
    eyebrow: "Focus",
    title: "Business Structuring",
    body: "Design operational clarity so the organization runs without depending on any individual.",
    image: "/images/advisory-services-business-structuring.jpg",
    alt: "A desk with a laptop, a written plan and a pen",
  },
  {
    eyebrow: "Momentum",
    title: "Growth & Expansion Strategy",
    body: "Assess readiness before committing to growth. Ensure capacity matches delivery.",
    image: "/images/advisory-services-growth-expansion-strategy.jpg",
    alt: "Two colleagues talking through a growth plan at a table",
  },
  {
    eyebrow: "Honesty",
    title: "Operational Advisory",
    body: "Senior-level partnership for founders on governance and succession.",
    image: "/images/advisory-services-operational-advisory.jpg",
    alt: "Three people in an advisory conversation in a meeting room",
  },
  {
    eyebrow: "Stability",
    title: "Growth & Gap Assessment",
    body: "A structured gap analysis from current to target state.",
    image: "/images/advisory-services-growth-gap-assessment.jpg",
    alt: "Two colleagues reviewing an assessment on a tablet together",
  },
];

export function Layout374() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // /advisory-services ran six consecutive white sections. This one and
    // faq-01 give white white MINT white MINT white.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-mint badge-alt">
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
                the image's intrinsic height sets the row height. */}
            <div className="min-h-0 flex-1">
              <img
                src="/images/advisory-services-features-list-section-0.jpg"
                alt="An advisory team working through a programme plan around a table"
                className="size-full min-h-40 object-cover"
              />
            </div>
          </Card>
          {FOCUS_AREAS.map((area) => (
            <Card key={area.title} className="flex flex-col">
              <div className="p-6">
                <p className="mb-2 text-small font-semibold">{area.eyebrow}</p>
                <h3 className="mb-2 text-h5 font-bold">{area.title}</h3>
                <p>{area.body}</p>
              </div>
              {/* Fixed height rather than `flex-1`, and this is what sizes the
                  whole grid. The four small cards were letting the photo take
                  every pixel the row gave them, so each ran to 410-434px and
                  the feature card beside them — spanning both rows — stretched
                  to 876px with a 614px photograph in it. Asked to bring these
                  down. Capping the small photos at 144/160px settles the row
                  height, the feature card follows it down, and no card is
                  mostly image any more. */}
              <div className="mt-auto">
                <img
                  src={area.image}
                  alt={area.alt}
                  className="h-36 w-full object-cover md:h-40"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
