import type { Metadata } from "next";
import React from "react";
import { IntakePage } from "@/components/intake/intake-page";
import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";

// Step 4, the last step of the individual intake funnel. Noindexed for the same
// reason as the other funnel screens.
export const metadata: Metadata = {
  title: "Consent",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <IntakePage
      step="consent"
      title="Review And Sign Your Consent Form"
      intro="The last step. The form sets out what stays private, what we share and with whom, and what you can expect from your Peer Coach. Once it is signed, your first session is confirmed."
    >
      {/* ZOHO FORM EMBED SLOT — paste the Zoho iframe/script here, as children
          of <ZohoFormSlot>. Step: Consent. Nothing else in this file needs to
          change. This is the last step, so there is no continue control to
          remove — the form's own confirmation ends the flow. */}
      <ZohoFormSlot step="Consent" minHeight="32rem" />
    </IntakePage>
  );
}
