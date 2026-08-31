import type { Metadata } from "next";
import React from "react";
import { ContactPanel } from "@/components/sections/contact-us/contact-panel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Uplift Path Inc. — Columbus, Ohio. Tell us where you are and what is in the way.",
};

/**
 * One section, not the export's two. The old page ran a hand-built three-field
 * form beside a placeholder photo, then a second and longer hand-built form
 * below it — two competing forms, both with invented contact details. Most of
 * the site's CTAs land here, so it is the page that most needs to be short and
 * unambiguous.
 */
export default function Page() {
  return (
    <div>
      <ContactPanel />
    </div>
  );
}
