import type { Metadata } from "next";
import React from "react";
import { LegalPage } from "@/components/sections/legal/legal-page";
import {
  CONTENT,
  TITLE,
  UPDATED,
} from "@/components/sections/legal/privacy-policy.content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Uplift Path Inc. collects, uses, discloses and safeguards information collected through this website, and how that differs from PHI under HIPAA.",
};

/**
 * The words on this page are the live ones from upliftpathwellness.com, moved
 * across verbatim. They replace the lorem ipsum the Relume export shipped as
 * this page's content-07 section, which is deleted.
 *
 * Content lives in its own module rather than inline JSX because it is data,
 * not markup — a legal team edits the text, nobody should have to read past
 * className strings to do it.
 */
export default function Page() {
  return <LegalPage title={TITLE} updated={UPDATED} content={CONTENT} />;
}
