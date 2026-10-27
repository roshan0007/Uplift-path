import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/how-we-work/layout-134";
import { Layout365 } from "@/components/sections/how-we-work/layout-365";
import { Layout254 } from "@/components/sections/how-we-work/layout-254";
import { Faq1 } from "@/components/sections/how-we-work/faq-01";
import { Cta25 } from "@/components/sections/how-we-work/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
//
// The SEO workbook files this copy under `/our-culture`, which is the old
// site's name for this page — the sections here are the culture pillars and the
// six core values, so it is the same page under a different slug. The old URL
// 301s to this one in `public/_redirects`.
export const metadata: Metadata = {
  title: {
    absolute: "Our Culture at Uplift Path | Accountability and Growth",
  },
  description:
    "Uplift Path runs on accountability, psychological safety, transparency, and continuous improvement. See what it's actually like to work here.",
  alternates: {
    canonical: "/how-we-work",
  },
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout365 />
      <Layout254 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
