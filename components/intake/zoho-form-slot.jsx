"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * The empty container an intake form drops into.
 *
 * Every form in this flow is a Zoho form that is not embedded yet. Paste the
 * Zoho iframe or script as this component's children and the development
 * placeholder below disappears on its own — there is nothing to delete and no
 * flag to flip. That is the whole reason it takes `children` rather than being
 * four hard-coded boxes.
 *
 * The `minHeight` keeps the page from collapsing to nothing while the slot is
 * empty, and gives the embed a sensible box to land in.
 *
 * Solid 2px border and `rounded-card`, like every other card in this system. It
 * is deliberately not dashed: the brand has no dashed or dotted rules anywhere,
 * so a dashed "drop zone" would read as foreign even as a temporary state.
 */
export function ZohoFormSlot({
  step,
  minHeight = "26rem",
  className = undefined,
  children = undefined,
}) {
  return (
    <div
      data-zoho-slot={step}
      className={cn(
        "flex w-full flex-col rounded-card border-2 border-scheme-border p-6 md:p-8",
        className,
      )}
      style={{ minHeight }}
    >
      {children ?? <ZohoSlotPlaceholder step={step} />}
    </div>
  );
}

/**
 * Development-only state. Not reachable once a form is passed in as children.
 */
function ZohoSlotPlaceholder({ step }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="font-semibold">Form loads here</p>
      <p className="mt-2 max-w-sm text-small text-scheme-text/60">
        The {step} form is a Zoho form and has not been embedded yet. Pass the
        embed to this slot as children and this notice goes away.
      </p>
    </div>
  );
}
