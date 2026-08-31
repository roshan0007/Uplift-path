"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export function Layout28() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <Tabs
          defaultValue="tab-1"
          className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20"
        >
          <TabsList className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-1 items-center gap-x-4">
            <TabsTrigger
              value="tab-1"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-4 pr-0 pl-6 text-left whitespace-normal data-[state=active]:border-scheme-text data-[state=active]:bg-transparent md:pl-8"
            >
              <div>
                <h3 className="mb-3 text-h4 font-bold md:mb-4">How it works</h3>
                <p>
                  1. Submit a request — Tell us where you are and what is in the
                  way. 2. Discovery call — We listen before we advise. No pitch
                  deck. 3. Your pathway plan — A written plan with priorities,
                  owners and timelines. 4. Measurable progress — Agreed
                  milestones, reviewed on a set cadence.
                </p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-4 pr-0 pl-6 text-left whitespace-normal data-[state=active]:border-scheme-text data-[state=active]:bg-transparent md:pl-8"
            >
              <div>
                <h3 className="mb-3 text-h4 font-bold md:mb-4">What you get</h3>
                <p>
                  - A written Pathway Plan with sequenced priorities and named
                  owners - Organisational structure recommendations and role
                  definitions - A standard operating procedure set for your core
                  workflows - A 90-day execution roadmap - A KPI framework —
                  what you measure, how often, and who reports it - A
                  board-ready summary you can present without rewriting
                </p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-4 pr-0 pl-6 text-left whitespace-normal data-[state=active]:border-scheme-text data-[state=active]:bg-transparent md:pl-8"
            >
              <div>
                <h3 className="mb-3 text-h4 font-bold md:mb-4">Outcomes</h3>
                <p>
                  - Decisions made against a plan instead of against the loudest
                  problem - A leadership team aligned on the same three
                  priorities - Operations that hold up as volume increases -
                  Progress you can evidence to a board, a funder or a payer
                </p>
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-center overflow-hidden">
            <TabsContent
              value="tab-1"
              className="data-[state=active]:animate-tabs"
            >
              <img
                src="/images/advisory-services-growth-expansion-strategy.jpg"
                alt="Two people talking through a growth strategy at a desk"
                className="size-full rounded-image object-cover"
              />
            </TabsContent>
            <TabsContent
              value="tab-2"
              className="data-[state=active]:animate-tabs"
            >
              <img
                src="/images/advisory-services-business-structuring.jpg"
                alt="A desk with a laptop, a written plan and a pen"
                className="size-full rounded-image object-cover"
              />
            </TabsContent>
            <TabsContent
              value="tab-3"
              className="data-[state=active]:animate-tabs"
            >
              <img
                src="/images/advisory-services-features-list-section-0.jpg"
                alt="A team reviewing progress against the plan together"
                className="size-full rounded-image object-cover"
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
