import type { Metadata } from "next";
import React from "react";
import { LegalPage } from "@/components/sections/legal/legal-page";
import {
  CONTENT,
  EFFECTIVE,
  TITLE,
  VERSION,
} from "@/components/sections/legal/nondiscrimination.content";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/nondiscrimination-and-language-access",
  },
  title: {
    absolute: "Nondiscrimination and Language Access Notice | Uplift Path, Inc.",
  },
  description:
    "Uplift Path, Inc. does not discriminate, and provides language assistance and auxiliary aids free of charge. How to ask for help and how to file a complaint.",
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
