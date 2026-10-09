import type { Metadata } from "next";
import React from "react";
import { CancelAppointment } from "@/components/booking/manage-booking";

// The cancel link the booking Worker writes onto a client's CRM record. It is
// personal to one booking, so it is noindexed and kept out of the sitemap.
export const metadata: Metadata = {
  title: "Cancel Appointment",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelAppointment />;
}
