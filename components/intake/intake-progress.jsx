"use client";

import { INTAKE_STEPS, stepIndex } from "@/components/intake/intake-steps";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * The step indicator for the individual intake flow. One component, rendered on
 * all four steps — the modal and the three routes — so the four screens can
 * never disagree about where you are.
 *
 * States are drawn, not coloured in: a completed step is a filled disc, the
 * current one is an outlined disc with a semibold label, and the ones ahead sit
 * at reduced opacity of the same scheme text colour. No new tokens, no accent
 * fill — the brand's one loud colour is not a progress bar.
 *
 * Completed steps link back to their own screen so someone can correct an answer
 * without restarting. Step 1 is a modal and has no URL, so it never links.
 *
 * `›` is the brand's breadcrumb separator (see the design system's Content
 * fundamentals) and is `aria-hidden` here — the <ol> already carries the order.
 */
export function IntakeProgress({ current, className = undefined }) {
  const currentIndex = stepIndex(current);

  return (
    <nav aria-label="Intake steps" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-small md:gap-x-3">
        {INTAKE_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const linkable = isDone && step.href;

          const marker = (
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-small leading-none",
                isDone && "border-scheme-text bg-scheme-text text-scheme-background",
                isCurrent && "border-scheme-text text-scheme-text",
                !isDone && !isCurrent && "border-scheme-text/25 text-scheme-text/50",
              )}
            >
              {index + 1}
            </span>
          );

          // Below `md` only the current step keeps its label; the rest are
          // discs. Four labels and three separators wrap to three lines on a
          // phone, and on a screen that is exactly one viewport tall those two
          // extra lines come straight out of the form's height. The name is
          // still announced — `sr-only` carries it where the ink does not.
          const label = (
            <>
              <span
                className={cn(
                  isCurrent ? "font-semibold" : "hidden md:inline",
                  !isDone && !isCurrent && "text-scheme-text/50",
                )}
              >
                {step.label}
              </span>
              {!isCurrent && (
                <span className="sr-only md:hidden">{step.label}</span>
              )}
            </>
          );

          const inner = (
            <>
              {marker}
              {label}
              <span className="sr-only">
                {isDone ? " (completed)" : isCurrent ? " (current step)" : ""}
              </span>
            </>
          );

          return (
            <li key={step.id} className="flex items-center gap-x-2 md:gap-x-3">
              {linkable ? (
                <a
                  href={step.href}
                  className="flex items-center gap-2 transition-opacity duration-200 ease-in-out hover:opacity-70"
                  aria-current={undefined}
                >
                  {inner}
                </a>
              ) : (
                <span
                  className="flex items-center gap-2"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {inner}
                </span>
              )}
              {index < INTAKE_STEPS.length - 1 && (
                <span aria-hidden="true" className="text-scheme-text/40">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
