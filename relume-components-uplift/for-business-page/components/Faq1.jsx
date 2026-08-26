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
              What is business consulting?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Business consulting involves providing expert advice, actionable
              strategies, and hands-on support to help organizations solve
              challenges, improve operations, and achieve measurable growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Why should we work with a business consultant?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Business consultants offer an objective perspective, proven
              methodologies, and industry insights that accelerate
              problem-solving, streamline workflows, and drive
              innovation—resulting in sustainable business outcomes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Which industries do you specialize in?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our business consulting approach serves Founders and Leaders
              across all industries—from startups and SaaS ventures to retail,
              manufacturing, and professional services.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do your consulting services create value for clients?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We help clients address complex business challenges through
              collaborative coaching, process optimisation, technology
              integration, and growth strategy delivering disciplined
              improvements and actionable outcomes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
