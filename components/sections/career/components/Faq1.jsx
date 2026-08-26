"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Frequently Asked Questions
          </h2>
          <p className="md:text-md">Find answers to your questions about us.</p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
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
            <AccordionTrigger className="md:py-5 md:text-md">
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
            <AccordionTrigger className="md:py-5 md:text-md">
              What learning and development opportunities are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Team members have access to ongoing training, mentoring, and
              curated resources that build skills in consulting, behavioral
              health operations, compliance frameworks, and business systems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
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
