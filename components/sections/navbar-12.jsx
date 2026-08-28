"use client";

import { Button } from "@/components/ui/button";
// The export uses `motion.create(Card)` below but never imports Card.
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

const iconUrl = (name) =>
  `https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/${name}.svg`;

// The v2 export shipped this menu with nine items whose labels and descriptions
// did not match each other ("Advisory Services / Resources", "Contact / How we
// work"). Replaced wholesale. The descriptions are the page subheadings from
// design-export/sitemap.md, so each one matches what its destination says.
const BUSINESS_SERVICES = [
  {
    label: "AI Consultation",
    description:
      "Leverage AI-driven strategies to streamline operations and decision-making.",
    href: "/ai-consultation",
    icon: "business_messages",
  },
  {
    label: "Advisory Services",
    description:
      "Strategic guidance tailored for behavioral health, nonprofit, education, and growing organizations.",
    href: "/advisory--services",
    icon: "medical_services",
  },
  {
    // The literal "&" is kept unencoded on purpose. Measured 2026-08-28:
    //   raw  "/systems-&-technology"   -> dev 200, production 307 to the
    //                                     encoded form, which then serves 200
    //   enc. "/systems-%26-technology" -> dev 404, production 200
    // Neither form is clean in both environments, so this takes the one that
    // works everywhere at the cost of a single redirect hop in production,
    // rather than the one that hard-404s for anyone running `pnpm dev`.
    // Cloudflare normalises the path server-side, so that hop happens for any
    // inbound "&" URL regardless of what we write here. Do not rename the slug.
    label: "Systems & Technology",
    description:
      "Build scalable systems, streamline operations, and improve organizational efficiency.",
    href: "/systems-&-technology",
    icon: "devices",
  },
  {
    label: "Compliance Support",
    description: "Support operational readiness and compliance processes.",
    href: "/compliance-support",
    icon: "more_time",
  },
  {
    label: "Business Consultation",
    description: "Expert guidance to grow, optimize, and scale your business.",
    href: "/business-conusltation",
    icon: "add_business",
  },
  {
    label: "Resource Assistance",
    description:
      "Helping organizations access tools, systems and operational support resources.",
    href: "/resource-assistance",
    icon: "support",
  },
];

const INDIVIDUAL_SERVICES = [
  {
    label: "Peer Coaching Support (Telehealth)",
    description: "Help navigating difficulties of life.",
    href: "/for-individual-page",
    icon: "chat_info",
  },
];

const MenuItem = ({ item }) => (
  <a href={item.href} className="flex items-start gap-x-3 text-base">
    <img
      className="size-6 shrink-0 text-scheme-text"
      src={iconUrl(item.icon)}
      alt=""
    />
    <div className="flex grow flex-col">
      <p className="font-semibold">{item.label}</p>
      {/* Descriptions need ~325px of column to stay at two lines. The sheet is
          min(72rem, 90vw), so that only holds from about 1270px up; below it the
          copy blows out to four lines and the sheet grows past the hero's
          supporting paragraph. Labels-only below 1280 keeps the sheet short
          across the whole range. There is no `xl` breakpoint in this project
          (`--breakpoint-*: initial`), hence the arbitrary variant. */}
      <p className="hidden text-small min-[1280px]:block">{item.description}</p>
    </div>
  </a>
);

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
        {/* The logo block and the Contact block are both `lg:flex-1`, so the
            <nav> between them sits on the exact centre of the bar no matter how
            wide the logo or the button get. */}
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:flex-1 lg:px-0">
          <a href="/">
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
          className="overflow-auto px-[5%] lg:contents lg:h-auto! lg:items-center lg:overflow-visible lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <nav className="lg:flex lg:items-center">
            <a
              href="/"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Home
            </a>
            <a
              href="/about-us"
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
                {/* Nothing between this sheet and <body> is positioned, so it
                    resolves against the page: `top-18` puts it exactly on the
                    navbar's 72px bottom edge and `left-1/2` centres it. The
                    export right-anchored it with `right-[186px]`, which pinned
                    it under the Contact button. `-translate-x-1/2` is a Tailwind
                    v4 utility and writes the `translate` property, not
                    `transform`, so it composes with Motion's translateY on `y`
                    instead of being overwritten by it. */}
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
                  className="bg-scheme-background py-4 lg:absolute lg:top-18 lg:left-1/2 lg:z-50 lg:w-[min(72rem,90vw)] lg:-translate-x-1/2 lg:border lg:border-scheme-border lg:p-6 lg:[--y-close:25%]"
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.42fr] lg:gap-8">
                    <div>
                      <a
                        href="/for-business-page"
                        className="mb-3 block text-medium leading-[1.3] font-semibold"
                      >
                        For Businesses
                      </a>
                      <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                        {BUSINESS_SERVICES.map((item) => (
                          <MenuItem key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                    {/* The hairline reads as a divider between the two audiences
                        rather than the individual column looking like a leftover
                        of the business grid. Solid 1px in the scheme border
                        colour: it is the same rule the footer divider and this
                        sheet's own outline use -- the brand has no dotted rules
                        anywhere, so a dashed one would read as foreign. */}
                    <div className="lg:border-l lg:border-scheme-border lg:pl-8">
                      <a
                        href="/for-individual-page"
                        className="mb-3 block text-medium leading-[1.3] font-semibold"
                      >
                        For Individuals
                      </a>
                      <div className="grid grid-cols-1 gap-y-2">
                        {INDIVIDUAL_SERVICES.map((item) => (
                          <MenuItem key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ConditionalRenderedCard>
              </AnimatePresence>
            </div>
            <a
              href="/career"
              className="block py-3 text-base first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Careers
            </a>
          </nav>
          <div className="my-6 flex flex-col gap-4 lg:my-0 lg:flex-1 lg:flex-row lg:items-center lg:justify-end">
            <Button asChild title="Contact" size="sm">
              <a href="/contact-us">Contact</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
