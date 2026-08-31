"use client";

import { IntakeProgress } from "@/components/intake/intake-progress";
import React from "react";

/**
 * The intake heading, as one exported string because two components have to
 * apply it.
 *
 * The modal wraps this <h1> in Radix's DialogTitle with `asChild`, and Slot
 * concatenates the two className strings rather than resolving them — so
 * DialogTitle's own `text-lg leading-none font-semibold tracking-tight` sat
 * alongside `text-h2` and won on stylesheet order, rendering step 1's heading
 * visibly smaller than steps 2-4. Passing this same string to DialogTitle puts
 * it through `cn`, whose tailwind-merge drops the losers properly.
 *
 * The explicit leading and tracking are the h2 token's own values. They are here
 * only so DialogTitle's `leading-none` and `tracking-tight` have something to
 * conflict with — twMerge cannot drop a utility that nothing competes against.
 */
export const INTAKE_TITLE_CLASS =
  "mb-4 text-h2 leading-[var(--text-h2--line-height)] font-bold tracking-[var(--text-h2--letter-spacing)] md:mb-5";

/**
 * The inside of an intake screen: a step bar, the heading, and the form.
 *
 * Both surfaces render this — the Application modal (step 1) and the three
 * routes (steps 2-4) — so the four screens are the same screen with different
 * content in the middle. The only difference is what wraps it: a Dialog for step
 * 1, a full-height page for the rest.
 *
 * **The screen is exactly one viewport tall and never scrolls.** That is the
 * whole shape of this component: a fixed step bar at the top, then a region
 * that takes every remaining pixel and gives it to the form. The form is an
 * embedded Zoho iframe, and an iframe cannot report its own height across
 * origins — so rather than guess a height and let the page scroll past it, the
 * frame is handed a known box and scrolls inside itself. One scrollbar, in the
 * form, where the content actually is.
 *
 * Two columns from `lg` up, one below it. Stacked, the heading and intro eat
 * the height the form needs; beside it, the same words cost nothing and the
 * form gets the full column. This matters most on Consent, where the form is
 * the longest of the four — it is the reason the split exists.
 *
 * `leading` is the top-left control. The pages pass a Back link; the modal
 * passes nothing, because it has a ✕ of its own and closing is its way out.
 *
 * `TitleWrapper` / `IntroWrapper` exist for the modal. Radix needs the dialog's
 * accessible name to come from its own DialogTitle/DialogDescription, and the
 * alternative — a visually-hidden copy of both — would read the heading twice to
 * a screen reader. Passing the Radix components in with `asChild` lets them wrap
 * the very same <h1> and <p> the pages render, so there is one heading, in one
 * place, on all four screens.
 */
export function IntakeShell({
  step,
  title,
  intro,
  children,
  leading = null,
  TitleWrapper = React.Fragment,
  IntroWrapper = React.Fragment,
}) {
  return (
    <>
      {/* The step bar. `relative` so `leading` can sit at the content edge
          rather than the viewport edge — the 5% inline padding is on the
          section, and Back should line up with the heading below it, not with
          the screen. */}
      <header className="container relative flex shrink-0 items-center justify-center py-5 md:py-6">
        {leading}
        <IntakeProgress current={step} />
      </header>

      <div className="container grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-6 pb-6 md:gap-8 md:pb-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-14 lg:pb-10">
        <div className="text-center lg:self-center lg:text-left">
          <TitleWrapper>
            <h1 className={INTAKE_TITLE_CLASS}>{title}</h1>
          </TitleWrapper>
          <IntroWrapper>
            <p className="text-medium">{intro}</p>
          </IntroWrapper>
        </div>
        {/* The row's `minmax(0,1fr)` lets this shrink to whatever height is
            left over; `min-h-96` is the floor underneath that. A 24rem frame is
            about the least you can fill a form in, and on a screen too short to
            spare that much the row holds its floor and the page scrolls a
            little instead of handing the form a keyhole. */}
        <div className="min-h-96">{children}</div>
      </div>
    </>
  );
}
