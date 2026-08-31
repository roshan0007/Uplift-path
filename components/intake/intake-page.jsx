"use client";

import { IntakeShell } from "@/components/intake/intake-shell";
import { backHref } from "@/components/intake/intake-steps";
import React from "react";
import { ArrowBack } from "relume-icons";

/**
 * Full-viewport wrapper for intake steps 2-4.
 *
 * These routes sit outside the `(site)` route group, so they render no navbar
 * and no footer — the whole viewport is the form.
 *
 * `min-h-dvh`, not `h-dvh`: the screen is the form, and the form is an iframe
 * that scrolls internally, so on any normal display the page itself has nothing
 * left to scroll — the step bar and the heading are fixed, and the frame takes
 * whatever is left over exactly.
 *
 * The `min-` is the escape hatch, and it earns its keep. On a short phone — a
 * 375x667 iPhone SE is the case that forced it — the step bar, a three-line
 * heading and the intro come to 264px, and a strict `h-dvh` left the consent
 * form a 275px keyhole to read a very long agreement through. The form now
 * carries a floor (see IntakeShell) and the page grows past the viewport
 * instead. Below about 700px of height you get roughly 100px of page scroll;
 * above it, none at all.
 *
 * `dvh` rather than `vh` because mobile browsers shrink the visible viewport as
 * their address bar comes and goes, and `vh` would leave the last of the form
 * under the chrome.
 */
export function IntakePage({ step, title, intro, children }) {
  return (
    <section className="flex min-h-dvh flex-col px-[5%] scheme-1 badge-alt">
      <IntakeShell
        step={step}
        title={title}
        intro={intro}
        leading={<BackControl step={step} />}
      >
        {children}
      </IntakeShell>
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
 *
 * The label hides below `sm`. On the narrowest phones the step bar and this
 * control share one row, and the arrow alone still says "back" — the accessible
 * name stays either way.
 */
function BackControl({ step }) {
  return (
    <a
      href={backHref(step)}
      className="absolute top-1/2 left-0 inline-flex -translate-y-1/2 items-center gap-1 font-medium opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100"
    >
      <ArrowBack className="size-5 text-scheme-text" />
      <span className="sr-only sm:not-sr-only">Back</span>
    </a>
  );
}
