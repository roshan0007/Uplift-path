"use client";

import { GetStartedButton } from "@/components/intake/get-started-button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

/**
 * Matched to the 2026-09-08 Figma (node 10214-103875).
 *
 * The frame resolves a real bug here. The Relume export shipped tab 1's
 * heading and body **repeated verbatim in all three panes**, so a tab set
 * offering phone, video and scheduling said "a phone call keeps it simple" on
 * every one of them. The frame draws each pane with its own copy, and panes 2
 * and 3 with their own tagline ("Video", "Schedule") that pane 1 does not
 * have. That copy is now in place.
 *
 * Geometry from the frame: image 640x640 and content 640x640, so the media is
 * square rather than the 3:2 the export used. Headings are 44/52.8 = `text-h3`;
 * body is 16/24; tab labels 16/24.
 *
 * Two departures, both deliberate:
 *
 * 1. **Pane 1 keeps the image on the left; the frame flips panes 2 and 3 to
 *    the right.** Only one pane is ever visible, so alternating sides makes the
 *    media jump across the card as you click between tabs. Held consistent.
 * 2. **The "Learn more" secondary link on panes 2 and 3 is not built.** The
 *    frame gives it no destination, and every route it could plausibly point
 *    at is already one click away. Nothing invented.
 *
 * The pane 1 illustration is the frame's own -- a tin-can telephone strung
 * between two rooftops, which is a far better fit for "By phone" than the stock
 * photo the export used. The frame's panes 2 and 3 carry the grey Relume
 * placeholder (a single shared `imageRef`, 1000x1000, the picture-frame glyph),
 * so the real illustrations already in the repo are kept instead.
 */
export function Layout504() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Meet from anywhere in Ohio
            </h2>
            <p className="text-medium">
              Good support should not be limited by geography. We bring the
              session to you wherever you are in the state.
            </p>
          </div>
        </div>
        <Tabs defaultValue="tab-one" className="flex flex-col items-center">
          <TabsList className="relative mb-10 scrollbar-none flex w-screen flex-nowrap items-center gap-x-6 overflow-auto px-[5vw] md:mb-12 md:w-auto md:max-w-full md:px-0">
            <TabsTrigger
              value="tab-one"
              className="rounded-none border-0 border-b bg-transparent px-0 py-2 data-[state=active]:border-scheme-text data-[state=active]:bg-transparent data-[state=inactive]:border-transparent"
            >
              By phone
            </TabsTrigger>
            <TabsTrigger
              value="tab-two"
              className="rounded-none border-0 border-b bg-transparent px-0 py-2 data-[state=active]:border-scheme-text data-[state=active]:bg-transparent data-[state=inactive]:border-transparent"
            >
              By video
            </TabsTrigger>
            <TabsTrigger
              value="tab-three"
              className="rounded-none border-0 border-b bg-transparent px-0 py-2 data-[state=active]:border-scheme-text data-[state=active]:bg-transparent data-[state=inactive]:border-transparent"
            >
              On your schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="tab-one"
            className="data-[state=active]:animate-tabs"
          >
            <Card className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              {/* `object-contain` and padding: the illustrations sit on a
                  transparent ground, so cropping them square would clip them. */}
              <div className="aspect-square p-6">
                <img
                  src="/images/for-individual-by-phone.png"
                  className="size-full object-contain"
                  alt="An illustration of two people talking through a tin-can telephone strung between two rooftops"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <h3 className="mb-5 text-h3 font-bold md:mb-6">
                  A steady voice on the other end of the line
                </h3>
                <p>
                  Sometimes a screen feels like too much. A phone call keeps it
                  simple and direct. You talk, someone listens.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  {/* Opens the intake Application modal (step 1). */}
                  <GetStartedButton label="Get started" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent
            value="tab-two"
            className="data-[state=active]:animate-tabs"
          >
            <Card className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              <div className="aspect-square p-6">
                <img
                  src="/images/for-individual-page-by-video.png"
                  className="size-full object-contain"
                  alt="An illustration of a laptop, for a session held by video"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="mb-3 font-semibold md:mb-4">Video</p>
                <h3 className="mb-5 text-h3 font-bold md:mb-6">
                  Face to face without leaving your safe space
                </h3>
                <p>
                  You see the person you are talking to. It builds trust faster.
                  All you need is a quiet room and a connection.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  {/* Opens the intake Application modal (step 1). */}
                  <GetStartedButton label="Get started" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent
            value="tab-three"
            className="data-[state=active]:animate-tabs"
          >
            <Card className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              <div className="aspect-square p-6">
                <img
                  src="/images/for-individual-page-on-your-schedule.png"
                  className="size-full object-contain"
                  alt="An illustration of two people shaking hands on an arrangement"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="mb-3 font-semibold md:mb-4">Schedule</p>
                <h3 className="mb-5 text-h3 font-bold md:mb-6">
                  Support that fits the shape of your day
                </h3>
                <p>
                  Early mornings, late evenings, or weekends. We find the time
                  that works. Your life does not pause and neither should your
                  care.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  {/* Opens the intake Application modal (step 1). */}
                  <GetStartedButton label="Get started" />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
