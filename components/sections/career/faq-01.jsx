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
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-medium">
            Find answers to your questions about us.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-medium md:py-5">
              What kinds of roles does Uplift Path typically hire for?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We hire for consulting, operations, project management, marketing,
              and analyst roles that support behavioral health and broader
              service-based organizations in improving their systems,
              compliance, and growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium md:py-5">
              What core values guide how the team works together?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We work from clear values: integrity and trust, collaboration and
              inclusion, empowerment and growth, excellence and innovation,
              compassion and service, and sustainability and impact—these shape
              how we make decisions, give feedback, and support each other.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium md:py-5">
              What learning and development opportunities are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Team members have access to ongoing training, mentoring, and
              curated resources that build skills in consulting, behavioral
              health operations, compliance frameworks, and business systems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-medium md:py-5">
              How flexible are working hours?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              While we align around client needs and core collaboration windows,
              we support flexibility in structuring your day so you can manage
              deep work, family responsibilities, and personal commitments.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
