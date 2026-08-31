"use client";

import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";
import { Card } from "@/components/ui/card";
import React from "react";
import { ChevronRight } from "relume-icons";

/**
 * The contact page.
 *
 * It replaces the export's two sections — a hand-built three-field form beside a
 * placeholder photo, then a second, longer hand-built form on the navy scheme,
 * both carrying Relume's invented details (hello@demositedesign.com, an address
 * in Sydney). Two competing forms on one page is a question the visitor should
 * not have to answer, and the real form is a Zoho embed anyway.
 *
 * Three deliberate choices about how it looks, none of them arbitrary:
 *
 * 1. It runs on `.scheme-mint`. The design system carries mint as a supporting
 *    tint for "washes and occasional full-bleed sections" and nothing on the
 *    site had used it. A single soft band between the white navbar and the white
 *    footer is what makes this read as somewhere you have arrived rather than
 *    another content page — and it is one scheme class on one section, so the
 *    rule still holds.
 * 2. The details are not in a box. They are hairline-ruled rows with the label
 *    in the gutter, which is the treatment the footer and the accordion already
 *    use. Two matching bordered cards side by side would have made the page look
 *    like a comparison table of two equal things, and the form is not equal to
 *    the phone number — it is the point of the page.
 * 3. The form is the only white surface. On the mint ground it is the one thing
 *    that steps forward, which is the whole hierarchy of the page in one move.
 *
 * The details below are the real ones and are the only place they appear on the
 * site. If they change, they change here.
 */
const ADDRESS_LINES = [
  "Uplift Path Inc.",
  "20 E Broad Street, Suite 225",
  "Columbus, OH 43215",
];

// One query string, two uses: the embedded map and the directions link. Derived
// from the same value so the pin and the link can never point at different
// places.
const MAP_QUERY = "20 E Broad St Suite 225, Columbus, OH 43215";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export function ContactPanel() {
  return (
    <section className="px-[5%] py-14 md:py-16 lg:py-16 scheme-mint badge-alt">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Contact</p>
            <h1 className="mb-5 text-h2 font-bold md:mb-6">Start here</h1>
            <p className="text-medium">
              Whether you are an organization looking for consulting or an
              individual looking for support, this is the place to begin. We read
              every message and reply with a next step, not a pitch.
            </p>

            {/* Label in the gutter, value beside it. A definition list is what
                this actually is, and the hairline rules are the same 1px the
                footer divider and the accordion use. */}
            <dl className="mt-8 border-t border-scheme-border md:mt-10">
              <DetailRow label="Email">
                <a
                  href="mailto:info@upliftpathinc.com"
                  className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  info@upliftpathinc.com
                </a>
              </DetailRow>
              <DetailRow label="Phone">
                <a
                  href="tel:+15132994553"
                  className="transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  +1 (513) 299-4553
                </a>
              </DetailRow>
              <DetailRow label="Office">
                <address className="not-italic">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </DetailRow>
            </dl>

            {/* A 10rem strip, not the half-page embed this replaces. The map is
                orientation — it says "downtown Columbus", and anyone actually
                travelling there uses the link beneath it. */}
            <div className="mt-8 overflow-hidden rounded-image border-2 border-scheme-border">
              <iframe
                src={MAP_EMBED}
                title="Map showing Uplift Path Inc. at 20 E Broad Street, Suite 225, Columbus, OH"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-40 w-full border-0"
              />
            </div>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-medium underline transition-opacity duration-200 ease-in-out hover:opacity-70"
            >
              Get directions
              <ChevronRight className="size-5 text-scheme-text" />
            </a>
          </div>

          {/* The one white surface on the page. `bg-white` rather than
              `bg-scheme-foreground`, which on this scheme is the mint itself and
              would leave the card invisible against its own section. */}
          <Card className="bg-white p-6 md:p-8">
            {/* No heading above the form. The Zoho form opens with its own
                "Contact Us" title and lead line, and a card heading on top of
                it said the same thing twice. */}
            {/* Zoho form: "Contact Us". Not part of the intake funnel — this is
                a separate form and there is no redirect to configure.

                Border and radius are dropped because the card around it already
                provides both. The height is the whole form measured at this
                width, so nothing scrolls inside the card — this page scrolls
                normally, and an inner scrollbar beside an outer one would be
                one too many. */}
            <ZohoFormSlot
              form="contact"
              className="h-[58rem] rounded-none border-0"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 border-b border-scheme-border py-4 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="w-16 shrink-0 text-small font-semibold">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
