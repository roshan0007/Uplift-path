import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/advisory-services/layout-134";
import { Layout19 } from "@/components/sections/advisory-services/layout-19";
import { Layout374 } from "@/components/sections/advisory-services/layout-374";
import { Layout28 } from "@/components/sections/advisory-services/layout-28";
import { Faq1 } from "@/components/sections/advisory-services/faq-01";
import { Cta25 } from "@/components/sections/advisory-services/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/advisory-services",
  },
  title: {
    absolute: "Strategic & Operational Advisory Services | Uplift Path",
  },
  description:
    "Ohio business advisory services for behavioral health, nonprofit, education and startup teams. Get a strategic growth plan your team can actually execute.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout19 />
      <Layout374 />
      <Layout28 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
