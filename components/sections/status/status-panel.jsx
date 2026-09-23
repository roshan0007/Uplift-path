import { Button } from "@/components/ui/button";
import React from "react";

/**
 * The thank-you page and the 404 page: a short centred message and a way
 * onward, on `.scheme-mint` — the same "you have arrived somewhere" band the
 * contact page uses, between the white navbar and the white footer.
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
    <section className="flex min-h-[60vh] items-center px-[5%] py-16 md:py-24 lg:py-28 scheme-mint badge-alt">
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
