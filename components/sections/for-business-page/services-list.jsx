"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BUSINESS_SERVICES, iconUrl } from "@/lib/services";
import React from "react";
import { ChevronRight } from "relume-icons";

/**
 * The full business service list. Added when `/business-conusltation` was
 * merged into this page: this is now the one place an organization can see
 * everything we offer them and get to each service page.
 *
 * The copy comes from `lib/services.js`, the same array the navbar's mega-menu
 * renders, so the menu and the page cannot say different things. Peer Coaching
 * is deliberately not here — it is the individual offering and lives on
 * /for-individual-page.
 *
 * The Business Consultation entry points at `#business-consulting` on this
 * page, which is where the old /business-conusltation content landed.
 */
export function ServicesList() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-12 lg:mb-12">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Everything under one roof
          </h2>
          <p className="text-medium">
            We help organizations set clear goals, streamline workflows, and
            stay compliant so your practice can grow while staying true to its
            mission.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {BUSINESS_SERVICES.map((service) => (
            <Card key={service.href} className="flex flex-col p-6 md:p-8">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12 text-scheme-text"
                  src={iconUrl(service.icon)}
                  alt=""
                />
              </div>
              <h3 className="mb-3 text-h4 font-bold md:mb-4">
                {service.label}
              </h3>
              <p className="flex-1">{service.description}</p>
              <div className="mt-5 md:mt-6">
                <Button
                  asChild
                  title="Learn more"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight className="text-scheme-text" />}
                >
                  <a href={service.href}>Learn more</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
