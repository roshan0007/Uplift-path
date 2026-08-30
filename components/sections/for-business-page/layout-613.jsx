"use client";

import React from "react";

export function Layout613() {
  return (
    // `id` added when /business-conusltation was merged in: this section is
    // where that page's content landed, so the navbar's "Business
    // Consultation" entry and the service card both deep-link to it.
    <section
      id="business-consulting"
      className="scroll-mt-20 px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt"
    >
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Our Business Consulting Services
          </h2>
          <p className="text-medium">
            Helping you build, structure, and grow your business.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-8">
          <div className="flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0">
            <div className="w-full shrink-0 grow-1 basis-1/4 overflow-hidden">
              <img
                src="/images/for-business-page-benefits-section-0.png"
                alt="Relume placeholder image"
                className="aspect-square size-full rounded-image object-cover"
              />
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <h3 className="text-h4 font-bold">
                  Program Development Consulting
                </h3>
              </div>
              <p>
                Design and refine evidence-based programs that align with your
                mission, meet community needs, and drive measurable impact to
                business.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0">
            <div className="w-full shrink-0 grow-1 basis-1/4 overflow-hidden">
              <img
                src="/images/for-business-page-benefits-section-1.png"
                alt="Relume placeholder image"
                className="aspect-square size-full rounded-image object-cover"
              />
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <h3 className="text-h4 font-bold">
                  Business Structuring Consulting
                </h3>
              </div>
              <p>
                Build a robust operational foundation with workflows, standard
                operating procedures, and compliance frameworks for your
                business needs.
              </p>
            </div>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 md:grid-cols-2 md:gap-16 md:border-t md:border-scheme-border md:py-8 lg:py-12">
          <div className="flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0">
            <div className="w-full shrink-0 grow-1 basis-1/4 overflow-hidden">
              <img
                src="/images/for-business-page-benefits-section-2.png"
                alt="Relume placeholder image"
                className="aspect-square size-full rounded-image object-cover"
              />
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <h3 className="text-h4 font-bold">
                  Accreditation Consulting Service
                </h3>
              </div>
              <p>
                Get expert guidance to prepare and navigate accreditation
                processes, ensuring your organization meets high industry
                standards.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-6 border-t border-scheme-border py-6 md:flex-row md:gap-8 md:border-none md:py-0">
            <div className="w-full shrink-0 grow-1 basis-1/4 overflow-hidden">
              <img
                src="/images/for-business-page-benefits-section-3.jpg"
                alt="Relume placeholder image"
                className="aspect-square size-full rounded-image object-cover"
              />
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <h3 className="text-h4 font-bold">
                  Business Growth Consultation
                </h3>
              </div>
              <p>
                Identify opportunities, optimize operations, and implement
                strategies to sustainably scale your services and expand your
                reach.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12" />
      </div>
    </section>
  );
}
