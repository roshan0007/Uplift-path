"use client";

import { IntakeShell } from "@/components/intake/intake-shell";
import React from "react";
import { Close } from "relume-icons";

/**
 * Full-height page wrapper for intake steps 2-4.
 *
 * These routes sit outside the `(site)` route group, so they render no navbar
 * and no footer — the whole viewport is the form. The only way out is the close
 * control, which returns to the page the flow started from.
 *
 * `min-h-screen` rather than `h-screen`: the form embeds will be taller than the
 * viewport on a phone and the page has to grow to fit them.
 */
export function IntakePage({ step, title, intro, children }) {
  return (
    <section className="relative flex min-h-screen flex-col px-[5%] py-16 md:py-20 scheme-1 badge-alt">
      <CloseControl />
      <div className="container flex flex-1 flex-col justify-center">
        <IntakeShell step={step} title={title} intro={intro}>
          {children}
        </IntakeShell>
      </div>
    </section>
  );
}

/**
 * Leaving the funnel. It goes back to /for-individual-page rather than to the
 * browser's history: someone who landed on step 3 from an email link has no
 * history to go back to, and `history.back()` would strand them.
 */
function CloseControl() {
  return (
    <a
      href="/for-individual-page"
      aria-label="Close and return to For Individuals"
      title="Close"
      className="absolute top-6 right-[5%] z-10 inline-flex opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100 md:top-8"
    >
      <Close className="size-7 text-scheme-text" />
    </a>
  );
}
