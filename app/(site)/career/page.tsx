import React from "react";
import { Layout134 } from "@/components/sections/career/layout-134";
import { Layout213 } from "@/components/sections/career/layout-213";
import { Layout237 } from "@/components/sections/career/layout-237";
import { Layout469 } from "@/components/sections/career/layout-469";
import { Layout359 } from "@/components/sections/career/layout-359";
import { Faq1 } from "@/components/sections/career/faq-01";
import { Cta25 } from "@/components/sections/career/cta-25";

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
