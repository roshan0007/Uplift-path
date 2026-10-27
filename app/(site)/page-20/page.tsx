import type { Metadata } from "next";
import React from "react";
import { Testimonial10 } from "@/components/sections/page-20/testimonial-10";

// Relume scratch page - kept so its live URL does not start 404ing.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div>
      <Testimonial10 />
    </div>
  );
}
