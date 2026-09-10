import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/resource-assistance/layout-134";
import { Layout491 } from "@/components/sections/resource-assistance/layout-491";
import { Faq1 } from "@/components/sections/resource-assistance/faq-01";
import { Cta25 } from "@/components/sections/resource-assistance/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/resource-assistance",
  },
  title: {
    absolute: "Grant Writing & Medicaid Enrollment Support Ohio | Uplift Path",
  },
  description:
    "Funding, Medicaid enrollment and credentialing support for Ohio behavioral health and nonprofit teams. Eligible-opportunity shortlists and renewal tracking.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout491 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
