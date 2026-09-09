"use client";

import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `Advisory Services`), which resolves
 * two things the export got wrong here.
 *
 * **The lists were not lists.** All three blocks had their items jammed into a
 * single `<p>` with the markers typed as literal characters -- "1. Submit a
 * request — Tell us... 2. Discovery call — We listen..." and "- A written
 * Pathway Plan... - Organisational structure...". They rendered as unbroken
 * walls of text with stray hyphens and digits in the middle of sentences, and
 * carried no list semantics for a screen reader. They are a real `<ol>` and two
 * real `<ul>`s now, which is also how the frame draws them: one item per line.
 *
 * **It was a tab set that could not usefully be tabbed.** The three headings
 * were `TabsTrigger`s, but each trigger contained its own full body, so all
 * three bodies were visible at once and clicking a heading only swapped a photo
 * beside them. The frame draws exactly what that produced -- three stacked
 * blocks -- so they are three stacked blocks, and the interaction that did
 * nothing is gone. That also removes three photos from the page for one
 * illustration.
 *
 * The media is the frame's own line-art figure. The frame draws the block's
 * left rule against "How it works" only, which is the active-tab border showing
 * through in what is otherwise a screenshot of this component; the rule is kept
 * on all three blocks so it reads as a deliberate device rather than a state.
 *
 * Type: headings 36/46.8 Playfair, items 16/24, both existing tokens and both
 * unchanged from the export.
 */

const BLOCKS = [
  {
    title: "How it works",
    ordered: true,
    items: [
      "Submit a request — Tell us where you are and what is in the way.",
      "Discovery call — We listen before we advise. No pitch deck.",
      "Your pathway plan — A written plan with priorities, owners and timelines.",
      "Measurable progress — Agreed milestones, reviewed on a set cadence.",
    ],
  },
  {
    title: "What you get",
    ordered: false,
    items: [
      "A written Pathway Plan with sequenced priorities and named owners",
      "Organisational structure recommendations and role definitions",
      "A standard operating procedure set for your core workflows",
      "A 90-day execution roadmap",
      "A KPI framework — what you measure, how often, and who reports it",
      "A board-ready summary you can present without rewriting",
    ],
  },
  {
    title: "Outcomes",
    ordered: false,
    items: [
      "Decisions made against a plan instead of against the loudest problem",
      "A leadership team aligned on the same three priorities",
      "Operations that hold up as volume increases",
      "Progress you can evidence to a board, a funder or a payer",
    ],
  },
];

export function Layout28() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="flex flex-col gap-10 md:gap-12">
            {BLOCKS.map(({ title, ordered, items }) => {
              const List = ordered ? "ol" : "ul";
              return (
                <div
                  key={title}
                  className="border-l border-scheme-border pl-6 md:pl-8"
                >
                  <h3 className="mb-3 text-h4 font-bold md:mb-4">{title}</h3>
                  <List
                    className={
                      ordered
                        ? "list-decimal space-y-1 pl-5"
                        : "list-disc space-y-1 pl-5"
                    }
                  >
                    {items.map((item) => (
                      <li key={item} className="pl-2">
                        {item}
                      </li>
                    ))}
                  </List>
                </div>
              );
            })}
          </div>
          {/* Decorative: the three blocks carry the meaning. Drawn 189x391.5 in
              the frame, so capped there rather than stretched to the column. */}
          <div className="flex justify-center">
            <img
              src="/images/advisory-pathway-figure.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full max-w-[189px] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
