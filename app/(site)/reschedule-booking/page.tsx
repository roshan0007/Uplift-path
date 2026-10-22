import type { Metadata } from "next";
import React from "react";
import { RescheduleBooking } from "@/components/booking/manage-booking";

// The reschedule link the booking Worker writes onto a client's CRM record.
// Personal to one booking, so noindexed and kept out of the sitemap.
export const metadata: Metadata = {
  title: "Reschedule Appointment",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RescheduleBooking />;
}
