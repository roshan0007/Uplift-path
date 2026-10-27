import type { Metadata } from "next";
import React from "react";
import { ZohoFormSlot } from "@/components/forms/zoho-form-slot";
import { LegalPage } from "@/components/sections/legal/legal-page";
import {
  CONTENT,
  TITLE,
  UPDATED,
} from "@/components/sections/legal/grievance.content";

// `absolute` because these titles already carry the brand: the root layout's
// "%s | Uplift Path" template would otherwise append it twice.
export const metadata: Metadata = {
  alternates: {
    canonical: "/grievance",
  },
  title: {
    absolute: "Grievance Form for Client Feedback | Uplift Path Inc.",
  },
  description:
    "Use this form to file a grievance or complaint with Uplift Path Inc. We review every submission and respond as part of our client rights process.",
};

/**
 * A new route. The footer has always carried a "Grievance" link and it has
 * always pointed at "#" — there was no page behind it, here or in the Relume
 * export. The live site does have one, with its own Zoho form, and this is it:
 * the same copy, in this brand.
 *
 * ## THE ZOHO FORM
 *
 * It was removed on 2026-09-10 because the embed was not attached properly, and
 * restored on 2026-09-12: the legacy site has a grievance form and this one did
 * not, which was reported as a gap. It is the same Merged Grievance Form the
 * legacy site serves, from the `grievance` entry in ZOHO_FORMS.
 *
 * **It carries no height, and must not be given `h-[50rem]` back. Read this
 * first.**
 * That class is what produced the 511px of dead white space between the
 * "Hours:" line and the form, and 463px of page overflow underneath it.
 *
 * `ZohoFormSlot` wraps the frame in `flex h-full min-h-0 items-center`. That
 * wrapper is written for the intake screens, where the slot is a flex child
 * with a definite height and centring the frame in surplus room is the whole
 * point. Here the slot sat in `LegalPage`'s right-hand column, which is a
 * plain block with no definite height — so the wrapper's `h-full` resolved
 * against the *column's* 1311px while the frame took the call site's 800px,
 * `items-center` split the 511px difference above and below it, and because
 * the wrapper began 631px down the column it ran 463px past the section's own
 * bottom edge. Measured, not inferred.
 *
 * `/contact-us` uses the same component and is fine (outer 928, inner 928, no
 * dead space, no overflow) because there the slot *is* a grid child with a
 * definite height. So this is not a bug in the component — it is a wrapper
 * whose contract the legal-page column cannot meet. Give the frame no height
 * here and let the card grow to fit, which is what the component's own
 * docblock says the contact and grievance pages should do.
 */
export default function Page() {
  return (
    <LegalPage title={TITLE} updated={UPDATED} content={CONTENT}>
      {/* The height is on this wrapper, not on the slot. ZohoFormSlot's own
          outer box is `flex h-full items-center`, which needs a parent with a
          definite height -- mounted straight into this column, which is a plain
          block, `h-full` resolved against the column instead and split the
          difference into dead space above and below the frame. Measured 486px
          of it before this wrapper existed.

          165rem is the form's own height (2529px at 375 and 2538px at 760 --
          it barely reflows) plus slack for the extra lines Zoho adds when a
          required field comes back with an error. Drawn at full height so the
          page scrolls once rather than the reader scrolling inside a frame.
          Re-measure if the form's fields change; see zoho-form-slot.jsx. */}
      <div className="mt-10 h-[165rem] md:mt-12">
        <ZohoFormSlot form="grievance" />
      </div>
    </LegalPage>
  );
}
