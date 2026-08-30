"use client";

import { IntakeProgress } from "@/components/intake/intake-progress";
import { nextStep } from "@/components/intake/intake-steps";
import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The inside of an intake screen: step indicator, heading, then the form slot.
 *
 * Both surfaces render this — the Application modal (step 1) and the three
 * routes (steps 2-4) — so the four screens are the same screen with different
 * content in the middle. The only difference is what wraps it: a Dialog for step
 * 1, a full-height page for the rest.
 *
 * Neither surface shows the navbar or the footer. Once someone is filling in an
 * intake form, site chrome is a way out of the funnel rather than a convenience,
 * so the only navigation offered is the close control and the step indicator.
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
  TitleWrapper = React.Fragment,
  IntroWrapper = React.Fragment,
}) {
  const next = nextStep(step);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col">
      <IntakeProgress current={step} className="mb-10 md:mb-12" />
      <div className="mb-10 text-center md:mb-12">
        <TitleWrapper>
          <h1 className="mb-5 text-h2 font-bold md:mb-6">{title}</h1>
        </TitleWrapper>
        <IntroWrapper>
          <p className="text-medium">{intro}</p>
        </IntroWrapper>
      </div>
      {children}
      {next && <ContinueControl href={next.href} label={next.label} />}
    </div>
  );
}

/**
 * TEMPORARY — remove once the Zoho forms are embedded.
 *
 * The real handoff to the next step is the Zoho form's own submit/redirect: set
 * each form's post-submit redirect to the href named here and delete this
 * control. Until then this is how the flow stays walkable end to end, which the
 * brief requires of it before any form exists.
 */
function ContinueControl({ href, label }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 md:mt-10">
      <Button asChild title={`Continue to ${label}`} variant="secondary">
        <a href={href}>Continue to {label}</a>
      </Button>
      <p className="text-small text-scheme-text/60">
        Temporary — the Zoho form will redirect here on submit.
      </p>
    </div>
  );
}
