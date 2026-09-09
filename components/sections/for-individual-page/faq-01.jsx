"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

/**
 * The 2026-09-08 Figma (node 10214-103875) draws all five questions and all
 * five answers exactly as they are below, at its own 18/27 and 16/24 -- nothing
 * in this section's copy or spacing changed.
 *
 * What changed is the question face. Every frame in the Figma file sets FAQ
 * questions in Lexend Deca 18/27 at weight 700, and the build rendered them in
 * Playfair Display 400: Radix wraps the trigger in an <h3>, which the base
 * h1-h6 Playfair rule catches, and the trigger's own `font-bold` resolves
 * through `--font-weight-bold`, which this brand pins to 400 on purpose. So a
 * question that is marked bold and is not a heading came out as neither.
 *
 * Fixed at the call site rather than in the primitive, and it takes both
 * classes: `font-body` carries the family (declared in globals.css so the
 * one-file rule for font-family still holds) and `font-[700]` the weight, which
 * has to be a real font-weight utility -- `cn()` is tailwind-merge and drops
 * `font-bold` only when a class in the same group lands beside it. See
 * globals.css [13]. This is the second of eleven `faq-01` sections to get it;
 * /how-we-work was the first.
 */
export function Faq1() {
  return (
    <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 scheme-1 badge-alt">
      <div className="container max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">FAQs</h2>
          <p className="text-medium">
            Answers to the questions we hear most often from people starting
            their journey.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              Is this confidential?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Everything you share stays between you and your provider. We
              follow strict privacy laws and ethical codes. Your trust is the
              foundation of the work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              How are providers matched?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We listen to your needs and history. Then we connect you with a
              professional whose expertise fits. The match is based on
              substance, not chance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              What does it cost?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Costs vary by service and coverage. We will walk through the
              details before your session. No hidden fees, no surprises.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              Can I switch providers?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes. The relationship has to be right. If it is not a good fit, we
              will find you someone else without any hassle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-medium font-body font-[400] md:py-5">
              How soon can I start?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Often within a few days. After you share your needs we move
              quickly. The first step is the hardest and we do not delay it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
