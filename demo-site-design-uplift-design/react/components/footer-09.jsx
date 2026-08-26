"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo } from "relume-icons";

const useForm = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email });
  };
  return {
    email,
    handleSetEmail,
    handleSubmit,
  };
};

export function Footer9() {
  const formState = useForm();
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <Card className="grid grid-cols-1 gap-x-[8vw] gap-y-12 p-8 md:gap-y-16 md:p-12 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4">
          <div className="flex flex-col">
            <a href="#" className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                alt="Logo image"
                className="inline-block"
              />
            </a>
            <p className="mb-5 md:mb-6">
              Unlock growth with expert advice and clear strategies tailored to
              your business goals. Partner with experienced consultants
              dedicated to your strategic success.
            </p>
            <div className="max-w-md">
              <form
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                onSubmit={formState.handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formState.email}
                  onChange={formState.handleSetEmail}
                />
                <Button
                  title="Subscribe"
                  variant="secondary"
                  size="sm"
                  className="items-center justify-center"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-tiny">
                We respect your privacy and only send valuable content to help
                your organization thrive.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">About us</h2>
              <ul>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Home</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Services</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Industries</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">Quick links</h2>
              <ul>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Home</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>About</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Services</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Contact</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <span>Industries</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">Connect</h2>
              <ul className="flex flex-col items-start">
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <FacebookLogo className="size-6 text-scheme-text" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <InstagramLogo className="size-6 text-scheme-text" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <XLogo className="size-6 p-0.5 text-scheme-text" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li className="text-small py-2">
                  <a href="#" className="flex items-center gap-3">
                    <LinkedinLogo className="size-6 text-scheme-text" />
                    <span>Linkedin</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <div className="text-small flex flex-col-reverse items-start justify-between pt-6 pb-4 md:flex-row md:items-center md:pt-8 md:pb-0">
          <p className="mt-6 md:mt-0">
            © 2026 Uplift Path Inc. All rights reserved.
          </p>
          <ul className="text-small grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <a href="#">Accessibility</a>
            </li>
            <li className="underline">
              <a href="#">Privacy policy</a>
            </li>
            <li className="underline">
              <a href="#">Terms of service</a>
            </li>
            <li className="underline">
              <a href="#">Grievance</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
