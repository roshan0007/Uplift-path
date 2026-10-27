import type { Metadata } from "next";
import React from "react";
import { IntakePage } from "@/components/intake/intake-page";
import { SessionScheduler } from "@/components/booking/session-scheduler";

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
      title="Choose A Time For Your Session"
      intro="Pick a slot that works with your week. Sessions run by phone or by video, so you can join from anywhere in Ohio."
    >
      {/* The one step that is not a Zoho form. Times come from, and bookings
          go to, Zoho Bookings via the uplift-api Worker — see
          lib/booking-api.js. */}
      <SessionScheduler />
    </IntakePage>
  );
}
