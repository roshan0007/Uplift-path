import type { Metadata } from "next";
import React from "react";
import { IntakePage } from "@/components/intake/intake-page";

// Step 3 of the individual intake funnel. Noindexed for the same reason as the
// other funnel screens.
export const metadata: Metadata = {
  title: "Scheduling",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <IntakePage
      step="scheduling"
      title="Choose A Time For Your First Session"
      intro="Pick a slot that works with your week. First sessions run by phone or by video, so you can join from anywhere in Ohio."
    >
      {/* CALENDAR — Zoho Bookings API integration pending.
          Heading and step indicator only for now, by design: this step gets a
          real calendar wired to Zoho Bookings, not a Zoho form, so there is no
          embed slot here to fill. Replace this whole block with the calendar. */}
      <div className="flex min-h-[26rem] w-full flex-col items-center justify-center rounded-card border-2 border-scheme-border p-6 text-center md:p-8">
        <p className="font-semibold">Calendar loads here</p>
        <p className="mt-2 max-w-sm text-small text-scheme-text/60">
          Session times come from Zoho Bookings. The API integration is still to
          be built.
        </p>
      </div>
    </IntakePage>
  );
}
