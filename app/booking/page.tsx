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
      title="Choose A Time For Your First Session"
      intro="Pick a slot that works with your week. First sessions run by phone or by video, so you can join from anywhere in Ohio."
    >
      {/* The one step that is not a Zoho form. The scheduler is interface only:
          the dates and times it offers are generated, not fetched. See the
          header comment in session-scheduler.jsx for the two functions that
          get replaced when Zoho Bookings is wired up. */}
      <SessionScheduler />
    </IntakePage>
  );
}
