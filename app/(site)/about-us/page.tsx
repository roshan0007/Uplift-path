import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/about-us/layout-134";
import { Layout237 } from "@/components/sections/about-us/layout-237";
import { Layout183 } from "@/components/sections/about-us/layout-183";
import { Team6 } from "@/components/sections/about-us/team-06";
import { Layout507 } from "@/components/sections/about-us/layout-507";
import { Layout54 } from "@/components/sections/about-us/layout-54";
import { Faq1 } from "@/components/sections/about-us/faq-01";
import { Cta25 } from "@/components/sections/about-us/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  title: {
    absolute: "About Uplift Path | CARF-Accredited Behavioral Health Firm",
  },
  description:
    "Our leadership team brings decades of combined experience in behavioral health, education, and business. Meet the people guiding your organization's next step.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout237 />
      <Layout183 />
      <Team6 />
      <Layout507 />
      <Layout54 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
