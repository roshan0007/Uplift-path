"use client"

import React from "react";
import { Layout422 } from "@/components/sections/home/layout-422";
import { Layout423 } from "@/components/sections/home/layout-423";
import { Comparison9 } from "@/components/sections/home/comparison-09";
import { Testimonial10 } from "@/components/sections/home/testimonial-10";
import { Faq1 } from "@/components/sections/home/faq-01";
import { Cta40 } from "@/components/sections/home/cta-40";


export default function Page() {
  return (
    <div>
      <Layout422 />
      <Layout423 />
      <Comparison9 />
      <Testimonial10 />
      <Faq1 />
      <Cta40 />
    </div>
  );
}
