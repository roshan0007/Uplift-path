"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "motion/react";
import React, { useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };
  const openOnDesktopDropdownMenu = (id) => {
    !isMobile && setOpenDropdown(id);
  };
  const closeOnDesktopDropdownMenu = (id) => {
    !isMobile && setOpenDropdown((prev) => (prev === id ? null : prev));
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const getDropdownAnimation = (id) => (openDropdown === id ? "open" : "close");
  const getDropdownIconAnimation = (id) =>
    openDropdown === id ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    getDropdownAnimation,
    getDropdownIconAnimation,
  };
};

export function Navbar5() {
  const useActive = useRelume();
  return (
    <section className="relative z-[999] flex w-full items-center justify-between bg-scheme-background lg:min-h-18 lg:px-[5%] scheme-1 badge-alt">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="lg:flex">
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
                  closed: {
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
          <motion.div
            variants={{
              open: { height: "var(--height-open, 100dvh)" },
              close: { height: "var(--height-closed, 0)" },
            }}
            initial="close"
            exit="close"
            animate={useActive.animateMobileMenu}
            transition={{ duration: 0.4 }}
            className="overflow-auto px-[5%] lg:ml-6 lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          >
            <a
              href="#"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-6 first:lg:pt-6"
            >
              About us
            </a>
            <div
              onMouseEnter={() => useActive.openOnDesktopDropdownMenu("solutions")}
              onMouseLeave={() => useActive.closeOnDesktopDropdownMenu("solutions")}
            >
              <p
                role="button"
                className="flex w-full items-center justify-between gap-2 py-3 text-center text-base lg:w-auto lg:flex-none lg:justify-start lg:px-4 lg:py-6"
                onClick={() => useActive.openOnMobileDropdownMenu("solutions")}
              >
                Uplift Solutions
                <motion.span
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  animate={useActive.getDropdownIconAnimation("solutions")}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDown className="text-scheme-text" />
                </motion.span>
              </p>
              <motion.div
                variants={{
                  open: {
                    visibility: "visible",
                    opacity: 1,
                    height: "var(--height-open, auto)",
                  },
                  close: {
                    visibility: "hidden",
                    opacity: "0",
                    height: "var(--height-close, 0)",
                  },
                }}
                initial="close"
                exit="close"
                animate={useActive.getDropdownAnimation("solutions")}
                transition={{ duration: 0.3 }}
                className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-scheme-background lg:absolute lg:w-[100vw] lg:border-b lg:border-scheme-border lg:px-[5%] lg:[--height-close:auto]"
              >
                <div className="mx-auto flex size-full max-w-full items-center justify-between">
                  <div className="w-full lg:flex">
                    <div className="grid flex-1 gap-x-8 gap-y-6 py-4 pr-8 md:grid-cols-2 md:px-0 md:py-8 lg:py-8 lg:pr-8">
                      <div className="grid auto-rows-max grid-cols-1 grid-rows-[max-content] gap-y-2 md:gap-y-4">
                        <h4 className="text-small leading-[1.3] font-semibold">
                          For Businesses
                        </h4>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/work.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">
                              Business Consulatation
                            </p>
                            <p className="hidden text-small md:block">
                              Improve workflows, operational clarity, and
                              long-term organizational growth.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/star_shine.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">Ai Consultation</p>
                            <p className="hidden text-small md:block">
                              Assisting organizations in obtaining tools,
                              systems, and operational support resources.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/stars.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">Advisory Services</p>
                            <p className="hidden text-small md:block">
                              Strategic guidance tailored for behavioral health,
                              nonprofit, education, and growing organizations.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/computer.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">
                              Systems & Technology
                            </p>
                            <p className="hidden text-small md:block">
                              Build scalable systems, streamline operations, and
                              improve organizational efficiency.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support_agent.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">Compliance Support</p>
                            <p className="hidden text-small md:block">
                              Support operational readiness and compliance
                              processes.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/science.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">Resource Assistance</p>
                            <p className="hidden text-small md:block">
                              Sustain operational readiness and compliance
                              procedures.
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className="grid auto-rows-max grid-cols-1 grid-rows-[max-content] gap-y-2 md:gap-y-4">
                        <h4 className="text-small leading-[1.3] font-semibold">
                          For Individuals
                        </h4>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">
                              Peer Coaching Support (Telehealth)
                            </p>
                            <p className="hidden text-small md:block">
                              Help navigating difficulties of life.
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="relative flex max-w-none flex-1 p-6 md:py-8 md:pr-0 md:pl-8 lg:max-w-md">
                      <div className="relative z-10 grid w-full auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content] gap-4">
                        <h4 className="text-small leading-[1.3] font-semibold">
                          Industries we Support
                        </h4>
                        <div className="grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start gap-y-2 lg:grid-rows-[auto]">
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="/images/terms-of-use-navbar-0.jpg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Behavioral Health Consulting
                              </p>
                              <p className="text-small">
                                Helping behavioral health organizations improve
                                operations, care coordination, and sustainable
                                growth.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="About"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  About
                                </Button>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Educational Institutions
                              </p>
                              <p className="text-small">
                                Supporting educational organizations with
                                stronger systems, communication, and operational
                                structure.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="About"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  About
                                </Button>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="/images/terms-of-use-navbar-1.jpg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Startups & Entrepreneurs
                              </p>
                              <p className="text-small">
                                Strategic guidance and scalable systems designed
                                to help growing businesses move forward
                                confidently.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="About"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  About
                                </Button>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="/images/terms-of-use-navbar-2.jpg"
                                alt="Relume placeholder image 2"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Nonprofit Organizations
                              </p>
                              <p className="text-small">
                                Helping mission-driven organizations strengthen
                                operations, collaboration, and long-term impact.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="About"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  About
                                </Button>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="absolute top-0 right-auto bottom-0 left-0 min-w-full bg-scheme-foreground lg:min-w-[100vw]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <a
              href="#"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-6 first:lg:pt-6"
            >
              How we work
            </a>
            <div
              onMouseEnter={() => useActive.openOnDesktopDropdownMenu("resources")}
              onMouseLeave={() => useActive.closeOnDesktopDropdownMenu("resources")}
            >
              <p
                role="button"
                className="flex w-full items-center justify-between gap-2 py-3 text-center text-base lg:w-auto lg:flex-none lg:justify-start lg:px-4 lg:py-6"
                onClick={() => useActive.openOnMobileDropdownMenu("resources")}
              >
                Resources
                <motion.span
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  animate={useActive.getDropdownIconAnimation("resources")}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDown className="text-scheme-text" />
                </motion.span>
              </p>
              <motion.div
                variants={{
                  open: {
                    visibility: "visible",
                    opacity: 1,
                    height: "var(--height-open, auto)",
                  },
                  close: {
                    visibility: "hidden",
                    opacity: "0",
                    height: "var(--height-close, 0)",
                  },
                }}
                initial="close"
                exit="close"
                animate={useActive.getDropdownAnimation("resources")}
                transition={{ duration: 0.3 }}
                className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-scheme-background lg:absolute lg:w-[100vw] lg:border-b lg:border-scheme-border lg:px-[5%] lg:[--height-close:auto]"
              >
                <div className="mx-auto flex size-full max-w-full items-center justify-between">
                  <div className="w-full lg:flex">
                    <div className="grid flex-1 gap-x-8 gap-y-6 py-4 pr-8 md:grid-cols-2 md:px-0 md:py-8 lg:py-8 lg:pr-8">
                      <div className="grid auto-rows-max grid-cols-1 grid-rows-[max-content] gap-y-2 md:gap-y-4">
                        <h4 className="text-small leading-[1.3] font-semibold">
                          Case Studies
                        </h4>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/work.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">For organizations</p>
                            <p className="hidden text-small md:block">
                              Improve workflows, operational clarity, and
                              long-term organizational growth.
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/strategy.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">For Individuals</p>
                            <p className="hidden text-small md:block">
                              Strategic guidance tailored for behavioral health,
                              nonprofit, education, and growing organizations.
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className="grid auto-rows-max grid-cols-1 grid-rows-[max-content] gap-y-2 md:gap-y-4">
                        <a
                          href="#"
                          className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <img
                              className="text-scheme-text"
                              src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/support.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="font-semibold">FAQs</p>
                            <p className="hidden text-small md:block">
                              Virtual counseling for emotional well-being.
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="relative flex max-w-none flex-1 p-6 md:py-8 md:pr-0 md:pl-8 lg:max-w-md">
                      <div className="relative z-10 grid w-full auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content] gap-4">
                        <h4 className="text-small leading-[1.3] font-semibold">
                          Careers
                        </h4>
                        <div className="grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start gap-y-2 lg:grid-rows-[auto]">
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Build Systems That Help People Thrive
                              </p>
                              <p className="text-small">
                                Join a mission-driven team improving behavioral
                                health access, organizational systems, and
                                sustainable care through consulting and virtual
                                support.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="Explore Opportunities"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  Explore Opportunities
                                </Button>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                          >
                            <div className="relative w-full pt-[66.66%]">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 2"
                                className="absolute inset-0 size-full rounded-image object-cover"
                              />
                            </div>
                            <div className="mt-4 flex flex-col justify-start md:mt-0">
                              <p className="mb-1 font-semibold">
                                Questions About Getting Started?
                              </p>
                              <p className="text-small">
                                Learn more about our consulting process, virtual
                                support services, telehealth sessions, and care
                                approach.
                              </p>
                              <div className="mt-1.5">
                                <Button
                                  title="View FAQs"
                                  variant="link"
                                  size="link"
                                  className="text-small underline"
                                >
                                  View FAQs
                                </Button>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="absolute top-0 right-auto bottom-0 left-0 min-w-full bg-scheme-foreground lg:min-w-[100vw]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-y-4 pb-24 lg:hidden lg:pb-0">
              <Button
                className="w-full"
                title="Button"
                variant="secondary"
                size="sm"
              >
                Button
              </Button>
              <Button className="w-full" title="Button" size="sm">
                Button
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="hidden lg:flex lg:gap-4">
          <Button title="Contact" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
