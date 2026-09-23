import type { Metadata } from "next";
import React from "react";
import { StatusPanel } from "@/components/sections/status/status-panel";

// Noindex, and deliberately absent from `app/sitemap.ts`: a post-submit page
// has nothing to rank for, and someone landing on it from search has
// submitted nothing. `/thank-you` is the old site's URL, kept on purpose.
export const metadata: Metadata = {
  alternates: {
    canonical: "/thank-you",
  },
  title: "Thank You",
  description: "Your submission to Uplift Path is complete.",
  robots: { index: false, follow: true },
};

/**
 * Where a submitted form lands. The Zoho contact form's post-submit redirect
 * has to be pointed here inside Zoho — the embed is cross-origin, so nothing
 * on this side can send it.
 */
export default function Page() {
  return (
    <StatusPanel
      eyebrow="Thank You"
      title="Your Submission Is Complete"
      actions={[{ label: "Return to Home Page", href: "/" }]}
    >
      We have received your details. A member of our team will read them and
      be in touch soon with a next step.
    </StatusPanel>
  );
}
