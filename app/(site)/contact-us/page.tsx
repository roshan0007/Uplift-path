import type { Metadata } from "next";
import React from "react";
import { ContactPanel } from "@/components/sections/contact-us/contact-panel";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/contact-us",
  },
  title: {
    absolute: "Contact Uplift Path | Behavioral Health Consulting, Ohio",
  },
  description:
    "Reach Uplift Path for behavioral health and business consulting based in Columbus, Ohio. Send a message and a member of our team will follow up soon.",
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
