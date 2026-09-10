import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/ai-consultation/layout-134";
import { Layout1 } from "@/components/sections/ai-consultation/layout-01";
import { Layout253 } from "@/components/sections/ai-consultation/layout-253";
import { Layout423 } from "@/components/sections/ai-consultation/layout-423";
import { Cta25 } from "@/components/sections/ai-consultation/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  title: {
    absolute: "AI Consulting Services for Behavioral Health | Uplift Path",
  },
  description:
    "Behavioral health organizations need AI built for their compliance rules, not generic software. Let Uplift Path build yours, from strategy to staff training.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout1 />
      <Layout253 />
      <Layout423 />
      <Cta25 />
    </div>
  );
}
