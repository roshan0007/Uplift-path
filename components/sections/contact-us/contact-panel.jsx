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
            {/* `text-h1`, not `text-h2`. Every section heading on this route is
                `text-h2` -- 40px at 375, 52px at 1440 -- and so was the page
                title, which made the h1 the joint-largest heading rather than the
                largest. Weight cannot recover the rank here: `--font-weight-bold`
                is 400 on purpose, so size is the only signal available. One token
                step up is 44px / 72px, which clears every h2 at both widths. The
                lg step is 20px over the frame's 52, and that is the deliberate
                trade -- the frame giving the h1 and the h2 the same size is
                exactly the finding. Same resolution as the homepage h1.

    `text-balance` is what makes 44px survive a 338px measure: these
    titles run to three and four lines on a phone at the new size, and
    without it the last line orphans a single word. It is inert on the
    one-line titles and at lg, so it only acts where the wrap is real. */}
            <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">Start here</h1>
            <p className="text-medium">
              Whether you are an organization looking for consulting or an
              individual looking for support, this is the place to begin. We read
              every message and reply with a next step, not a pitch.
            </p>

            {/* Label in the gutter, value beside it. A definition list is what
                this actually is, and the hairline rules are the same 1px the
                footer divider and the accordion use. */}
            {/* `mt-12` (48px), not `mt-8 md:mt-10`. The rows inside this list
                are 32px apart (`py-4` top and bottom), so a 32px gap above it
                made the lead paragraph, the contact block and the map read as
                one evenly spaced column instead of three groups. The gap around
                a group has to beat the gap inside it. */}
            <dl className="mt-12 border-t border-scheme-border">
              <DetailRow label="Email">
                {/* `-my-3 inline-block py-3` makes the hit area 44px (20px of
                    text plus 12px each side) without moving anything: the
                    negative margin gives back exactly what the padding takes.
                    The row's `py-4` was on the row, not the anchor, so none of
                    it was clickable and this was a 20px target. */}
                <a
                  href="mailto:info@upliftpathinc.com"
                  className="-my-3 inline-block py-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  info@upliftpathinc.com
                </a>
              </DetailRow>
              <DetailRow label="Phone">
                {/* Same 44px treatment. This one is a `tel:` link whose only
                    real audience is a phone, and it was the smallest target on
                    the page. */}
                <a
                  href="tel:+15132994553"
                  className="-my-3 inline-block py-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
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
            {/* `mt-12` to match the gap above the list - same grouping fix. */}
            <div className="mt-12 overflow-hidden rounded-image border-2 border-scheme-border">
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
              /* `mt-1.5 ... py-2.5` is a 44px target that keeps the 16px
                 visual gap under the map (6px margin + 10px padding), and
                 `font-medium` is gone. At weight 500 plus an underline this
                 was the heaviest non-eyebrow text in the column - louder than
                 the email and phone links it is supplementary to. Weight is
                 not available as emphasis in this brand anyway
                 (`--font-weight-bold` is 400), so a stray 500 on a tertiary
                 link reads as the loudest thing on the page. The underline and
                 the chevron are already the affordance. */
              className="mt-1.5 inline-flex items-center gap-1 py-2.5 underline transition-opacity duration-200 ease-in-out hover:opacity-70"
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
                provides both. Nothing scrolls inside the card — this page
                scrolls normally, and an inner scrollbar beside an outer one
                would be one too many.

                **The height has to be a ladder, not a constant.** It was a flat
                `h-[58rem]` (928px) described as "the whole form measured at this
                width", and that was true at one width only. The form is a fixed
                set of fields reflowing in whatever column it is given, so its
                height is a curve against that column, measured:

                  column  236   286   312   373   460   528   589   610
                  height 1241  1130  1073  1016   958   900   869   870

                At 928px the Submit button — the one control this page exists to
                reach — was BELOW the frame's bottom edge at every width up to
                about 480px: 202px below it at 375, 313px at 320. Reachable only
                by scrolling inside a cross-origin iframe, which is the exact
                thing the paragraph above says we are avoiding.

                The column is not monotonic with the viewport, which is why the
                `lg` step goes back UP. Below 992 the card is full-width and the
                column only widens (610px at 768). At 992 the grid becomes
                `0.85fr_1fr` and the form column snaps back to 373px — narrower
                than it was at `md` — then widens again to 589px by 1440. So the
                ladder is 78 / 64 / 55 / 64 rem, each step sized off the
                NARROWEST viewport in its own range plus a few px of slack:

                  base   320-479   worst 236px wide -> 1241  -> 78rem = 1248
                  sm     480-767   worst 384px wide -> ~1010 -> 64rem = 1024
                  md     768-991   worst 610px wide ->  870  -> 55rem =  880
                  lg     992-1199  worst 373px wide -> 1016  -> 64rem = 1024
                  1200-1279        worst 474px wide -> ~952  -> 60rem =  960
                  1280-1399        worst 513px wide -> ~910  -> 58rem =  928
                  1400+            column caps 589  ->  869  -> 55rem =  880

                The top three are arbitrary `min-[...]` variants rather than
                breakpoints because this project defines only sm/md/lg (480/
                768/992) and has no `xl`. They are needed because the container
                keeps widening past `lg` until it caps at 1400px, and a single
                `lg` value sized for the 992 worst case would leave ~155px of
                dead white inside a 2px bordered card at 1440 — worse than the
                59px the flat value had. These are one-off steps tracing a
                measured curve, not new breakpoints for the design system.

                Every step is the narrowest viewport in its own range plus a
                little slack, so the Submit button is inside the frame at every
                width and the worst dead space is ~50px instead of 313px of
                clipping. Re-measure if the Zoho form's fields ever change. */}
            <ZohoFormSlot
              form="contact"
              className="h-[78rem] sm:h-[64rem] md:h-[55rem] lg:h-[64rem] min-[1200px]:h-[60rem] min-[1280px]:h-[58rem] min-[1400px]:h-[55rem] rounded-none border-0"
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
