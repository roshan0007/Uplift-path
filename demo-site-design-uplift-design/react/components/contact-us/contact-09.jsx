"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export function Contact9() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1 badge-alt">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <div>
          <img
            src="https://imagedelivery.net/RAP5LnVUMDfmG3LRL4kHtw/52d6aa40-b380-464b-0cd6-66d7fe8dcb01/2560?exp=1788307200&sig=535de1f0cd28fb9c2c1fc176a6a474775004c374bda9fe2ccadddd6de0bbfb4d"
            alt="Relume placeholder image"
            className="size-full rounded-image object-cover"
          />
        </div>
        <div>
          <div className="mb-6 md:mb-8">
            <p className="mb-3 font-semibold md:mb-4">Contact</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">Start here</h2>
            <p className="text-medium">
              Connect with a business advisor Who’s ready to help you scale,
              simplify and succeed.
            </p>
          </div>
          <form className="grid grid-cols-1 gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input type="text" id="name" />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input type="email" id="email" />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="message" className="mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us everything"
                className="min-h-[11.25rem] overflow-auto"
              />
            </div>
            <div className="mb-3 flex items-center space-x-2 text-small md:mb-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer">
                I accept the terms
              </Label>
            </div>
            <div>
              <Button title="Get Started">Get Started</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
