import type { Metadata } from "next";
import React from "react";
import { Header01 } from "@/components/sections/marketing/header-01";
import { WhyNotAnAgency } from "@/components/sections/marketing/why-not-an-agency";
import { WhatWeDo } from "@/components/sections/marketing/what-we-do";
import { FirstEngagement } from "@/components/sections/marketing/first-engagement";
import { WhoItsFor } from "@/components/sections/marketing/who-its-for";
import { Faq1 } from "@/components/sections/marketing/faq-01";
import { Cta25 } from "@/components/sections/marketing/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/marketing",
  },
  title: {
    absolute: "Marketing for Behavioral Health Organizations | Uplift Path",
  },
  description:
    "HIPAA- and CARF-aware marketing for behavioral health providers and nonprofits. Positioning, local search, referral outreach and a compliance-safe review.",
};

export default function Page() {
  return (
    <div>
      <Header01 />
      <WhyNotAnAgency />
      <WhatWeDo />
      <FirstEngagement />
      <WhoItsFor />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
