"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export function Layout504() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mb-12 md:mb-12 lg:mb-12">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="mb-5 text-h2 font-bold md:mb-6">
              Meet from anywhere in Ohio
            </h1>
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
              <div className="aspect-[3/2]">
                <img
                  src="/images/for-individual-page-feature-section.png"
                  className="size-full object-cover"
                  alt="Relume placeholder image 1"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <h2 className="mb-5 text-h3 font-bold md:mb-6">
                  A steady voice on the other end of the line
                </h2>
                <p>
                  Sometimes a screen feels like too much. A phone call keeps it
                  simple and direct. You talk, someone listens.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button asChild title="Get started" variant="secondary">
                    <a href="/contact-us">Get started</a>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent
            value="tab-two"
            className="data-[state=active]:animate-tabs"
          >
            <Card className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              <div className="aspect-[3/2]">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="size-full object-cover"
                  alt="Relume placeholder image 2"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <h2 className="mb-5 text-h3 font-bold md:mb-6">
                  A steady voice on the other end of the line
                </h2>
                <p>
                  Sometimes a screen feels like too much. A phone call keeps it
                  simple and direct. You talk, someone listens.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button asChild title="Get started" variant="secondary">
                    <a href="/contact-us">Get started</a>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent
            value="tab-three"
            className="data-[state=active]:animate-tabs"
          >
            <Card className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              <div className="aspect-[3/2]">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="size-full object-cover"
                  alt="Relume placeholder image 3"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <h2 className="mb-5 text-h3 font-bold md:mb-6">
                  A steady voice on the other end of the line
                </h2>
                <p>
                  Sometimes a screen feels like too much. A phone call keeps it
                  simple and direct. You talk, someone listens.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button asChild title="Get started" variant="secondary">
                    <a href="/contact-us">Get started</a>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
