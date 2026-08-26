"use client"

import React from "react";
import { Layout422 } from "@/components/home/layout-422";
import { Layout423 } from "@/components/home/layout-423";
import { Comparison9 } from "@/components/home/comparison-09";
import { Testimonial10 } from "@/components/home/testimonial-10";
import { Faq1 } from "@/components/home/faq-01";
import { Cta40 } from "@/components/home/cta-40";


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
