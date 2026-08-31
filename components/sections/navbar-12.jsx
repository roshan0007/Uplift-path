"use client";

import { Button } from "@/components/ui/button";
// The export uses `motion.create(Card)` below but never imports Card.
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

// The two service arrays and `iconUrl` moved to `lib/services.js` when the
// merged /for-business-page started rendering the same six services as cards.
// The nav and that page now read one array, so they cannot drift apart.
import {
  BUSINESS_SERVICES,
  INDIVIDUAL_SERVICES,
  iconUrl,
} from "@/lib/services";

const MenuItem = ({ item }) => (
  <a href={item.href} className="flex items-start gap-x-3 text-base">
    <img
      className="size-6 shrink-0 text-scheme-text"
      src={iconUrl(item.icon)}
      alt=""
    />
    <div className="flex grow flex-col">
      <p className="font-semibold">{item.label}</p>
      {/* `short`, not `description`. The full descriptions run to two lines
          each at this column width, and six of those stacked made the sheet a
          third taller than it needed to be. The long form still runs on the
          service cards, where there is room for it.

          Still hidden below 1280: the column narrows enough there that even the
          short line wraps, and a menu of labels is better than a menu of ragged
          two-line items. There is no `xl` breakpoint in this project
          (`--breakpoint-*: initial`), hence the arbitrary variant. */}
      <p className="hidden text-small min-[1280px]:block">
        {item.short ?? item.description}
      </p>
    </div>
  </a>
);

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  // The sheet closes on a short delay rather than instantly. Pointer paths to a
  // mega-menu item are rarely straight down: people cut the corner, overshoot,
  // or pause. Closing on the first mouseleave pulls the menu out from under
  // them mid-reach. The timer is cancelled the moment the pointer comes back
  // into the trigger or the sheet (the sheet is a DOM child of the same
  // wrapper, so re-entering it fires onMouseEnter here).
  const closeTimer = useRef(null);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    if (isMobile) return;
    clearTimeout(closeTimer.current);
    setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    if (isMobile) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsDropdownOpen(false), 300);
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
                  // The trigger's box ends at y 56 but the sheet starts at 72,
                  // so those 16px belonged to neither and crossing them fired
                  // mouseleave. This invisible strip spans the gap and is part
                  // of the sheet, so the pointer stays inside the hover target
                  // the whole way down. It only exists while the sheet is open,
                  // and sits below the nav links (which end at y 56), so it
                  // never intercepts a click on them. `lg:overflow-visible`
                  // is required: the Card primitive ships `overflow-hidden`,
                  // which clips the strip away entirely.
                  className="bg-scheme-background py-4 lg:absolute lg:top-18 lg:left-1/2 lg:z-50 lg:w-[min(72rem,90vw)] lg:-translate-x-1/2 lg:overflow-visible lg:border lg:border-scheme-border lg:p-6 lg:[--y-close:25%] lg:before:absolute lg:before:inset-x-0 lg:before:-top-4 lg:before:h-4 lg:before:content-['']"
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.34fr] lg:gap-8">
                    <div>
                      <a
                        href="/for-business-page"
                        className="mb-3 block text-medium leading-[1.3] font-semibold"
                      >
                        For Businesses
                      </a>
                      {/* Three columns from 1280 up, which is exactly where the
                          descriptions appear. Six items become two rows instead
                          of three, and the single-item Individuals column beside
                          them stops trailing two empty rows of dead space. */}
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 min-[1280px]:grid-cols-3">
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
