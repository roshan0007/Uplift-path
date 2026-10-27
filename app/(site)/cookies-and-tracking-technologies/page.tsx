import type { Metadata } from "next";
import React from "react";
import { LegalPage } from "@/components/sections/legal/legal-page";
import {
  CONTENT,
  EFFECTIVE,
  TITLE,
  VERSION,
} from "@/components/sections/legal/cookies-tracking.content";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/cookies-and-tracking-technologies",
  },
  title: {
    absolute: "Cookies and Tracking Technologies Notice | Uplift Path, Inc.",
  },
  description:
    "The cookies and tracking technologies used on upliftpathwellness.com, what each category does, and how to accept, decline or withdraw your choices.",
};

/**
 * The words on this page are Uplift Path's Oct 2026 notice, moved across
 * verbatim from the CRO's document (see the content module's header). Version and
 * effective date are legal facts and are shown exactly as the notice states them.
 */
export default function Page() {
  return (
    <LegalPage
      title={TITLE}
      version={VERSION}
      effective={EFFECTIVE}
      content={CONTENT}
    />
  );
}
