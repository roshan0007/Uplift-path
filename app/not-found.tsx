import type { Metadata } from "next";
import React from "react";
import { Navbar12 } from "@/components/sections/navbar-12";
import { Footer4 } from "@/components/sections/footer-04";
import { StatusPanel } from "@/components/sections/status/status-panel";

export const metadata: Metadata = {
  title: "Page Not Found",
};

/**
 * The site's 404. The static export writes it to `out/404.html`, which
 * `wrangler.jsonc` serves with a real 404 status (`not_found_handling`).
 *
 * It lives at the app root, outside `(site)`, because that is the only
 * not-found Next uses for an unmatched URL — so it mounts the navbar and
 * footer itself rather than inheriting them from `app/(site)/layout.tsx`.
 */
export default function NotFound() {
  return (
    <>
      <Navbar12 />
      <StatusPanel
        eyebrow="Error 404"
        title="We can't find that page"
        actions={[
          { label: "Return to Home Page", href: "/" },
          { label: "Contact Us", href: "/contact-us", variant: "secondary" },
        ]}
      >
        The page you are looking for may have moved or no longer exists. Head
        back to the home page, or get in touch and we will point you in the
        right direction.
      </StatusPanel>
      <Footer4 />
    </>
  );
}
