import type { Metadata } from "next";
import React from "react";
import { IntakePage } from "@/components/intake/intake-page";
import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";

// Step 2 of the individual intake funnel. Funnel screens are noindexed: they
// are mid-process, they say nothing useful to someone arriving from search, and
// an indexed eligibility form would strand people halfway into a flow they
// never started. Same treatment as faq-for-test and page-20.
export const metadata: Metadata = {
  title: "Eligibility",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <IntakePage
      step="eligibility"
      title="Check Your Eligibility For Peer Coaching"
      intro="Personalized Supportive Services are available to Ohio adults 18 and over with active Ohio Medicaid. The questions below confirm those basics, so we can tell you plainly where you stand before going any further."
    >
      {/* Zoho form: "CMPS". Its post-submit redirect has to be set to /booking
          inside Zoho — that redirect is the only handoff from step 2 to step 3. */}
      <ZohoFormSlot form="eligibility" />
    </IntakePage>
  );
}
