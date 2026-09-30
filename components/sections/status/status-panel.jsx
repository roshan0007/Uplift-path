import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The thank-you page and the 404 page: a short centred message and a way
 * onward, on the homepage's `hero-fade` mint wash.
 *
 * Not the flat `.scheme-mint` band the contact page uses. On a page this short
 * the band ran straight into the footer's white logo band, and the hard mint
 * edge against white read as a mistake (raised 2026-09-24). `hero-fade` ends
 * on exactly `--color-white`, so the panel dissolves into the footer instead.
 * This reuses the existing sanctioned wash (`globals.css` [8]); it is not a
 * third gradient. The scheme is `.scheme-light`, so text and buttons resolve
 * as they do on white.
 *
 * Artwork is the 2026-09-30 frames' ("404 page" and "Thank you"), chosen with
 * `art`:
 *
 * - `"404"` puts the speech-bubble illustration between the eyebrow and the
 *   title, at its frame size of 504x327 (the file is 2x).
 * - `"thank-you"` hangs two line-drawn pairs of hands from the top corners,
 *   at their frame share of the 1440 width (397 and 458 of it). The frame
 *   bleeds the right pair 17px off the page; it is flush to the edge here, as
 *   the For Individual hero's collage was pulled in for the same reason. Each
 *   is also capped at `50vw - 290px`, which keeps 580px clear between them
 *   -- the 72px two-line title is 531px wide -- so below ~1300px they shrink
 *   rather than run into it. They are `lg:` only: below 992px they would be
 *   too small to read as drawings.
 *
 * Both are decorative, so `aria-hidden` and no alt text.
 *
 * `text-h1` for the title, as on every other route: `--font-weight-bold` is
 * 400, so size is the only signal of rank. `min-h-[60vh]` keeps the footer
 * from riding up into the middle of a tall screen on a page this short.
 *
 * No `"use client"`: nothing here is interactive, and `app/not-found.tsx`
 * renders it from a server component.
 */
export function StatusPanel({ eyebrow, title, children, actions, art }) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-light hero-fade badge-alt">
      {art === "thank-you" && (
        <div
          aria-hidden="true"
          className="pointer-events-none hidden select-none lg:block"
        >
          <img
            src="/images/status-thank-you-hands-heart.png"
            alt=""
            className="absolute top-0 left-0 w-[min(27.57%,calc(50vw-290px))]"
          />
          <img
            src="/images/status-thank-you-hands-flower.png"
            alt=""
            className="absolute top-0 right-0 w-[min(31.81%,calc(50vw-290px))]"
          />
        </div>
      )}
      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
        {art === "404" && (
          <img
            src="/images/status-404-speech-bubbles.png"
            alt=""
            aria-hidden="true"
            width={504}
            height={327}
            className="mx-auto mb-6 w-full max-w-[504px] md:mb-8"
          />
        )}
        <h1 className="mb-5 text-balance text-h1 font-bold md:mb-6">{title}</h1>
        <p className="text-medium">{children}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          {actions.map(({ label, href, variant }) => (
            <Button key={href} asChild title={label} variant={variant}>
              <a href={href}>{label}</a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
