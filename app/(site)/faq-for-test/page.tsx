import type { Metadata } from "next";
import React from "react";
import { Faq1 } from "@/components/sections/faq-for-test/faq-01";
import { Testimonial10 } from "@/components/sections/faq-for-test/testimonial-10";

// Relume scratch page - kept so its live URL does not start 404ing.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div>
      <Faq1 />
      <Testimonial10 />
    </div>
  );
}
