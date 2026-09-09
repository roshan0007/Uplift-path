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
      {/* The v3 Figma's pale mint wash runs from the navbar's bottom edge down
          to the green band, which is these three sections and no more - so it
          lives on a wrapper rather than on any one of them. The sections keep
          `scheme-1` for their text and border colours but no longer paint
          their own white background over it; see `hero-fade` in globals.css
          for how the stops were derived. */}
      <div className="hero-fade">
        <Header104 />
        <TrustStrip />
        <Layout423 />
      </div>
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
