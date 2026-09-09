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
    // `bg-transparent` because the mint wash lives on the wrapper in
    // `app/(site)/page.tsx` and `scheme-1` would otherwise paint white over it.
    // The scheme class stays for its text, border and accent tokens.
    <section className="relative bg-transparent px-[5%] py-12 md:py-16 lg:pt-[3.6875rem] lg:pb-16 scheme-1 badge-alt">
      {/* The v3 Figma drops the two framing hand illustrations the previous
          pass had in the top corners, and with them the `lg:pt-60` that was
          only ever there to clear them - the heading now sits 59px below the
          navbar, which is `lg:pt-[3.6875rem]`. The assets are still in
          `public/images/` and are used by no page. */}
      <div className="relative container text-center">
        {/* Two lines by design, not by wrapping: the break after "Life" is in
            the Figma and holds at every width, so it is a <span> rather than a
            max-width left to chance. "Serve" is the italic. */}
        <h1 className="mb-5 text-[1.75rem] leading-[1.2] font-bold sm:text-[2.5rem] md:mb-6 md:text-[3.25rem] lg:mb-[0.625rem] lg:text-[4.375rem] lg:leading-[1.333]">
          Uplifting Every Life
          <span className="block">
            We <em className="font-heading-italic">Serve</em>
          </span>
        </h1>
        {/* Now the Figma's own line, at its measured 22px/1.21 and 839px
            measure. The previous pass had kept the old Relume sub-copy against
            the Figma, on the grounds that this reads as a pitch and that the
            CARF claim is already made properly by the TrustStrip below, where
            the seal links to CARF's provider listing as proof. That call was
            reversed deliberately for v3: the Figma is the source of truth for
            this page. The duplication with the strip below is real and is the
            design's choice - the strip is still what evidences the claim. */}
        {/* The measure is 856px, not the Figma's 839px. That frame sets this
            paragraph in Inter 22px, which is where the 839px comes from - but
            the navbar in the same frame correctly specifies Lexend Deca, so
            Inter here is an inconsistency in the design file rather than a v3
            type change, and body copy is Lexend Deca by brand rule. Lexend
            Deca is ~2.7% wider than Inter over this string and needs 846px to
            keep the Figma's break after "organizations"; at 839px it wraps to
            three lines and the whole hero shifts down. 856px holds the
            two-line composition with a little slack. */}
        <p className="mx-auto max-w-lg text-medium lg:max-w-[53.5rem] lg:text-[1.375rem] lg:leading-[1.21]">
          Uplift Path helps individuals find whole-person support and helps
          organizations build stronger programs.{" "}
          <strong className="font-semibold">CARF accredited.</strong> Based in
          Columbus, Ohio.
        </p>

        {/* Above the cards, not below. The Figma puts it underneath, where it
            reads as a caption on the pair the visitor has just looked at; asked
            for it as a lead-in instead, which is what it was before the v3
            pass — the question is put, then the two answers follow. This is a
            deliberate departure from the frame. */}
        <p className="mt-8 font-semibold lg:mt-10 lg:text-[1.375rem] lg:leading-[1.21]">
          Where would you like to start?
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 md:gap-8">
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
    <div className="mt-2 flex h-10 justify-center lg:mt-[1.375rem]">
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
