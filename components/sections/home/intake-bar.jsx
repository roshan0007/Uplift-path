"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { Close } from "relume-icons";

/**
 * A sticky bar along the bottom of the homepage offering the individual intake
 * flow.
 *
 * Deliberate departure from the source, flagged: CLAUDE.md records that the
 * Relume export has no sticky CTAs and no floating buttons. This one was asked
 * for specifically. It is the only one on the site — do not read it as
 * permission for a second.
 *
 * It stays inside the brand otherwise. The green `.scheme-2` fill with dark text
 * is the approved pairing (white on the green is 1.96:1 and fails AA), the
 * button goes black-with-white-label through `.btn-dark` exactly as the CTA
 * banner does, and it slides in on opacity plus a small y-translate — no bounce,
 * no spring.
 *
 * Timing: it appears once "Uplift Outcomes Across Your Organization" is reached,
 * which is the point where a visitor has read what we do and is deciding whether
 * any of it is for them. It hides again when the page's own green CTA banner
 * arrives, so the two never stack, and it hides if the visitor scrolls back up
 * to the hero, where the audience selector is already asking the same question.
 */
export function IntakeBar() {
  const [pastTrigger, setPastTrigger] = useState(false);
  const [atFinalCta, setAtFinalCta] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById("uplift-outcomes");
    const finalCta = document.getElementById("home-cta");
    if (!trigger || !finalCta) return;

    // `isIntersecting || top < 0` rather than plain `isIntersecting`: the bar
    // should stay up for everything below the trigger section too, not only
    // while that one section happens to be on screen. The `top < 0` half is what
    // keeps it visible once the section has scrolled off the top, and what makes
    // it disappear again if the visitor scrolls back above it.
    const triggerObserver = new IntersectionObserver(
      ([entry]) =>
        setPastTrigger(
          entry.isIntersecting || entry.boundingClientRect.top < 0,
        ),
      // The bottom 35% of the viewport is cut off the root, so the section has
      // to climb past roughly two thirds of the screen before it counts as
      // reached. Without it the bar arrives on the first pixel of the section,
      // which in practice is while the visitor is still reading the section
      // above it.
      { threshold: 0, rootMargin: "0px 0px -35% 0px" },
    );
    const ctaObserver = new IntersectionObserver(
      ([entry]) => setAtFinalCta(entry.isIntersecting),
      { threshold: 0 },
    );

    triggerObserver.observe(trigger);
    ctaObserver.observe(finalCta);
    return () => {
      triggerObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const visible = pastTrigger && !atFinalCta && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-[900] px-[5%] pb-4 md:pb-6"
        >
          <div className="container">
            <div className="relative flex flex-col items-start gap-3 rounded-card border-2 border-scheme-border bg-scheme-background p-4 pr-11 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6 md:pr-14 scheme-2 btn-dark badge-alt">
              <div>
                {/* Kept short deliberately. On a 375px screen this bar covers
                    the bottom of the page, so every extra line of copy is
                    screen the visitor cannot read. */}
                <p className="font-semibold md:text-medium">
                  Looking for support for yourself?
                </p>
                <p className="mt-1 text-small">
                  Get matched with an Uplift Peer Coach — no cost with active
                  Ohio Medicaid.
                </p>
              </div>
              <div className="shrink-0">
                <GetStartedButton label="Get Started" variant="default" />
              </div>
              {/* Dismissible on purpose. A bar that follows you down the page
                  with no way to close it is the thing people complain about. */}
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="absolute top-3 right-3 inline-flex opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100 md:top-1/2 md:right-4 md:-translate-y-1/2"
              >
                <Close className="size-6 text-scheme-text" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
