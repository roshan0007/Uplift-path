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
        <div className="mx-auto mb-10 w-full max-w-lg text-center md:mb-12">
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
            <Card key={service.href} className="flex gap-x-4 p-6">
              {/* Icon beside the title rather than stacked above it. Six cards
                  in a 3-up grid is two rows, and the stacked version put the
                  section at 1096px -- past the 900px single-screen ceiling the
                  rest of the site was brought under. This is also the layout
                  the navbar's mega-menu uses for the same six items. */}
              <img
                className="mt-1 size-8 shrink-0 text-scheme-text"
                src={iconUrl(service.icon)}
                alt=""
              />
              <div className="flex flex-1 flex-col">
                <h3 className="mb-2 text-h5 font-bold">{service.label}</h3>
                <p className="flex-1">{service.description}</p>
                <div className="mt-4">
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
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
