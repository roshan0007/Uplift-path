"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Matches the 2026-09-08 Figma (node 10214-103297, `Content` 10214:100220's
 * sibling at 336,188) as it stood - tagline 16/24 w600, heading 52/62.4
 * Playfair 400 at -0.52 tracking, body 18/27, button 140x44 at r12. Measured
 * against the reference render, nothing here needed moving.
 *
 * The one change is the heading element; see the comment on it.
 */
export function Layout134() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">How We Work</p>
        {/* The page's <h1>. It was an <h2>, which left `/how-we-work` with no
            h1 at all - the same defect the About Us pass fixed on its own
            hero. `text-h2` is kept: the frame draws this at 52/62.4, which is
            the h2 token, and the change is to the element, not the type. */}
        <h1 className="mb-5 text-h2 font-bold md:mb-6">
          A clear path to better outcomes starts here
        </h1>
        <p className="text-medium">
          When people rise and step forward with purpose, new pathways open
          before them, allowing meaningful growth and lasting progress to follow
          naturally.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button asChild title="Get Started" variant="secondary">
            <a href="/contact-us">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
