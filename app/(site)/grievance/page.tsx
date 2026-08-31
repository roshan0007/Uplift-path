import type { Metadata } from "next";
import React from "react";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";
import {
  CONTENT,
  TITLE,
  UPDATED,
} from "@/components/sections/legal/grievance.content";

export const metadata: Metadata = {
  title: "Grievance Form",
  description:
    "File a grievance with Uplift Path Inc. All grievances are handled with fairness and confidentiality, and filing one will not affect your services.",
};

/**
 * A new route. The footer has always carried a "Grievance" link and it has
 * always pointed at "#" — there was no page behind it, here or in the Relume
 * export. The live site does have one, with its own Zoho form, and this is it:
 * the same copy, the same form, in this brand.
 *
 * The form is longer than the copy beside it, so this page hands it the whole
 * right-hand column rather than tucking it under the text.
 */
export default function Page() {
  return (
    <LegalPage title={TITLE} updated={UPDATED} content={CONTENT}>
      {/* Zoho form: "Merged Grievance Form" — the same embed the live site
          uses. Measured 698px; 50rem leaves room for validation messages. */}
      <ZohoFormSlot
        form="grievance"
        className="mt-10 h-[50rem] md:mt-12"
      />
    </LegalPage>
  );
}
