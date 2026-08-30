import React from "react";
import { Layout134 } from "@/components/sections/for-business-page/layout-134";
import { ServicesList } from "@/components/sections/for-business-page/services-list";
import { Layout613 } from "@/components/sections/for-business-page/layout-613";
import { Timeline5 } from "@/components/sections/for-business-page/timeline-05";
import { Faq1 } from "@/components/sections/for-business-page/faq-01";
import { Cta25 } from "@/components/sections/for-business-page/cta-25";

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
