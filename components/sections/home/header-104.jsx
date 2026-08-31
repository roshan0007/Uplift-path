"use client";

import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
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
    image: "/images/home-audience-for-business.png",
    alt: "An illustration of someone meeting their team over a video call",
  },
  {
    title: "For Individuals",
    description: "Peer coaching, mental health therapy and counseling.",
    href: "/for-individual-page",
    image: "/images/home-audience-for-individual.png",
    alt: "An illustration of two people reaching through their screens to embrace",
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
                  {/* `object-contain`, not cover: these are line illustrations
                      on a transparent ground, so cropping them to a 5:2 band
                      would cut the figures in half. They sit inside the band
                      with the card showing through instead. */}
                  <div className="aspect-[5/2] w-full min-h-0 border-b-2 border-scheme-border p-4">
                    <img
                      src={audience.image}
                      alt={audience.alt}
                      className="size-full object-contain"
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

            It retires as soon as the CARF strip below is on screen. The arrow
            only ever had one thing to say - "there is more below" - and once
            the visitor can see there is, leaving it up is just an arrow
            pointing at something they are already looking at.

            No bounce and no pulse. That is the usual treatment for a scroll
            cue and this brand does not bounce, spring or scale anything; it
            gets a fade and the standard link hover instead. */}
        <ScrollCue />
      </div>
    </section>
  );
}

function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const carf = document.getElementById("carf-trust-strip");
    if (!carf) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(carf);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
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
    // The row keeps its height whether or not the arrow is in it, so retiring
    // the cue does not shift the cards above it up the page.
    <div className="mt-10 flex h-10 justify-center md:mt-12">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={handleClick}
            aria-label="See what we do"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex size-10 items-center justify-center"
          >
            <KeyboardArrowDown className="size-8 text-scheme-text" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
