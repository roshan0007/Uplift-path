"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export function Faq1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
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
            <AccordionTrigger className="text-medium md:py-5">
              Is this confidential?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Everything you share stays between you and your provider. We
              follow strict privacy laws and ethical codes. Your trust is the
              foundation of the work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium md:py-5">
              How are providers matched?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We listen to your needs and history. Then we connect you with a
              professional whose expertise fits. The match is based on
              substance, not chance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium md:py-5">
              What does it cost?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Costs vary by service and coverage. We will walk through the
              details before your first session. No hidden fees, no surprises.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium md:py-5">
              Can I switch providers?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes. The relationship has to be right. If it is not a good fit, we
              will find you someone else without any hassle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-medium md:py-5">
              How soon can I start?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Often within a few days. After you share your needs we move
              quickly. The first step is the hardest and we do not delay it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
