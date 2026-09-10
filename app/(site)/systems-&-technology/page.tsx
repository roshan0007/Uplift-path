import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/systems-&-technology/layout-134";
import { Layout564 } from "@/components/sections/systems-&-technology/layout-564";
import { Timeline5 } from "@/components/sections/systems-&-technology/timeline-05";
import { Faq1 } from "@/components/sections/systems-&-technology/faq-01";
import { Cta25 } from "@/components/sections/systems-&-technology/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  title: {
    absolute: "Digital Transformation Consultant in Ohio | Uplift Path",
  },
  description:
    "Business systems and process automation consulting for Ohio organizations. Streamline work processes, cut duplicate data entry, and keep the tools you own.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout564 />
      <Timeline5 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
