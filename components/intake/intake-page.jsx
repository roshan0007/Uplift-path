"use client";

import { IntakeShell } from "@/components/intake/intake-shell";
import { backHref } from "@/components/intake/intake-steps";
import React from "react";
import { ArrowBack } from "relume-icons";

/**
 * Full-height page wrapper for intake steps 2-4.
 *
 * These routes sit outside the `(site)` route group, so they render no navbar
 * and no footer — the whole viewport is the form. The only navigation offered
 * is the back control and the step indicator.
 *
 * `min-h-screen` rather than `h-screen`: the form embeds will be taller than the
 * viewport on a phone and the page has to grow to fit them.
 */
export function IntakePage({ step, title, intro, children }) {
  return (
    <section className="relative flex min-h-screen flex-col px-[5%] py-16 md:py-20 scheme-1 badge-alt">
      <BackControl step={step} />
      <div className="container flex flex-1 flex-col justify-center">
        <IntakeShell step={step} title={title} intro={intro}>
          {children}
        </IntakeShell>
      </div>
    </section>
  );
}

/**
 * Back, not a close ✕.
 *
 * These are pages, not the modal — there is nothing overlaid to dismiss, so a ✕
 * was describing the wrong action. Back goes to the previous step, which is what
 * someone who wants to change an earlier answer is actually after.
 *
 * It is a real link rather than `history.back()`: someone who landed on step 3
 * from an email has no history to go back to, and the browser would strand them.
 */
function BackControl({ step }) {
  return (
    <a
      href={backHref(step)}
      className="absolute top-6 left-[5%] z-10 inline-flex items-center gap-1 font-medium opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100 md:top-8"
    >
      <ArrowBack className="size-5 text-scheme-text" />
      Back
    </a>
  );
}
