"use client";

import React from "react";
import { StarFull } from "relume-icons";

/**
 * One testimonial, not a carousel.
 *
 * The export shipped a two-slide carousel in which both slides were the same
 * invented quote from "Sarah Mitchell, Executive Director, Behavioral Health",
 * with a CloudFront placeholder avatar and a stock photo labelled
 * `alt="Webflow logo 1"`. We have exactly one real testimonial, so the carousel,
 * its arrows, its dots and both images are gone.
 *
 * The same file is still duplicated at `faq-for-test/testimonial-10.jsx` and
 * `page-20/testimonial-10.jsx`. Those are Relume scratch pages carrying
 * `robots: { index: false }` and were deliberately left untouched — they still
 * contain the fake testimonial.
 */
export function Testimonial10() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center text-center">
          <div className="mb-6 flex gap-1 md:mb-8">
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
          </div>
          <blockquote>
            {/* Still an <h5> inside the <blockquote>, as the export had it.
                globals.css binds Playfair Display to h1-h6 and nowhere else, so
                a <p> here would silently drop the quote to Lexend Deca and
                restyle a section this pass was not meant to restyle. */}
            <h5 className="text-h5 font-bold">
              {/* PLACEHOLDER — awaiting real testimonial copy from Kylie Smith.
                  Swap the sentence below for her actual words; the attribution
                  underneath is real and stays. */}
              "They gave us a plan we could actually follow, and stayed with us
              until our own team could run it without them."
            </h5>
          </blockquote>
          <div className="mt-6 md:mt-8">
            <p className="font-semibold">Kylie Smith</p>
            <p>Owner, LifeBridge Mentorship</p>
          </div>
        </div>
      </div>
    </section>
  );
}
