"use client";

import {
  INTAKE_TITLE_CLASS,
  IntakeShell,
} from "@/components/intake/intake-shell";
import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";
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
 * Step 1 of the individual intake flow: the Application form, as a full-screen
 * overlay on whatever page the visitor is already on. The URL deliberately does
 * not change — someone who came to read about Peer Coaching should not lose the
 * page they were reading just to start an application.
 *
 * It takes the whole viewport, with a close ✕ and no navbar or footer, so it
 * matches steps 2-4 exactly. The four screens should feel like one flow, and a
 * small centred card followed by three full pages does not.
 *
 * This replaces the "Get started" buttons on /for-individual-page that all used
 * to point at /contact-us. Anywhere on the individual side that offers to start
 * the process should render this rather than link somewhere.
 *
 * Composed from the Dialog primitive, not a new modal: Radix already gives the
 * focus trap, Escape-to-close, scroll lock, and the labelling that
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

/**
 * The same modal, controlled and with no trigger of its own.
 *
 * For callers that have to keep the dialog mounted independently of the thing
 * that opens it. The homepage's sticky intake bar is the case: the bar takes
 * itself off screen while the modal is up, and if the Dialog lived inside the
 * bar the bar's own exit would unmount the modal it had just opened.
 */
export function ApplicationDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ApplicationDialogContent />
    </Dialog>
  );
}

// Module scope, not inline in the JSX below: a component defined during render
// is a brand-new type every render and would remount the whole subtree — the
// same bug the navbar's ConditionalRenderedCard comment documents.
// The className is what makes step 1's heading match steps 2-4 — see the note
// on INTAKE_TITLE_CLASS. Without it DialogTitle's own `text-lg` survives the
// Slot merge and shrinks the heading.
const DialogTitleSlot = (props) => (
  <DialogTitle asChild className={INTAKE_TITLE_CLASS} {...props} />
);
const DialogDescriptionSlot = (props) => (
  <DialogDescription asChild {...props} />
);

function ApplicationDialogContent() {
  return (
    // Full-bleed. The primitive centres a `w-full` box on the viewport, so the
    // centring translate, the width and the radius are all overridden here.
    // `inset-0` does the sizing on its own — `w-screen`/`h-screen` would be
    // 100vw/100vh, and 100vw includes the scrollbar gutter that Radix's scroll
    // lock leaves behind, which shows up as a few pixels of horizontal overflow.
    //
    // `closeIconPosition="inside"` is required, not cosmetic. The default puts
    // the ✕ on the overlay, and the overlay is completely covered by a
    // full-screen panel, so the only close control would be underneath it.
    //
    // The portal drops this at <body>, outside every section, so the scheme
    // class has to travel with it or the panel would render on unset colours.
    <DialogContent
      closeIconPosition="inside"
      closeIconClassName="top-6 right-[5%] md:top-8 opacity-60 hover:opacity-100"
      className="inset-0 flex h-auto w-auto max-w-none translate-x-0 translate-y-0 flex-col overflow-y-auto rounded-none border-0 bg-scheme-background px-[5%] py-16 text-scheme-text md:py-20 scheme-1 badge-alt"
    >
      <div className="container flex flex-1 flex-col justify-center">
        <IntakeShell
          step="application"
          title="Find The Right Peer Coach For You"
          intro="The details you share below are confidential and help our team make a thoughtful match with a Peer Coach who best fits your unique goals and needs."
          TitleWrapper={DialogTitleSlot}
          IntroWrapper={DialogDescriptionSlot}
        >
          {/* ZOHO FORM EMBED SLOT — paste the Zoho iframe/script here, as
              children of <ZohoFormSlot>. Step: Application. Nothing else in this
              file needs to change; the "form loads here" placeholder disappears
              on its own once the slot has children. Set the form's post-submit
              redirect to /cmps and delete the temporary continue control in
              components/intake/intake-shell.jsx. */}
          <ZohoFormSlot step="Application" />
        </IntakeShell>
      </div>
    </DialogContent>
  );
}
