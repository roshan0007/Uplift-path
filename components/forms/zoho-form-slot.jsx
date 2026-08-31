"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * Every Zoho form on the site, in one place.
 *
 * Five surfaces embed a Zoho form: the three intake steps that are forms
 * (Application, Eligibility, Consent), the contact page and the grievance page.
 * Step 3 (/booking) is not a form — it is the scheduler in components/booking.
 *
 * **All of them point at `forms.zohopublic.com`, on purpose.** Consent and Contact
 * were supplied on the vanity host `forms.upliftpathwellness.com`, and that
 * hostname does not exist — it returns NXDOMAIN from the public resolvers, so
 * an iframe pointed at it renders nothing at all. The apex `upliftpathwellness.com`
 * resolves; only the `forms.` record is missing, which is the CNAME Zoho asks
 * you to create when you set a custom domain on a form.
 *
 * The same two forms answer on `forms.zohopublic.com` at byte-identical paths,
 * so that is what ships. Once the CNAME exists, swapping the host back on these
 * two entries is the whole change — the form IDs do not differ.
 *
 * ## About `height`
 *
 * A cross-origin iframe cannot tell us how tall its content is, so a short form
 * stretched to fill a tall screen leaves a lot of empty white inside a 2px
 * rectangle. `height` is the form's own measured height, and the frame is drawn
 * at that size and centred in the space it was given rather than stretched to
 * fill it. It is a preference, not a cap in the other direction: the frame
 * still shrinks to the space available on a short screen, and it carries enough
 * slack above the measurement to absorb the extra lines Zoho adds when required
 * fields come back with errors.
 *
 * Consent has no `height` — at 5771px nothing is gained by declaring it, and
 * filling the screen is exactly what that form wants.
 *
 * To re-measure after editing a form in Zoho: open its URL on its own at a
 * window at least 780px wide — narrower than that and the browser serves the
 * mobile layout, which is shorter and will under-measure — and take the deepest
 * element bottom, not the <form> box. Zoho wraps the form in padding the
 * <form> element does not account for, and measuring the box alone is what
 * first sized the Application frame 100px short and left it scrolling.
 */
export const ZOHO_FORMS = {
  application: {
    title: "Find the Right Peer Coach for You",
    src: "https://forms.zohopublic.com/upliftpathinc/form/UPPersonalDataSubmit/formperma/l22DiBYbUh7nw9hOoEPvFYx2znqdzsvp9z7Cp_MEKAg",
    height: "36rem", // measured 501px
  },
  eligibility: {
    title: "CMPS",
    src: "https://forms.zohopublic.com/upliftpathinc/form/CMPS/formperma/fSKimojEfxrmY7O5CyGw-80PZAr6SzacLv0_BcGDnmw",
    height: "38rem", // measured 546px
  },
  consent: {
    title: "Consent Form",
    src: "https://forms.zohopublic.com/upliftpathinc/form/ConsentFormclient/formperma/l1giydGIPzdtmEl0cHDHzWrOHvXcqyGQ6abxPefIru8",
    height: null, // measured 5771px — fills the screen instead
  },
  grievance: {
    title: "Grievance Form",
    src: "https://forms.zohopublic.com/upliftpathinc/form/MergedGrievanceForm/formperma/A2Z1eDlfDnhUqZhEOB0e2YXvA3dd0QJZPnzHFVdzNYY",
    // Same reasoning as contact: an ordinary scrolling page, so the height is
    // set at the call site rather than negotiated with a surplus.
    height: null,
  },
  contact: {
    title: "Contact Us",
    src: "https://forms.zohopublic.com/upliftpathinc/form/ContactUs1/formperma/7AYoSioYjRVm-VttoDKxrMEX5TtZVASiwm8LCS37G7A",
    // No `height` here even though this form measures 769px: `height` means
    // "the size to settle at once there is surplus room", which is a question
    // only the intake screens ask. The contact page is an ordinary scrolling
    // page with no surplus to speak of, so it sets its own height at the call
    // site — see contact-panel.jsx.
    height: null,
  },
};

/**
 * Zoho's embed snippet ships a `<script>` that appends the hosting page's URL to
 * the iframe `src` as `referrername`, so submissions record where they came
 * from. This is that script, unchanged in behaviour and rewritten as a function
 * so it runs once per embed instead of as four copies of inline JS.
 *
 * The details that look arbitrary are theirs and are kept deliberately:
 *
 * - The regex requires a dot and a TLD, so `http://localhost:3000` fails it and
 *   no referrer is sent in development. That is intended — it keeps local page
 *   URLs out of the form records.
 * - Reading `window.top.location.href` throws when the page is framed
 *   cross-origin, hence the try/catch.
 * - Over 1800 characters the query string is dropped first, then the whole
 *   thing is truncated. Zoho's field has a limit.
 */
function withReferrer(src) {
  if (/[?&]referrername=/.test(src)) return src;

  let rfr = "";
  try {
    rfr =
      window.self !== window.top
        ? window.top.location.href
        : /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(window.location.href)
          ? window.location.href
          : "";
  } catch {
    rfr = "";
  }
  if (!rfr) return src;

  if (rfr.length > 1800) {
    const queryIndex = rfr.indexOf("?");
    if (queryIndex > -1) rfr = rfr.substring(0, queryIndex);
    if (rfr.length > 1800) rfr = rfr.substring(0, 1800);
  }

  return `${src}${src.indexOf("?") > 0 ? "&" : "?"}referrername=${encodeURIComponent(rfr)}`;
}

/**
 * A Zoho form, filling whatever box it is given.
 *
 * Zoho's own snippet hard-codes `height:500px`. That is wrong for this site:
 * every intake screen is exactly one viewport tall and hands the form all the
 * height that is left, so the frame is sized by its container and the form
 * scrolls inside it. A fixed 500px would either leave a gap on a desktop or
 * overflow a laptop.
 *
 * A form with a declared `height` is drawn at that height, centred in whatever
 * box it was handed, and shrinks if the box is smaller. A form without one
 * fills the box outright. Either way the parent needs a definite height for the
 * shrinking half to work — a flex or grid child that stretches, which is what
 * the intake layout gives it. The contact and grievance pages have no such
 * height and do not need one — they set an explicit height class at the call
 * site and the card grows to fit.
 *
 * The frame is mounted client-side only. The `referrername` value comes from
 * `window.location`, which does not exist during the static export, so building
 * the URL on the server and correcting it on the client would either mismatch
 * during hydration or load the form twice. Waiting a tick costs one frame and
 * these screens are noindexed anyway — there is nothing for a crawler to miss.
 */
/**
 * @param {{ form: string, className?: string }} props
 */
export function ZohoFormSlot({ form, className = undefined }) {
  const config = ZOHO_FORMS[form];
  const [src, setSrc] = React.useState(null);

  React.useEffect(() => {
    if (config) setSrc(withReferrer(config.src));
  }, [config]);

  const height = config?.height ?? null;

  return (
    // The outer box is the full space the caller gave us; the inner one is the
    // frame. They are the same thing when no height is declared.
    <div className="flex h-full min-h-0 w-full items-center">
      <div
        data-zoho-slot={form}
        style={height ? { "--zoho-form-height": height } : undefined}
        className={cn(
          "h-full w-full overflow-hidden rounded-card border-2 border-scheme-border bg-white",
          // The declared height only applies from `lg`, where the two-column
          // layout leaves surplus height to centre the frame in. Below that the
          // stacked layout is tight enough that the form should take everything
          // it can get, and there is no surplus to look empty.
          //
          // The cap is measured off the viewport, not off the parent. `100%`
          // here would be circular — the row sizes to its content, the content
          // is a percentage of the row — and the browser resolves that circle
          // by letting the row grow, which put 325px of page scroll on a phone.
          // `100dvh` is a fixed reference, so it caps instead of feeding back.
          // The 8rem is the step bar plus the bottom padding, with slack.
          height &&
            "lg:h-[var(--zoho-form-height)] lg:max-h-[calc(100dvh-8rem)]",
          className,
        )}
      >
        {config && src && (
          <iframe
            src={src}
            title={config.title}
            className="block size-full border-0"
          />
        )}
        {!config && <UnknownForm form={form} />}
      </div>
    </div>
  );
}

/**
 * Only reachable from a typo in the `form` prop. Loud enough to notice in
 * development, quiet enough not to look like a design element if it ever ships.
 */
function UnknownForm({ form }) {
  return (
    <div className="flex size-full flex-col items-center justify-center p-6 text-center">
      <p className="font-semibold">No form is registered as “{form}”</p>
      <p className="mt-2 max-w-sm text-small text-scheme-text/60">
        Add it to ZOHO_FORMS in components/forms/zoho-form-slot.jsx.
      </p>
    </div>
  );
}
