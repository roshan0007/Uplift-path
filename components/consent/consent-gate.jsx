"use client";

import { CONSENT_CHANGED_EVENT, isAllowed } from "@/lib/consent";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * Renders `children` only while the visitor has consented to `category` and the
 * current page is allowed to carry it. **Every non-essential script, pixel or
 * widget must be mounted through this**, e.g.
 *
 *     <ConsentGate category="analytics"><Script src="..." /></ConsentGate>
 *
 * It renders nothing on the server and on first paint, so nothing loads before
 * the visitor has chosen (CB-1). When consent is withdrawn it unmounts the
 * children on the spot (CB-5); the cookies and storage the tag left behind are
 * cleared by `saveConsent`.
 *
 * Advertising and social never render on an inquiry-form page, whatever consent
 * was given (FM-1) -- that rule lives in `isAllowed`, not here, so it cannot be
 * bypassed by a call site.
 *
 * Nothing on the site uses this yet; there are no non-essential technologies.
 */
export function ConsentGate({ category, children }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setAllowed(isAllowed(category, pathname));
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, [category, pathname]);

  return allowed ? <>{children}</> : null;
}
