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
 * Interim design for the 404. It was raised in the 2026-09-21 QA review as
 * needing a proper design (Anushka), so this is the on-brand placeholder
 * until that lands; the thank-you page can move with it.
 *
 * `text-h1` for the title, as on every other route: `--font-weight-bold` is
 * 400, so size is the only signal of rank. `min-h-[60vh]` keeps the footer
 * from riding up into the middle of a tall screen on a page this short.
 *
 * No `"use client"`: nothing here is interactive, and `app/not-found.tsx`
 * renders it from a server component.
 */
export function StatusPanel({ eyebrow, title, children, actions }) {
  return (
    <section className="flex min-h-[60vh] items-center px-[5%] py-16 md:py-24 lg:py-28 scheme-light hero-fade badge-alt">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
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
