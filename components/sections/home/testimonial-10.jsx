"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { StarFull } from "relume-icons";

/**
 * The v3 Figma puts this section back to a carousel: two slides, arrows out at
 * the container edges, dots underneath. That structure is built here — but it
 * is driven off `TESTIMONIALS` rather than hand-written twice, and the arrows
 * and dots only render when there is more than one entry in it.
 *
 * That condition is doing real work, because the Figma's own two slides are
 * not shippable content. Slide one is "Sarah Mitchell, Executive Director,
 * Behavioral Health" behind a grey CloudFront placeholder avatar and a node
 * named "Placeholder Logo" that renders as a cropped stock photo of a man in a
 * suit; slide two is "James Chen, Founder, Digital Startup". Those are Relume
 * export fixtures and invented attributions, so none of them are here, and
 * neither image is — a trust signal that cites a person who has not said the
 * thing is worse than no trust signal.
 *
 * What we actually have is one real attribution whose words are still pending,
 * which is why `TESTIMONIALS` has one entry and the controls are therefore not
 * in the DOM. Add a second verified entry and the carousel the Figma draws
 * appears on its own, with no markup change here.
 *
 * The two Relume scratch pages, `faq-for-test/testimonial-10.jsx` and
 * `page-20/testimonial-10.jsx`, still carry the export's fake two-slide
 * version. They are `robots: { index: false }` and out of scope for this pass.
 */
const TESTIMONIALS = [
  {
    // PLACEHOLDER — awaiting real testimonial copy from Kylie Smith. Swap the
    // sentence below for her actual words; the attribution underneath is real
    // and stays. This is the last invented sentence on the homepage.
    quote:
      '"They gave us a plan we could actually follow, and stayed with us until our own team could run it without them."',
    name: "Kylie Smith",
    role: "Owner, LifeBridge Mentorship",
  },
];

export function Testimonial10() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const hasCarousel = TESTIMONIALS.length > 1;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start", watchDrag: hasCarousel }}
          className="overflow-hidden"
        >
          {/* The bottom padding is the dots' row. It collapses with them so a
              single testimonial does not sit above an empty 48px band. */}
          <div
            className={`relative lg:px-8 ${hasCarousel ? "pb-12 md:pb-16" : ""}`}
          >
            <CarouselContent className="ml-0">
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.name} className="pl-0 md:px-16 lg:px-6">
                  <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center text-center">
                    <div className="mb-6 flex gap-1 md:mb-8">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFull key={i} className="size-6 text-scheme-text" />
                      ))}
                    </div>
                    <blockquote>
                      {/* Still an <h5> inside the <blockquote>, as the export
                          had it. globals.css binds Playfair Display to h1-h6
                          and nowhere else, so a <p> here would silently drop
                          the quote to Lexend Deca. */}
                      <h5 className="text-h5 font-bold">{t.quote}</h5>
                    </blockquote>
                    <div className="mt-6 md:mt-8">
                      <p className="font-semibold">{t.name}</p>
                      <p>{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows sit out at the container's edges and dots centre under
                the quote, which is where the Figma puts them. Both are behind
                `hasCarousel`: a previous/next control that can only ever
                return to the slide you are on is a dead control, and screen
                readers announce it as an available action. */}
            {hasCarousel && (
              <>
                <CarouselPrevious className="lg:size-12" />
                <CarouselNext className="lg:size-12" />
                <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-center">
                  {TESTIMONIALS.map((t, index) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => api && api.scrollTo(index)}
                      aria-label={`Show testimonial ${index + 1} of ${TESTIMONIALS.length}`}
                      aria-current={current === index}
                      className={`relative mx-[3px] inline-block size-2 rounded-full ${
                        current === index ? "bg-scheme-text" : "bg-scheme-text/20"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
