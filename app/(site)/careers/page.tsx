import type { Metadata } from "next";
import React from "react";
import { Layout134 } from "@/components/sections/career/layout-134";
import { Layout213 } from "@/components/sections/career/layout-213";
import { Layout237 } from "@/components/sections/career/layout-237";
import { Layout469 } from "@/components/sections/career/layout-469";
import { Layout359 } from "@/components/sections/career/layout-359";
import { Faq1 } from "@/components/sections/career/faq-01";
import { Cta25 } from "@/components/sections/career/cta-25";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/careers",
  },
  title: {
    absolute: "Behavioral Health Jobs Columbus Ohio | Uplift Path",
  },
  description:
    "Uplift Path hires for behavioral health and consulting roles based in Columbus, Ohio. Learn about our team, our values, and what it's like to work here.",
};

// Section order is the 2026-09-09 Figma's (frame `Career`): hero, Who we are,
// Our Core Values, Growth Acceleration, Why Uplift Path, FAQ, CTA. The export
// had Core Values last before the FAQ and ran 359 before 469.
export default function Page() {
  return (
    <div>
      <Layout134 />
      <Layout213 />
      <Layout237 />
      <Layout469 />
      <Layout359 />
      <Faq1 />
      <Cta25 />
    </div>
  );
}
