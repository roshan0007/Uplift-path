"use client";

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import React from "react";
import { ChevronRight, KeyboardArrowDown } from "relume-icons";

/**
 * The two audiences are the whole information architecture of this site, so the
 * hero asks the visitor which one they are instead of making them read the nav.
 * Two cards, not three: "individual / couple / team" was floated, but only
 * /for-business-page and /for-individual-page exist — a third card would be a
 * dead link.
 */
const AUDIENCES = [
  {
    title: "For Businesses",
    description: "Consulting services for business growth.",
    href: "/for-business-page",
    image: "/images/for-business-page-benefits-section-3.jpg",
    alt: "A leadership team working through a plan together around a table",
  },
  {
    title: "For Individuals",
    description: "Peer coaching, mental health therapy and counseling.",
    href: "/for-individual-page",
    image: "/images/for-individual-page-benefits-section-0.jpg",
    alt: "A counselor and a client talking in a calm, everyday setting",
  },
];

export function Header104() {
  return (
    <section className="relative px-[5%] py-12 md:py-16 lg:py-16 scheme-1 badge-alt">
      <div className="container text-center">
        <h1 className="mb-5 text-[1.75rem] leading-[1.2] font-bold sm:text-[2.5rem] md:mb-6 md:text-[3.25rem] lg:text-[4.5rem]">
          Uplifting every life we serve
        </h1>
        <p className="mx-auto max-w-lg text-medium">
          Unlock progress and meaningful growth through clarity, collaboration
          and trusted guidance at every step.
        </p>

        <p className="mt-8 font-semibold">Where would you like to start?</p>

        <div className="mt-5 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 md:mt-6 md:gap-8">
          {AUDIENCES.map((audience, index) => (
            <motion.div
              key={audience.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <a href={audience.href} className="group block h-full">
                <Card className="flex h-full flex-col transition-colors duration-200 hover:bg-scheme-text/5">
                  <div className="aspect-[5/2] w-full min-h-0 border-b-2 border-scheme-border">
                    <img
                      src={audience.image}
                      alt={audience.alt}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-h5 font-bold">{audience.title}</h2>
                    <p className="mt-2">{audience.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 font-medium">
                      Start here
                      <ChevronRight className="size-5" />
                    </span>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Scroll cue. The audience selector ends near the fold, and without a
            cue the two cards read as the whole page. It is a real control, not
            decoration: it scrolls to the next section.

            Static, not animated. A bouncing or pulsing arrow is the usual
            treatment and this brand does not bounce, spring or scale anything —
            the only movement it gets is the standard link hover, which reduces
            opacity. */}
        <ScrollCue />
      </div>
    </section>
  );
}

function ScrollCue() {
  const handleClick = (event) => {
    event.preventDefault();
    const next = document.getElementById("uplift-pathways");
    if (!next) return;
    // `scrollIntoView` rather than a hash link: a hash would push a URL nobody
    // asked for into the address bar and the back button.
    next.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <div className="mt-10 flex justify-center md:mt-12">
      <button
        type="button"
        onClick={handleClick}
        aria-label="See what we do"
        className="inline-flex size-10 items-center justify-center opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100"
      >
        <KeyboardArrowDown className="size-8 text-scheme-text" />
      </button>
    </div>
  );
}
