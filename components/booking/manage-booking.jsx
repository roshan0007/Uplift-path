"use client";

import { SessionScheduler } from "@/components/booking/session-scheduler";
import { Button } from "@/components/ui/button";
import {
  cancelBooking,
  fetchBooking,
  formatSession,
  rescheduleBooking,
} from "@/lib/booking-api";
import { readCaseId, withCaseId } from "@/lib/case-id";
import React from "react";

/**
 * /cancel-appointment and /reschedule-booking.
 *
 * When a session is booked, the `uplift-api` Worker writes two links onto the
 * client's CRM record — `/cancel-appointment?caseid=…` and
 * `/reschedule-booking?caseid=…` — and the confirmation messages send them on.
 * These are the pages those links land on. Both look the booking up first, so
 * the client sees which session they are about to change before anything
 * happens, and neither changes anything without an explicit second click.
 *
 * Same frame as the thank-you and 404 pages (StatusPanel): a short centred
 * message on the `hero-fade` wash, `.scheme-light`, nothing new to the brand.
 */

const PHONE_DISPLAY = "(513) 299-4553";
const PHONE_HREF = "tel:+15132994553";

/** Where someone without a usable link is pointed to start over. */
const START_HREF = "/peer-coaching";

/**
 * Looks the booking up once the case id has been read from the URL.
 * `state.status` is "loading" | "missing" | "error" | "none" | "ready".
 */
function useBooking() {
  const [caseId, setCaseId] = React.useState(null);
  const [state, setState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    const id = readCaseId();
    setCaseId(id);
    if (!id) {
      setState({ status: "missing" });
      return;
    }
    let live = true;
    fetchBooking(id).then(
      (booking) => {
        if (!live) return;
        setState(
          booking.hasBooking
            ? { status: "ready", booking }
            : { status: "none", booking },
        );
      },
      (error) => live && setState({ status: "error", error: error.message }),
    );
    return () => {
      live = false;
    };
  }, []);

  return { caseId, state };
}

function Panel({ eyebrow, title, children, wide = false }) {
  return (
    <section className="relative flex min-h-[60vh] items-center px-[5%] py-16 md:py-24 lg:py-28 scheme-light hero-fade badge-alt">
      <div
        className={
          wide
            ? "relative container max-w-3xl"
            : "relative container max-w-lg text-center"
        }
      >
        <div className={wide ? "mx-auto max-w-lg text-center" : undefined}>
          <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
          <h1 className="mb-5 text-balance text-h2 font-bold md:mb-6">{title}</h1>
        </div>
        {children}
      </div>
    </section>
  );
}

function Actions({ children }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
      {children}
    </div>
  );
}

/** The session being changed: who and when, in a 2px card. */
function SessionCard({ booking, label = "Your session" }) {
  const when = formatSession(booking.start);
  return (
    <div className="mx-auto mt-6 max-w-md rounded-card border-2 border-scheme-border p-5 text-center md:mt-8 md:p-6">
      <p className="text-small text-scheme-text/60">{label}</p>
      <p className="mt-1 text-medium font-semibold">
        {when ?? "Time not on record"}
      </p>
      {booking.name && <p className="mt-1 text-small">{booking.name}</p>}
    </div>
  );
}

function CallUs() {
  return (
    <p className="mt-6 text-small text-scheme-text/60">
      Questions, or would rather talk to someone? Call us on{" "}
      <a href={PHONE_HREF} className="underline">
        {PHONE_DISPLAY}
      </a>
      .
    </p>
  );
}

/** Loading, missing link, lookup error and "nothing booked" — shared by both pages. */
function LookupStates({ eyebrow, caseId, state }) {
  if (state.status === "loading") {
    return (
      <Panel eyebrow={eyebrow} title="Finding Your Session">
        <p aria-live="polite" className="text-medium">
          Looking up your appointment…
        </p>
      </Panel>
    );
  }

  if (state.status === "missing" || state.status === "error") {
    return (
      <Panel eyebrow={eyebrow} title="We Couldn't Find Your Session">
        <p className="text-medium">
          {state.status === "missing"
            ? "This link is missing your booking reference. Please open the full link from your confirmation message."
            : state.error}
        </p>
        <CallUs />
      </Panel>
    );
  }

  // status === "none"
  return (
    <Panel eyebrow={eyebrow} title="No Session Is Booked">
      <p className="text-medium">
        There is no session booked under this link, so there is nothing to
        change. You can choose a time now.
      </p>
      <Actions>
        <Button asChild title="Book a session">
          <a href={withCaseId("/booking", caseId)}>Book a Session</a>
        </Button>
      </Actions>
      <CallUs />
    </Panel>
  );
}

export function CancelAppointment() {
  const eyebrow = "Cancel Appointment";
  const { caseId, state } = useBooking();
  // "idle" | "cancelling" | "cancelled"
  const [phase, setPhase] = React.useState("idle");
  const [error, setError] = React.useState(null);

  if (state.status !== "ready") {
    return <LookupStates eyebrow={eyebrow} caseId={caseId} state={state} />;
  }

  const confirm = async () => {
    if (phase !== "idle") return;
    setPhase("cancelling");
    setError(null);
    try {
      await cancelBooking(caseId);
      setPhase("cancelled");
    } catch (err) {
      setPhase("idle");
      setError(err.message);
    }
  };

  if (phase === "cancelled") {
    return (
      <Panel eyebrow={eyebrow} title="Your Session Is Cancelled">
        <p className="text-medium">
          Your session has been cancelled. You can book again whenever you
          are ready.
        </p>
        <SessionCard booking={state.booking} label="Cancelled" />
        <Actions>
          <Button asChild title="Book a new time">
            <a href={withCaseId("/booking", caseId)}>Book a New Time</a>
          </Button>
          <Button asChild variant="secondary" title="Return to home page">
            <a href="/">Return to Home Page</a>
          </Button>
        </Actions>
        <CallUs />
      </Panel>
    );
  }

  const busy = phase === "cancelling";

  return (
    <Panel eyebrow={eyebrow} title="Cancel Your Session?">
      <p className="text-medium">
        Please confirm you want to cancel the session below. If the time just
        doesn't work, you can pick a new one instead.
      </p>
      <SessionCard booking={state.booking} />
      {error && (
        <p role="alert" className="mt-5 text-small font-semibold">
          {error}
        </p>
      )}
      <Actions>
        <Button title="Yes, cancel my session" disabled={busy} onClick={confirm}>
          {busy ? "Cancelling…" : "Yes, Cancel My Session"}
        </Button>
        <Button asChild variant="secondary" title="Keep my session">
          <a href="/">Keep My Session</a>
        </Button>
      </Actions>
      <p className="mt-6 text-small">
        <a
          href={withCaseId("/reschedule-booking", caseId)}
          className="underline"
        >
          Choose a different time instead
        </a>
      </p>
      <CallUs />
    </Panel>
  );
}

export function RescheduleBooking() {
  const eyebrow = "Reschedule Appointment";
  const { caseId, state } = useBooking();
  const [moved, setMoved] = React.useState(null);

  if (state.status !== "ready") {
    return <LookupStates eyebrow={eyebrow} caseId={caseId} state={state} />;
  }

  if (moved) {
    // The new time as picked, which is Eastern wall-clock already — see
    // `formatSession` for why the stored one is read back in UTC.
    const [hours, minutes] = moved.slot.time.split(":").map(Number);
    const start = new Date(
      Date.UTC(
        moved.date.getFullYear(),
        moved.date.getMonth(),
        moved.date.getDate(),
        hours,
        minutes,
      ),
    );
    return (
      <Panel eyebrow={eyebrow} title="Your Session Has Moved">
        <p className="text-medium">
          You're all set. We have moved your session to the new time below.
        </p>
        <SessionCard booking={{ ...state.booking, start }} label="New time" />
        <Actions>
          <Button asChild title="Return to home page">
            <a href="/">Return to Home Page</a>
          </Button>
        </Actions>
        <CallUs />
      </Panel>
    );
  }

  return (
    <Panel eyebrow={eyebrow} title="Choose A New Time" wide>
      <div className="mx-auto max-w-lg text-center">
        <p className="text-medium">
          Pick a new day and time below. Your current session stays booked
          until you confirm the new one.
        </p>
        <SessionCard booking={state.booking} label="Current session" />
      </div>
      {/* The scheduler's time stage is height-bounded from `lg` (it lifts out
          of flow into its parent), so it needs a parent with a real height.
          On the intake page the grid row supplies one; here it is set. */}
      <div className="mt-8 text-left md:mt-10 lg:h-[36rem]">
        <SessionScheduler
          submit={rescheduleBooking}
          onBooked={(booked) => setMoved(booked)}
        />
      </div>
      <div className="text-center">
        <p className="mt-6 text-small">
          <a
            href={withCaseId("/cancel-appointment", caseId)}
            className="underline"
          >
            Cancel this session instead
          </a>
        </p>
        <CallUs />
      </div>
    </Panel>
  );
}
