"use client";

import { IntakeProgress } from "@/components/intake/intake-progress";
import { nextStep } from "@/components/intake/intake-steps";
import { ZohoFormSlot } from "@/components/intake/zoho-form-slot";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

/**
 * Step 1 of the individual intake flow: the Application form, as a modal over
 * whatever page the visitor is already on. The URL deliberately does not change
 * — someone who came to read about Peer Coaching should not lose the page they
 * were reading just to start an application.
 *
 * This replaces the "Get started" buttons on /for-individual-page that all used
 * to point at /contact-us. Anywhere on the individual side that offers to start
 * the process should render this rather than link somewhere.
 *
 * Composed from the Dialog primitive, not a new modal: Radix already gives the
 * focus trap, Escape-to-close, scroll lock, `aria-modal` and the labelling that
 * DialogTitle/DialogDescription wire up. Nothing in components/ui was changed.
 */
export function GetStartedButton({
  label = "Get Started",
  variant = "secondary",
  className = undefined,
  size = undefined,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title={label} variant={variant} size={size} className={className}>
          {label}
        </Button>
      </DialogTrigger>
      <ApplicationDialogContent />
    </Dialog>
  );
}

function ApplicationDialogContent() {
  const next = nextStep("application");

  return (
    // The portal drops this at <body>, outside every section, so the scheme
    // class has to travel with it or the card would render on unset colours.
    <DialogContent className="max-h-[90vh] w-[min(44rem,92vw)] overflow-y-auto rounded-card border-2 border-scheme-border bg-scheme-background p-6 text-scheme-text md:p-10 scheme-1 badge-alt">
      <IntakeProgress current="application" className="mb-8 md:mb-10" />
      <div className="mb-8 text-center md:mb-10">
        <DialogTitle asChild>
          <h2 className="mb-5 text-h3 font-bold md:mb-6">
            Find The Right Peer Coach For You
          </h2>
        </DialogTitle>
        <DialogDescription asChild>
          <p className="text-medium text-scheme-text">
            The details you share below are confidential and help our team make
            a thoughtful match with a Peer Coach who best fits your unique goals
            and needs.
          </p>
        </DialogDescription>
      </div>

      {/* ZOHO FORM EMBED SLOT — paste the Zoho iframe/script here, as children
          of <ZohoFormSlot>. Step: Application. Nothing else in this file needs
          to change; the "form loads here" placeholder disappears on its own once
          the slot has children. */}
      <ZohoFormSlot step="Application" />

      {/* TEMPORARY — remove once the Zoho form is embedded. The real handoff is
          the Application form's post-submit redirect, which should be set to
          /cmps. Until then this is how the flow stays walkable end to end. */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <Button asChild title={`Continue to ${next.label}`} variant="secondary">
          <a href={next.href}>Continue to {next.label}</a>
        </Button>
        <p className="text-small text-scheme-text/60">
          Temporary — the Zoho form will redirect here on submit.
        </p>
      </div>
    </DialogContent>
  );
}
