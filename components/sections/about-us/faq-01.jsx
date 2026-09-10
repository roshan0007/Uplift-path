"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * Reworked to the 2026-09-08 Figma (node 10358-8178).
 *
 * The frame replaces all four entries with About-specific ones, but only two of
 * its four answers are actually written. The other two are authoring notes to
 * the client sitting in the answer slot — "Needs your answer — founding year"
 * and "Needs your answer. This is what a sceptical reader asks about your
 * headline number." Those are not shippable copy, so they are not here.
 *
 * The two written ones lead. Behind them sit the two export answers that still
 * earn their place on an About page: who the work is for, and what it covers.
 * The export's other two are dropped — "What is Uplift Path's approach to
 * business consulting?" and "What makes Uplift Path different from other
 * consultancies?" both restate the Figma's second question, which answers it
 * far more concretely.
 *
 * Still outstanding, and blocked on the client rather than on this build:
 *   - the founding year ("How long has Uplift Path been operating?")
 *   - how "100,000 lives uplifted" is counted
 * Both are in the frame, both are questions a sceptical reader asks, and
 * neither can be answered from anything on the site today.
 */
export function Faq1() {
  return (
    // `scheme-mint`, not `scheme-1`.
    // See the note in team-06: second of the two breaks in /about-us's white run.
    // This brand has exactly two depth cues -- a scheme change and the button
    // ledge -- so the remedy for a same-background run is the scheme, never a
    // texture or a blurred shadow. `.scheme-mint` is the light neutral already
    // used this way on home/testimonial-10; cta-25's white is a documented
    // deliberate reversal and is left alone everywhere.
    <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 scheme-mint badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-medium">
            Find answers to your questions about us.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            {/* `text-large`, not `text-medium`, on every trigger in this list.
                `font-body font-[400]` is the site-wide ruling (CLAUDE.md: all
                eleven routes, not bold, deliberately) and is untouched -- but at
                `text-medium` the question came out identical to its own answer in
                family, size, weight and colour, with only the chevron to tell them
                apart. Weight is not available as the differentiator in this brand,
                so it has to be size: one token step up, ruling intact. Same
                resolution as home/faq-01. */}
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Who owns and runs Uplift Path?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our executive team is a Chief Operating Officer, a Chief
              Compliance Officer and a Chief Risk Officer, between them covering
              operations, clinical compliance and enterprise risk. They're
              supported by a four-member Board of Advisors drawn from education,
              clinical practice and governance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              What makes your advice different from a generalist consultancy?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We've been through what we advise on. Uplift Path holds the CARF
              Gold Seal for its own programs, our Chief Compliance Officer is a
              licensed social worker, and our Chief Risk Officer spent twenty
              years in enterprise governance. When we help a provider get
              survey-ready, it isn't theory.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              Who benefits from your consulting services?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our clients include Founders, entrepreneurs, business owners, and
              executives from any industry seeking strategic guidance and
              mentorship for sustainable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-large font-body font-[400] md:py-5">
              What types of challenges can you help with?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We assist with growth planning, process optimization, market
              entry, strategic decision-making, team development, and more.
              Every service is tailored to unique business needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
