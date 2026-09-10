import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/for-business-page/layout-134";
import { ServicesList } from "@/components/sections/for-business-page/services-list";
import { Layout613 } from "@/components/sections/for-business-page/layout-613";
import { Timeline5 } from "@/components/sections/for-business-page/timeline-05";
import { Faq1 } from "@/components/sections/for-business-page/faq-01";
import { Cta25 } from "@/components/sections/for-business-page/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  title: {
    absolute: "Behavioral Health Business Consulting Ohio | Uplift Path",
  },
  description:
    "Uplift Path advises behavioral health organizations on operations, program development, and business structuring. Let's map out what your organization needs.",
};

/**
 * The merged business page. `/business-conusltation` used to be a second,
 * overlapping page; it now 301s here (see `public/_redirects`) and its content
 * lives in `layout-613` (the four consulting service lines) and `timeline-05`
 * (the engagement journey, which replaced both pages' broken `layout-486`).
 *
 * Dropped as redundant in the merge: `layout-237` and `layout-237_1` — generic
 * three-up icon grids whose content the service list and the timeline now cover
 * properly.
 */
export default function Page() {
  return (
    <div>
      <Layout134 />
      <ServicesList />
      <Layout613 />
      <Timeline5 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
