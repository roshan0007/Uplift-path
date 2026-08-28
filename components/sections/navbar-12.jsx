"use client";

import { Button } from "@/components/ui/button";
// The export uses `motion.create(Card)` below but never imports Card.
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

const ConditionalCard = () => {
  const Component = ({ children, ...props }) => {
    // `initializeWithValue: false` is required, not cosmetic. This hook otherwise
    // reads matchMedia during the first client render, so below 992px the server
    // renders the desktop <Card> and the client's first render wants a <nav> --
    // different element, hydration error on every route. With it, both agree and
    // the swap happens in a layout effect, before paint.
    const isMobile = useMediaQuery("(max-width: 991px)", {
      initializeWithValue: false,
    });
    const MotionCard = isMobile ? motion.nav : motion.create(Card);
    return React.createElement(MotionCard, props, children);
  };
  return Component;
};

// Created once at module scope. The export called ConditionalCard() inside the
// component body, which minted a brand-new component type on every render and
// remounted the whole dropdown subtree each time - which in turn reset the
// navbar's Motion components to their initial variant, so nothing in the navbar
// ever animated (the mobile menu could not open).
const ConditionalRenderedCard = ConditionalCard();

export function Navbar12() {
  const useActive = useRelume();
  return (
    <section className="z-[999] flex w-full items-center bg-scheme-background lg:min-h-18 lg:px-[5%] scheme-1 badge-alt">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href="#">
            <img
              src="/brand/uplift-path-logo.svg"
              alt="Uplift Path"
              className="h-8 w-auto"
            />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={useActive.toggleMobileMenu}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: 8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={useActive.animateMobileMenu}
              variants={{
                open: { width: 0, transition: { duration: 0.1 } },
                // Keyed "close", not "closed": this span is driven by
                // animateMobileMenu, which yields "open" | "close". The export
                // wrote "closed" here, so nothing matched on the way back and the
                // middle bar stayed collapsed after the first open.
                close: {
                  width: "1.5rem",
                  transition: { delay: 0.3, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: -8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
          </button>
        </div>
        {/* The export animated this height between two `var(...)` strings, relying
            on `lg:[--height-*:auto]` to keep the desktop nav visible. Motion
            cannot animate a var() to a var(), so it wrote nothing at all and the
            mobile menu never opened - it is dead on the live site today too. The
            variants are numeric now, which Motion can animate, and `lg:h-auto!`
            takes over above 992px so the desktop nav is unaffected. The two
            custom properties are kept as the documented override hook. */}
        <motion.div
          variants={{
            open: { height: "auto" },
            close: { height: 0 },
          }}
          initial="close"
          exit="close"
          animate={useActive.animateMobileMenu}
          transition={{ duration: 0.4 }}
          className="overflow-auto px-[5%] lg:flex lg:h-auto! lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <nav className="lg:flex lg:items-center">
            <a
              href="#"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Home
            </a>
            <a
              href="#"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              About
            </a>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <p
                role="button"
                className="flex w-full items-center justify-between gap-2 py-3 text-left text-base lg:flex-none lg:justify-start lg:px-4 lg:py-2"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                Uplift Services
                <motion.span
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  animate={useActive.animateDropdownMenuIcon}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDown className="text-scheme-text" />
                </motion.span>
              </p>
              <AnimatePresence>
                <ConditionalRenderedCard
                  variants={{
                    open: {
                      visibility: "visible",
                      opacity: "var(--opacity-open, 100%)",
                      y: 0,
                      display: "block",
                    },
                    close: {
                      visibility: "hidden",
                      opacity: "var(--opacity-close, 0)",
                      y: "var(--y-close, 0%)",
                      display: "none",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="bg-scheme-background py-4 lg:absolute lg:right-[186px] lg:z-50 lg:max-w-[640px] lg:border lg:border-scheme-border lg:p-6 lg:[--y-close:25%]"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    <div>
                      <div className="flex flex-col gap-2 md:gap-4">
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/add_business.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">
                              Business Consultation
                            </p>
                            <p className="hidden text-small md:block">About</p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/business_messages.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">AI Consultation</p>
                            <p className="hidden text-small md:block">
                              For Businesses
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/chat_info.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">
                              Individual Consultation
                            </p>
                            <p className="hidden text-small md:block">
                              For Individuals
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/medical_services.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">Advisory Services</p>
                            <p className="hidden text-small md:block">
                              Resources
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">Resource Assistance</p>
                            <p className="hidden text-small md:block">
                              Compliance support for behavioral health and human
                              services
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2 md:gap-4">
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/work.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">Contact</p>
                            <p className="hidden text-small md:block">
                              How we work
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/devices.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">Advisory services</p>
                            <p className="hidden text-small md:block">
                              Systems & Technology
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/assistant_device.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">System & Technology</p>
                            <p className="hidden text-small md:block">
                              Resource Assistance
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="my-1 flex items-start gap-x-3 text-base"
                        >
                          <img
                            className="size-6 text-scheme-text"
                            src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/more_time.svg"
                          />
                          <div className="flex grow flex-col">
                            <p className="font-semibold">Compliance Support</p>
                            <p className="hidden text-small md:block">
                              Systems that give your people time back
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </ConditionalRenderedCard>
              </AnimatePresence>
            </div>
            <a
              href="#"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Careers
            </a>
          </nav>
          <div className="my-6 flex flex-col gap-4 lg:my-0 lg:ml-4 lg:flex-row lg:items-center">
            <Button title="Contact" size="sm">
              Contact
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
