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
              What is Uplift Path’s approach to business consulting?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Uplift Path focuses on practical, results-driven strategies. We
              listen to each client’s needs, analyze their business, and deliver
              clear, actionable plans for measurable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Who benefits from your consulting services?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our clients include Founders, entrepreneurs, business owners, and
              executives from any industry seeking strategic guidance and
              mentorship for sustainable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              What types of challenges can you help with?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We assist with growth planning, process optimization, market
              entry, strategic decision-making, team development, and more.
              Every service is tailored to unique business needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What makes Uplift Path different from other consultancies?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We emphasize actionable advice, collaborative problem-solving, and
              a personalized approach. Our team brings deep expertise and a
              disciplined focus to every project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
