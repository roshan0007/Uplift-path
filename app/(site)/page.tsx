import React from "react";
import { Header104 } from "@/components/sections/home/header-104";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { Layout423 } from "@/components/sections/home/layout-423";
import { Layout237 } from "@/components/sections/home/layout-237";
import { Layout254 } from "@/components/sections/home/layout-254";
import { Testimonial10 } from "@/components/sections/home/testimonial-10";
import { Faq1 } from "@/components/sections/home/faq-01";
import { Cta25 } from "@/components/sections/home/cta-25";
import { IntakeBar } from "@/components/sections/home/intake-bar";

export default function Page() {
  return (
    <div>
      <Header104 />
      <TrustStrip />
      <Layout423 />
      <Layout237 />
      <Layout254 />
      <Testimonial10 />
      <Faq1 />
      <Cta25 />
      {/* Fixed-position, so it sits outside the section flow. */}
      <IntakeBar />
    </div>
  );
}
