"use client";

import { SymbolIcon } from "@/components/ui/symbol-icon";
import React from "react";

export function Layout254() {
  return (
    <section className="px-[5%] py-16 md:py-18 lg:py-18 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            {/* The v3 Figma drops the starburst cluster that used to sit
                above this heading; the section now opens on the heading
                itself. `home-audience-starburst.png` is unreferenced. */}
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Who <em className="font-heading-italic">We Work</em> With
            </h2>
            <p className="text-medium">
              Four kinds of organizations, and individuals. The approach adapts
              to what each one is accountable for.
            </p>
          </div>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-12">
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="psychology_alt"
                  className="size-12 text-caribbean-green-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Behavioral Health Consulting
              </h3>
              <p>
                We hold the CARF Gold Seal ourselves. We help providers build
                service models that last, get survey-ready, and hold quality
                steady while they grow.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="work"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Startups & Entrepreneurs
              </h3>
              <p>
                Pressure-test the business model, sharpen the positioning, and
                open doors that actually convert. For founders who need a second
                opinion they can trust.
              </p>
            </div>
          </div>
          <div className="relative order-last w-full sm:col-span-2 lg:order-none lg:col-span-1">
            {/* The v3 Figma replaces the speech-bubble line illustration with
                a photograph in a soft rounded-oval mask, with two 1px outlined
                rectangles offset behind it (`Group 4`). The mask, the offset
                outlines and the photo are baked into one asset exported from
                that group at 2x, flattened onto white - the outlines overhang
                the photo on two sides, so reproducing them as CSS borders
                would need two extra positioned elements to say the same
                thing, and the hand-drawn corner radii are not a CSS radius.

                Not `rounded-image`: the rounding is part of the asset. Its
                natural width is the Figma's own 507px. */}
            <img
              src="/images/home-audience-portrait.jpg"
              alt="A man listening during a conversation, wearing an earphone"
              className="mx-auto h-auto w-full max-w-[507px] select-none"
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-20 gap-y-10 md:gap-y-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="edit"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Educational Institutions
              </h3>
              <p>
                Improve operational performance and faculty engagement without
                adding administrative weight to the people who teach.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <SymbolIcon
                  name="partner_reports"
                  className="size-12 text-viking-dark"
                />
              </div>
              <h3 className="mb-3 text-h5 font-bold md:mb-4">
                Nonprofit Organizations
              </h3>
              <p>
                Clarify the mission on paper, diversify the funding model, and
                evidence community impact in the language funders accept.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
