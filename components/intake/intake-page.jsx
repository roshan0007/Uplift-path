"use client";

import { IntakeProgress } from "@/components/intake/intake-progress";
import { nextStep } from "@/components/intake/intake-steps";
import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The shared shell for intake steps 2-4. One scheme class on the section, the
 * step indicator, the heading, then whatever the step puts in the middle.
 *
 * These are funnel screens, not marketing pages — no hero image, no CTA banner,
 * nothing below the fold but the form. The navbar and footer still come from
 * app/layout.tsx like any other route.
 */
export function IntakePage({ step, title, intro, children }) {
  const next = nextStep(step);

  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container max-w-lg">
        <IntakeProgress current={step} className="mb-10 md:mb-12" />
        <div className="mb-10 text-center md:mb-12">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">{title}</h1>
          <p className="text-medium">{intro}</p>
        </div>
        {children}
        {next && <ContinueControl href={next.href} label={next.label} />}
      </div>
    </section>
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
