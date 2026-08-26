"use client";

import React from "react";

// Recovered from the design export. The Relume source wrapped each placeholder
// <img> in another <img> — invalid markup, replaced with <div> in all four cards.
// This is almost certainly why the React exporter excluded this component.
// Images are the four the design export assigns to this component in
// `assets.md` (For Business page / Benefits Section, 0–3), in the order listed
// there. Recovering the component cost it its images, so they are wired here.
const SERVICES = [
  {
    title: "Program Development Consulting",
    body: "Design and refine evidence-based programs that align with your mission, meet community needs, and drive measurable impact to business.",
    image: "/images/for-business-page-benefits-section-0.png",
  },
  {
    title: "Business Structuring Consulting",
    body: "Build a robust operational foundation with workflows, standard operating procedures, and compliance frameworks for your business needs.",
    image: "/images/for-business-page-benefits-section-1.png",
  },
  {
    title: "Accreditation Consulting Service",
    body: "Get expert guidance to prepare and navigate accreditation processes, ensuring your organization meets high industry standards.",
    image: "/images/for-business-page-benefits-section-2.png",
  },
  {
    title: "Business Growth Consultation",
    body: "Identify opportunities, optimize operations, and implement strategies to sustainably scale your services and expand your reach.",
    image: "/images/for-business-page-benefits-section-3.jpg",
  },
];

function ServiceCard({ title, body, image }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0">
      <div className="w-full shrink-0 grow-1 basis-1/4 overflow-hidden">
        <img
          src={image}
          alt=""
          className="aspect-square size-full rounded-image object-cover"
        />
      </div>
      <div>
        <div className="mb-3 md:mb-4">
          <h3 className="text-h4 font-bold">{title}</h3>
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
}

export function Layout613() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Align</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Our Business Consulting Services
          </h2>
          <p className="text-medium">
            Helping you build, structure, and grow your business.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-12">
          {SERVICES.slice(0, 2).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
        <div className="grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-12">
          {SERVICES.slice(2).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12" />
      </div>
    </section>
  );
}
