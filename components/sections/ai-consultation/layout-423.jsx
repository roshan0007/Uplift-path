"use client";

import { BackgroundCard } from "@/components/ui/card";
import React from "react";

/**
 * Matched to the 2026-09-09 Figma (frame `AI Consultancy`), which resolves a
 * real content bug: **the export shipped all three cards byte-identical.**
 * Every one of them was headed "AI strategy and implementation" with the same
 * body, so a section promising "a full suite of services" listed one service
 * three times. This is the same Relume duplication the How We Work pass found
 * in its three-pillar section. The frame draws each card with its own copy, and
 * that copy is what ships here.
 *
 * Two behaviours the export carried are gone, both because the frame draws the
 * cards static and because each was doing harm:
 *
 * - **The hover-to-expand.** The body copy and a "Learn more" link were hidden
 *   at `lg` until the pointer entered the card, and the card grew from 50% to
 *   70% width, squeezing its neighbours. The frame shows all three cards at
 *   equal width with the body always visible. Content that only exists on hover
 *   is also unreachable by keyboard and by touch.
 * - **The links.** All three cards linked to `/how-we-work` -- three different
 *   services pointing at one unrelated page. The frame gives them no
 *   destination and no "Learn more" affordance, so they are no longer links.
 *   If these services get their own routes, that is when they become links
 *   again.
 *
 * Geometry the frame draws: three equal 405-wide columns across the 1280
 * container with 32px gaps, each card 405x630 -- exactly the aspect of the
 * three photos already in the repo, which are the frame's own photos (compared
 * against the render: same images, differing only by the scrim and the crop).
 * Type is 16/24 weight 600 for the label, 36/46.8 Playfair for the heading and
 * 16/24 for the body, all existing tokens.
 *
 * **The cards are 405x470, not the frame's 405x630 — asked for.** Three 630px
 * cards in a row is 630px of one section spent on three photographs, and the
 * copy sits in the bottom quarter of each with a half-metre of empty scrim
 * above it. At 470 the type block still has its own room and the row reads as
 * three cards rather than three posters. The photos are all portrait with
 * their subject in the upper half, so the shorter box takes `object-top`
 * rather than the default centre — centred, the 470 crop cut heads off.
 */

const SERVICES = [
  {
    image: "/images/ai-consultation-services-section-0.png",
    title: "AI strategy and implementation",
    body: "We help you build a strong AI foundation with strategy, governance, and workforce-ready solutions.",
  },
  {
    image: "/images/ai-consultation-services-section-1.png",
    title: "AI Workforce Training",
    body: "AI training ensures your team has the skills to use new tools efficiently and drive growth.",
  },
  {
    image: "/images/ai-consultation-services-section-2.png",
    title: "Custom AI Solution Development",
    body: "Custom AI solutions for your unique challenges, including intelligent chatbots and automation tools.",
  },
];

export function Layout423() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-10 w-full max-w-lg text-center md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Our AI consulting and implementation services
          </h2>
          <p className="text-medium">
            We offer a full suite of services to guide your AI transformation
            from concept to completion.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {SERVICES.map((s) => (
            <BackgroundCard
              key={s.title}
              className="relative flex flex-col justify-end md:aspect-[405/470]"
            >
              {/* Decorative: the heading and body beside it carry the meaning. */}
              <img
                src={s.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover object-top"
              />
              {/* The frame darkens the whole photo so the white type holds. */}
              <div className="absolute inset-0 bg-neutral-darkest/50" />
              <div className="relative min-h-[18rem] p-6 md:min-h-0 md:p-7 flex flex-col justify-end">
                <p className="mb-2 font-semibold text-white">AI consulting</p>
                <h3 className="text-h4 font-bold text-white">{s.title}</h3>
                <p className="mt-4 text-white md:mt-5">{s.body}</p>
              </div>
            </BackgroundCard>
          ))}
        </div>
      </div>
    </section>
  );
}
