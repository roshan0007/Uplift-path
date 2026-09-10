import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/for-individual-page/layout-134";
import { Layout504 } from "@/components/sections/for-individual-page/layout-504";
import { Layout395 } from "@/components/sections/for-individual-page/layout-395";
import { Timeline5 } from "@/components/sections/for-individual-page/timeline-05";
import { Faq1 } from "@/components/sections/for-individual-page/faq-01";
import { Cta25 } from "@/components/sections/for-individual-page/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/for-individual",
  },
  title: {
    absolute: "Telehealth Peer Support for Adults in Ohio | Uplift Path",
  },
  description:
    "Online counseling and peer support for adults across Ohio. Meet your Uplift Path provider by phone or video, on a schedule that fits around your life.",
};

export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout504 />
      <Layout395 />
      <Timeline5 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
