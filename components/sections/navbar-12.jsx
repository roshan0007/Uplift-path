"use client";

import { Button } from "@/components/ui/button";
// The export uses `motion.create(Card)` below but never imports Card.
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

// The two service arrays and `iconUrl` moved to `lib/services.js` when the
// merged /for-business started rendering the same six services as cards.
// The nav and that page now read one array, so they cannot drift apart.
import {
  BUSINESS_SERVICES,
  INDIVIDUAL_SERVICES,
  iconUrl,
} from "@/lib/services";

/**
 * The top-level nav links.
 *
 * Regular weight and no hover effect, by instruction from the 2026-09-21 QA
 * review: the whole navbar — links, the Uplift Services trigger, the
 * mega-menu headings and items — is one weight. The only motion left in the
 * navbar is the Uplift Services sheet's 200ms fade and its chevron, asked for
 * separately. Don't reintroduce `font-semibold` or other transitions here
 * without that being reversed.
 *
 * The current page is marked with a 2px underline in the scheme text colour.
 * 2px is the brand's border width. `aria-current="page"` carries the same
 * fact to assistive tech.
 */
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block py-3 text-base lg:px-4 lg:py-2 lg:first:pt-2",
        "first:pt-7",
        isActive && "underline decoration-2 underline-offset-[6px]",
      )}
    >
      {children}
    </a>
  );
};

const MenuItem = ({ item }) => (
  <a href={item.href} className="flex items-start gap-x-3 text-base">
    <img
      className="size-6 shrink-0 text-scheme-text"
      src={iconUrl(item.icon)}
      alt=""
    />
    <div className="flex grow flex-col">
      <p>{item.label}</p>
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
  return {
    isMobileMenuOpen,
    isDropdownOpen,
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
  };
};

// The mega-menu sheet: a bordered <Card> on desktop, a plain <nav> inside the
// mobile menu. Defined at module scope — minting it inside the component body
// makes a new component type every render and remounts the whole sheet.
const ConditionalRenderedCard = ({ children, ...props }) => {
  // `initializeWithValue: false` is required, not cosmetic. This hook otherwise
  // reads matchMedia during the first client render, so below 992px the server
  // renders the desktop <Card> and the client's first render wants a <nav> --
  // different element, hydration error on every route. With it, both agree and
  // the swap happens in a layout effect, before paint.
  const isMobile = useMediaQuery("(max-width: 991px)", {
    initializeWithValue: false,
  });
  return React.createElement(isMobile ? "nav" : Card, props, children);
};

export function Navbar12() {
  const useActive = useRelume();
  // Homepage only. Everywhere else the page below the bar is flat white and a
  // flat white bar is the right answer; on the homepage the page below is the
  // `hero-fade` mint wash, which starts at full strength (#f0fffc) directly
  // under the bar — so a white bar drew a hard horizontal seam across the top
  // of the site. `home-nav-fade` gives the bar its own top-to-bottom ramp that
  // lands on exactly the wash's first stop at its bottom edge, so the two read
  // as one wash that fades in from the top of the page as well as out at the
  // bottom of it.
  //
  // `usePathname` rather than a class threaded down from the page, because the
  // navbar is mounted in `app/(site)/layout.tsx` and no page can reach it.
  const isHome = usePathname() === "/";
  return (
    <section
      className={cn(
        "z-[999] flex w-full items-center lg:min-h-18 lg:px-[5%] scheme-1 badge-alt",
        isHome ? "home-nav-fade" : "bg-scheme-background",
      )}
    >
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
          {/* The three bars are decorative <span>s, so without an explicit
              name this button is announced as an unlabelled "button" — and on
              mobile it is the only way into the site's navigation. */}
          <button
            type="button"
            aria-label={useActive.isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={useActive.isMobileMenuOpen}
            aria-controls="navbar-mobile-menu"
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={useActive.toggleMobileMenu}
          >
            {/* Bars snap to an X with no transition. Tailwind v4's translate
                and rotate utilities write separate properties, so they
                compose. */}
            <span
              className={cn(
                "my-[3px] h-0.5 w-6 bg-scheme-text",
                useActive.isMobileMenuOpen && "translate-y-2 -rotate-45",
              )}
            />
            <span
              className={cn(
                "my-[3px] h-0.5 w-6 bg-scheme-text",
                useActive.isMobileMenuOpen && "w-0",
              )}
            />
            <span
              className={cn(
                "my-[3px] h-0.5 w-6 bg-scheme-text",
                useActive.isMobileMenuOpen && "-translate-y-2 rotate-45",
              )}
            />
          </button>
        </div>
        {/* Shown or hidden outright below 992px, no height animation.
            `display: none` when closed also takes its links out of the tab
            order. `lg:contents` overrides `hidden`, so the desktop nav is
            unaffected. */}
        <div
          id="navbar-mobile-menu"
          className={cn(
            "overflow-auto px-[5%] lg:contents lg:items-center lg:overflow-visible lg:px-0",
            !useActive.isMobileMenuOpen && "hidden",
          )}
        >
          <nav className="lg:flex lg:items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-us">About</NavLink>
            {/* "How We Work" is in the 2026-09 Figma navbar, between About and
                Uplift Services, and was missing from the export's nav.

                CLAUDE.md had recorded the design system's own reference
                homepage as having drifted from the code on account of an
                "extra nav item" — this was that item, and the reference was
                right. Worth correcting there too.

                It also matters more than it used to: the homepage's three-step
                section used to link to /how-we-work from each of its cards,
                and the Figma redesign drops those links. Without this the
                route is reachable from the footer alone. */}
            <NavLink href="/how-we-work">How We Work</NavLink>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              {/* A real <button>, not the export's `<p role="button">`. A <p>
                  is not focusable whatever role it claims, and the sheet is
                  `display: none` when closed, so its links are out of the tab
                  order too — between them that left the seven service pages
                  with no keyboard path from the navbar on any route. The click
                  handler toggles at both breakpoints, so Enter/Space opens the
                  sheet on desktop exactly as hover does. */}
              <button
                type="button"
                aria-expanded={useActive.isDropdownOpen}
                aria-haspopup="true"
                className="flex w-full items-center justify-between gap-2 py-3 text-left text-base lg:flex-none lg:justify-start lg:px-4 lg:py-2"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                Uplift Services
                {/* Turns to point up while the sheet is open, on the same
                    200ms as the sheet's fade so the two move together. */}
                <span
                  className={cn(
                    "transition-[rotate] duration-200 ease-in-out",
                    useActive.isDropdownOpen && "rotate-180",
                  )}
                >
                  <KeyboardArrowDown className="text-scheme-text" />
                </span>
              </button>
              {/* Nothing between this sheet and <body> is positioned, so it
                  resolves against the page: `top-18` puts it exactly on the
                  navbar's 72px bottom edge and `left-1/2` centres it. The
                  export right-anchored it with `right-[186px]`, which pinned
                  it under the Contact button. */}
              <ConditionalRenderedCard
                  // The trigger's box ends at y 56 but the sheet starts at 72,
                  // so those 16px belonged to neither and crossing them fired
                  // mouseleave. This invisible strip spans the gap and is part
                  // of the sheet, so the pointer stays inside the hover target
                  // the whole way down. It only exists while the sheet is open,
                  // and sits below the nav links (which end at y 56), so it
                  // never intercepts a click on them. `lg:overflow-visible`
                  // is required: the Card primitive ships `overflow-hidden`,
                  // which clips the strip away entirely.
                  className={cn(
                    "bg-scheme-background py-4 lg:absolute lg:top-18 lg:left-1/2 lg:z-50 lg:w-[min(72rem,90vw)] lg:-translate-x-1/2 lg:overflow-visible lg:border lg:border-scheme-border lg:p-6 lg:before:absolute lg:before:inset-x-0 lg:before:-top-4 lg:before:h-4 lg:before:content-['']",
                    // Desktop only: a 200ms fade in and out, and nothing else —
                    // no slide, no scale. The sheet stays `display: block` there
                    // and toggles opacity plus visibility, so it can transition
                    // and its links still leave the tab order when closed
                    // (visibility flips at the end of the fade on the way out).
                    // Below 992px it sits in the mobile menu's flow and snaps.
                    "lg:transition-[opacity,visibility] lg:duration-200 lg:ease-in-out",
                    useActive.isDropdownOpen
                      ? "block lg:visible lg:opacity-100"
                      : "hidden lg:invisible lg:block lg:opacity-0",
                  )}
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.34fr] lg:gap-8">
                    <div>
                      <a
                        href="/for-business"
                        className="mb-3 block text-medium leading-[1.3]"
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
                        href="/for-individual"
                        className="mb-3 block text-medium leading-[1.3]"
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
            </div>
            <NavLink href="/careers">Careers</NavLink>
          </nav>
          <div className="my-6 flex flex-col gap-4 lg:my-0 lg:flex-1 lg:flex-row lg:items-center lg:justify-end">
            <Button asChild title="Contact" size="sm">
              <a href="/contact-us">Contact</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
