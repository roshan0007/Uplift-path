import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/compliance-support/layout-134";
import { Layout16 } from "@/components/sections/compliance-support/layout-16";
import { Layout615 } from "@/components/sections/compliance-support/layout-615";
import { Faq1 } from "@/components/sections/compliance-support/faq-01";
import { Cta25 } from "@/components/sections/compliance-support/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/compliance-support",
  },
  title: {
    absolute: "Healthcare Compliance Consultant in Ohio | Uplift Path",
  },
  description:
    "Compliance consultancy services for behavioral health providers in Ohio. Get audit ready with gap analysis, aligned policies and a practical corrective plan.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout16 />
      <Layout615 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
