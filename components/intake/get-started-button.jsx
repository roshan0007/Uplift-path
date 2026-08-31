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
    //
    // `overflow-y-auto` is the modal's version of steps 2-4's `min-h-dvh`.
    // Normally nothing scrolls here — the frame takes the height that is left
    // and scrolls inside itself — but the panel is pinned to the viewport by
    // `inset-0` and cannot grow, so on a screen too short for the form's 24rem
    // floor this is what stops the bottom of the form being unreachable.
    //
    // `py-0` matters more than it looks. The primitive's base class carries
    // `p-6`, and `px-[5%]` only replaces the horizontal half of it — the 24px
    // top and bottom survived, pushing the step bar down and costing the form
    // 48px of height that steps 2-4 keep. With it gone this screen and the
    // three routes are the same geometry to the pixel.
    //
    // The ✕ then sits at `top-5` to line up with the step bar IntakeShell
    // renders, which is vertically centred at 32px.
    <DialogContent
      closeIconPosition="inside"
      closeIconClassName="top-5 right-[5%] opacity-60 hover:opacity-100"
      // The form rises into place rather than replacing the page in one frame.
      // The overlay behind it is already fading (the primitive does that), so
      // the panel gets 300ms of fade plus a short lift from the bottom edge --
      // the same opacity-and-small-y-translate the rest of the site reveals
      // with, and no scale, which this brand does not do. Closing is quicker:
      // 200ms, because leaving should not be something you wait through.
      className="inset-0 flex h-auto w-auto max-w-none translate-x-0 translate-y-0 flex-col overflow-y-auto rounded-none border-0 bg-scheme-background px-[5%] py-0 text-scheme-text duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 scheme-1 badge-alt"
    >
      <IntakeShell
        step="application"
        title="Find The Right Peer Coach For You"
        intro="The details you share below are confidential and help our team make a thoughtful match with a Peer Coach who best fits your unique goals and needs."
        TitleWrapper={DialogTitleSlot}
        IntroWrapper={DialogDescriptionSlot}
      >
        {/* Zoho form: "Find the Right Peer Coach for You". Its post-submit
            redirect has to be set to /cmps inside Zoho — that redirect is the
            only handoff from step 1 to step 2. */}
        <ZohoFormSlot form="application" />
      </IntakeShell>
    </DialogContent>
  );
}
