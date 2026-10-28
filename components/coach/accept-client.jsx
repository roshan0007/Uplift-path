"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EMAIL_PATTERN,
  readCoachCase,
  sendCoachResponse,
} from "@/lib/coach-response";
import React from "react";

/**
 * /accept-client — where a coach lands from the "new client" email.
 *
 * The link is `/accept-client?case=UPW-123`. The page shows the case id and
 * nothing else about the client: no name, no details, ever. The coach types
 * their own email, which is how the CRM knows who is answering, and presses
 * Accept or Decline.
 *
 * Opening the link does nothing. Mail scanners and link previewers open every
 * URL in an email, so a request that changes the CRM may only follow a button
 * press. The one request that can happen earlier is the read-only `check`,
 * and only once the coach has typed a valid email and left the field.
 *
 * Same frame as the cancel/reschedule pages: a short centred message on the
 * `hero-fade` wash, `.scheme-light`, nothing new to the brand.
 */

const PHONE_DISPLAY = "(513) 299-4553";
const PHONE_HREF = "tel:+15132994553";

/** The panel every state sits in. The heading takes focus when the state changes. */
function Panel({ eyebrow, title, headingRef, children }) {
  return (
    <section className="relative flex min-h-[60vh] items-center px-[5%] py-16 md:py-24 lg:py-28 scheme-light hero-fade badge-alt">
      <div className="relative container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-5 text-balance text-h2 font-bold focus:outline-none md:mb-6"
        >
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}

function CaseCard({ caseId }) {
  return (
    <div className="mx-auto mt-6 max-w-md rounded-card border-2 border-scheme-border p-5 text-center md:mt-8 md:p-6">
      <p className="text-small text-scheme-text/60">Case</p>
      <p className="mt-1 text-medium font-semibold">{caseId}</p>
    </div>
  );
}

function CallUs() {
  return (
    <p className="mt-6 text-small text-scheme-text/60">
      Questions? Call the Uplift Path team on{" "}
      <a href={PHONE_HREF} className="underline">
        {PHONE_DISPLAY}
      </a>
      .
    </p>
  );
}

/** What each result of the CRM becomes on the page. */
const NOTICES = {
  not_offered:
    "This link isn't for that email address. Check you typed the email this message was sent to.",
  error:
    "Something went wrong on our side, so nothing was recorded. Please try again in a moment.",
  unconfirmed:
    "Something went wrong and we couldn't confirm whether your response was recorded. Please check again in a moment, or call the team.",
};

export function AcceptClient() {
  const eyebrow = "New Client";
  const headingRef = React.useRef(null);
  const emailRef = React.useRef(null);

  // "reading" until the URL has been read; then "invalid" | "form" | "done".
  const [phase, setPhase] = React.useState("reading");
  const [caseId, setCaseId] = React.useState(null);
  // accepted | rejected | already_taken — only meaningful once phase is "done".
  const [outcome, setOutcome] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  // "idle" | "checking" | "accept" | "reject". Anything but idle blocks a second press.
  const [busy, setBusy] = React.useState("idle");
  // A key into NOTICES, or null.
  const [notice, setNotice] = React.useState(null);
  // The last email a read-only check ran for, so blurring twice does not repeat it.
  const checkedFor = React.useRef("");

  React.useEffect(() => {
    const id = readCoachCase();
    setCaseId(id);
    setPhase(id ? "form" : "invalid");
  }, []);

  // A new screen replaces the old one, so tell keyboard and screen-reader
  // users: move focus to its heading. Not on first paint.
  const settled = React.useRef(false);
  React.useEffect(() => {
    if (phase === "reading") return;
    if (settled.current) headingRef.current?.focus();
    settled.current = true;
  }, [phase]);

  /** Applies a CRM result. Returns true if it ended the form. */
  const apply = (result) => {
    if (result === "accepted" || result === "rejected" || result === "already_taken") {
      setOutcome(result);
      setNotice(null);
      setPhase("done");
      return true;
    }
    if (result === "not_found") {
      setPhase("invalid");
      return true;
    }
    if (result === "not_offered") {
      setNotice("not_offered");
    } else if (result !== "open") {
      setNotice("error");
    } else {
      setNotice(null);
    }
    return false;
  };

  const validEmail = (value) => value.length <= 254 && EMAIL_PATTERN.test(value);

  /** The optional read-only look-up, once there is a plausible email. */
  const check = async () => {
    const value = email.trim();
    if (busy !== "idle" || !validEmail(value) || checkedFor.current === value) return;
    checkedFor.current = value;
    setBusy("checking");
    const result = await sendCoachResponse({ caseId, email: value, decision: "check" });
    setBusy("idle");
    // A failed look-up is not worth a message: it is optional, and pressing a
    // button tries again for real.
    if (result === "error") {
      checkedFor.current = "";
      return;
    }
    apply(result);
  };

  const decide = async (decision) => {
    if (busy !== "idle") return;
    const value = email.trim();
    if (!validEmail(value)) {
      setEmailError(
        value
          ? "Enter a valid email address, like name@example.com."
          : "Enter your email address so we know who is answering.",
      );
      emailRef.current?.focus();
      return;
    }
    setEmailError(null);
    setNotice(null);
    setBusy(decision);
    let result = await sendCoachResponse({ caseId, email: value, decision });
    // An error does not mean nothing happened: the CRM can finish the pairing
    // after the Worker or the browser has stopped waiting. Ask read-only before
    // telling the coach their press was lost.
    let confirmed = true;
    if (result === "error") {
      const look = await sendCoachResponse({ caseId, email: value, decision: "check" });
      if (look === "already_taken") result = look;
      else confirmed = look !== "error";
    }
    setBusy("idle");
    if (!apply(result) && result === "error" && !confirmed) setNotice("unconfirmed");
  };

  if (phase === "reading") {
    return (
      <Panel eyebrow={eyebrow} title="New Client" headingRef={headingRef}>
        <p aria-live="polite" className="text-medium">
          Loading…
        </p>
      </Panel>
    );
  }

  if (phase === "invalid") {
    return (
      <Panel eyebrow={eyebrow} title="This Link Isn't Valid" headingRef={headingRef}>
        <p className="text-medium">
          We couldn't recognise this link. Please open the full link from the
          email we sent you.
        </p>
        <CallUs />
      </Panel>
    );
  }

  if (phase === "done") {
    const copy = {
      accepted: {
        title: "You've Accepted This Client",
        body: "Thank you. You are now matched with this client.",
      },
      rejected: {
        title: "You've Declined This Client",
        body: "Thank you for letting us know. We have recorded your decision.",
      },
      already_taken: {
        title: "Already Matched",
        body: "This client has already been matched. There is nothing more for you to do.",
      },
    }[outcome];
    return (
      <Panel eyebrow={eyebrow} title={copy.title} headingRef={headingRef}>
        <p className="text-medium">{copy.body}</p>
        <CaseCard caseId={caseId} />
        <CallUs />
      </Panel>
    );
  }

  const working = busy === "accept" || busy === "reject";
  const errorId = "coach-email-error";
  const hintId = "coach-email-hint";

  return (
    <Panel eyebrow={eyebrow} title="Accept This Client?" headingRef={headingRef}>
      <p className="text-medium">
        A new client has been offered to you. Enter your email address, then
        choose whether to accept or decline.
      </p>
      <CaseCard caseId={caseId} />

      <form
        noValidate
        className="mt-6 text-left md:mt-8"
        onSubmit={(event) => {
          // Enter in the email field must never accept or decline. It only
          // runs the read-only look-up.
          event.preventDefault();
          check();
        }}
      >
        <div className="grid">
          <Label htmlFor="coach-email" className="mb-2">
            Your email address
          </Label>
          <Input
            ref={emailRef}
            id="coach-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={email}
            disabled={working}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? `${hintId} ${errorId}` : hintId}
            className="focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-scheme-text)]"
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(null);
              setNotice(null);
            }}
            onBlur={check}
          />
          <p id={hintId} className="mt-2 text-small text-scheme-text/60">
            Use the address this message was sent to.
          </p>
          {emailError && (
            <p id={errorId} role="alert" className="mt-2 text-small font-semibold">
              {emailError}
            </p>
          )}
        </div>

        {/* One live region for every message below the field, so a screen
            reader hears the result of a press without hunting for it. */}
        <div aria-live="polite" className="mt-5 text-center">
          {busy === "checking" && <p className="text-small">Checking…</p>}
          {working && (
            <p className="text-small">
              {busy === "accept" ? "Recording your acceptance…" : "Recording your decision…"}
            </p>
          )}
          {notice && (
            <p
              role="alert"
              className="rounded-card border-2 border-scheme-border p-4 text-small font-semibold"
            >
              {NOTICES[notice]}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          <Button
            type="button"
            title="Accept this client"
            disabled={busy !== "idle"}
            onClick={() => decide("accept")}
          >
            Accept
          </Button>
          <Button
            type="button"
            variant="secondary"
            title="Decline this client"
            disabled={busy !== "idle"}
            onClick={() => decide("reject")}
          >
            Decline
          </Button>
        </div>
      </form>

      <CallUs />
    </Panel>
  );
}
