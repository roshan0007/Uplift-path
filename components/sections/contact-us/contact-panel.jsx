"use client";

import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";
import { Card } from "@/components/ui/card";
import React from "react";
import { Call, ChevronRight, LocationOn, Mail } from "relume-icons";

/**
 * The contact page, rebuilt.
 *
 * It replaces the export's two sections — a hand-built three-field form beside a
 * placeholder photo, then a second, longer hand-built form on the navy scheme,
 * both carrying Relume's invented details (hello@demositedesign.com, an address
 * in Sydney). Two competing forms on one page is a question the visitor should
 * not have to answer, and the real form is a Zoho embed anyway.
 *
 * So: one section, one column of real contact details beside one form slot. Most
 * of the site's CTAs land here, so it is the page that most needs to be short
 * and unambiguous.
 *
 * The details below are the real ones and are the only place they appear on the
 * site. If they change, they change here.
 */
const ADDRESS_LINES = ["Uplift Path Inc.", "20 E Broad Street, Suite 225", "Columbus, OH 43215"];

// One query string, three uses: the embedded map, the directions link, and the
// address label. Keeping them derived from the same value means the pin and the
// text can never disagree.
const MAP_QUERY = "20 E Broad St Suite 225, Columbus, OH 43215";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const DETAILS = [
  {
    Icon: Mail,
    label: "info@upliftpathinc.com",
    href: "mailto:info@upliftpathinc.com",
  },
  {
    Icon: Call,
    label: "+1 (513) 299-4553",
    href: "tel:+15132994553",
  },
];

export function ContactPanel() {
  return (
    <section className="px-[5%] py-14 md:py-16 lg:py-16 scheme-1 badge-alt">
      <div className="container">
        {/* Details left, form right — the arrangement people expect on a contact
            page, and the one that lets the heading sit with the details rather
            than as a full-width band above both columns, which would have pushed
            the form below the fold. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Card className="p-6 md:p-8">
              <p className="mb-3 font-semibold md:mb-4">Contact</p>
              <h1 className="mb-5 text-h2 font-bold md:mb-6">Get in touch</h1>
              <p className="text-medium">
                Tell us where you are and what is in the way. We read every
                message and come back with a next step, not a pitch.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 border-t border-scheme-border pt-6">
                {DETAILS.map(({ Icon, label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center gap-4 transition-opacity duration-200 ease-in-out hover:opacity-70"
                  >
                    <Icon className="size-6 flex-none text-scheme-text" />
                    <span>{label}</span>
                  </a>
                ))}
                {/* Not a link. The address has the map card below it and a
                    "Get directions" control on that card, so a second
                    destination here would be the same journey twice. */}
                <div className="flex items-start gap-4">
                  <LocationOn className="mt-0.5 size-6 flex-none text-scheme-text" />
                  <address className="not-italic">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </Card>

            {/* The map is deliberately small — an 11rem band rather than the
                half-page embed it replaces. It is orientation, not the content
                of the page; anyone who actually wants to navigate there uses the
                directions link under it, and keeping it short is what lets the
                whole page sit inside one screen. */}
            <Card className="flex flex-col">
              <iframe
                src={MAP_EMBED}
                title="Map showing Uplift Path Inc. at 20 E Broad Street, Suite 225, Columbus, OH"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-44 w-full border-0"
              />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 border-t-2 border-scheme-border p-4 font-medium transition-opacity duration-200 ease-in-out hover:opacity-70"
              >
                Get directions
                <ChevronRight className="size-5 text-scheme-text" />
              </a>
            </Card>
          </div>

          {/* ZOHO FORM EMBED SLOT — paste the Zoho iframe/script here, as
              children of <ZohoFormSlot>. Step: Contact. This is the contact
              form, not part of the intake funnel — it is a separate Zoho form.
              Nothing else in this file needs to change; the "form loads here"
              placeholder disappears on its own once the slot has children. */}
          {/* No height override needed. As a grid item it stretches to the
              row on desktop, and on mobile the component's own min-height
              keeps it from collapsing — `100%` would have resolved to
              `auto` there, since a single-column row has no definite
              height to take a percentage of. */}
          <ZohoFormSlot step="Contact" />
        </div>
      </div>
    </section>
  );
}
