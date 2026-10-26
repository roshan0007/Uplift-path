import type { Metadata } from "next";
import React from "react";
import { AcceptClient } from "@/components/coach/accept-client";

// The page a coach lands on from the "new client" email. It is personal to one
// case, so it is noindexed, kept out of the sitemap, and out of robots.txt's
// reach too (`NOINDEX_ROUTES`). `public/_headers` adds the same noindex, plus
// `no-store` and `no-referrer`, as response headers.
export const metadata: Metadata = {
  title: "Accept A Client",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AcceptClient />;
}
