"use client";

import { Button } from "@/components/ui/button";
import { bookSlot, dayKey, fetchSlots } from "@/lib/booking-api";
import { readCaseId, withCaseId } from "@/lib/case-id";
import { cn } from "@/lib/utils";
import React from "react";
import { ChevronLeft, ChevronRight } from "relume-icons";

/**
 * Step 3 of the intake funnel: pick a date, then a time, then confirm.
 *
 * Availability and booking both go through the `uplift-api` Worker, which
 * fronts Zoho Bookings — see `lib/booking-api.js` for the contract. Nothing
 * in this file talks to Zoho directly.
 *
 * Zoho has no "which days have anything open" call, only "what is open on this
 * day", and each answer takes a few seconds. So every day in the window is
 * offered, a day's times are fetched when it is picked, and each answer is
 * kept for the life of the page so going back to a day is instant.
 *
 * Confirm books the slot for the case in the URL and only moves on to consent
 * once Zoho has accepted it. If Zoho refuses — most often because someone else
 * took the slot in the meantime — the reason is shown and that day's times are
 * fetched again, so the one that went is no longer on offer.
 *
 * Shaped like the schedulers people already know — a month on the left, that
 * day's times on the right, a confirm bar underneath — because this is the one
 * screen in the funnel that is not a form, and a visitor three steps into an
 * application should not have to learn a new control.
 *
 * Drawn in the brand rather than a booking-widget skin: 2px borders, the 12px
 * "bubble" radius that inputs and buttons use, a 5% wash on hover exactly like
 * the inputs, and a selected day filled solid in the scheme text colour — the
 * same fill the step indicator uses for a completed step. No shadows on the
 * cells; the only shadow in this system is the ledge under a button, and
 * forty-two ledges in a grid would be noise.
 */

/**
 * Where a confirmed booking goes. Step 4 of the funnel.
 *
 * The case id is appended at render — this screen is the one hop in the funnel
 * that is not a Zoho redirect, so it is the one hop that has to carry the id
 * forward itself.
 */
const NEXT_STEP_HREF = "/consent-form";

/** Where someone who arrived without a case id is sent to get one. */
const START_HREF = "/for-individual";

/** How far ahead the calendar will let anyone look. */
const MONTHS_AHEAD = 3;

/**
 * On first load, how many days to walk forward looking for one with anything
 * open, so the times column is not empty before anyone has touched it. Stops
 * the moment the visitor picks a day themselves.
 */
const AUTO_ADVANCE_DAYS = 14;

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * Today onwards, within the window the calendar shows. Today is included —
 * Zoho only returns times that are still ahead, so a late-afternoon visit just
 * gets an empty day rather than a past slot.
 */
function isBookable(date, today) {
  if (date < today) return false;
  return date <= addDays(today, MONTHS_AHEAD * 31);
}

/** "09:45" → "9:45 AM". */
function formatTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours < 12 ? "AM" : "PM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export function SessionScheduler() {
  // `today` is resolved on mount, never during render. These routes are
  // statically exported, so a date read at render time would be baked in at
  // build and disagree with the browser's clock on hydration — and the
  // disagreement would be silent, showing a stale month to real visitors.
  const [today, setToday] = React.useState(null);
  const [caseId, setCaseId] = React.useState(null);
  const [viewMonth, setViewMonth] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  // dayKey → { status: "loading" | "ready" | "error", slots?, error? }
  const [days, setDays] = React.useState({});
  // "idle" | "booking" | "booked"
  const [booking, setBooking] = React.useState("idle");
  const [bookingError, setBookingError] = React.useState(null);
  const autoAdvance = React.useRef(0);

  React.useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setCaseId(readCaseId());
    setViewMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
    autoAdvance.current = AUTO_ADVANCE_DAYS;
  }, []);

  // Fetch the selected day's times, once. Answers land in `days` by key, so a
  // slow reply for a day the visitor has already moved on from just fills the
  // cache instead of overwriting what is on screen.
  const requested = React.useRef(new Set());
  const load = React.useCallback((date, { force = false } = {}) => {
    const key = dayKey(date);
    if (!force && requested.current.has(key)) return;
    requested.current.add(key);
    setDays((current) => ({ ...current, [key]: { status: "loading" } }));
    fetchSlots(date).then(
      (slots) =>
        setDays((current) => ({ ...current, [key]: { status: "ready", slots } })),
      (error) =>
        setDays((current) => ({
          ...current,
          [key]: { status: "error", error: error.message },
        })),
    );
  }, []);

  React.useEffect(() => {
    if (selectedDate) load(selectedDate);
  }, [selectedDate, load]);

  const selectedDay = selectedDate ? days[dayKey(selectedDate)] : undefined;

  // First load only: if the day on screen came back empty, step to the next
  // one, following it into the next month if need be.
  React.useEffect(() => {
    if (!autoAdvance.current || selectedDay?.status !== "ready") return;
    if (selectedDay.slots.length > 0) {
      autoAdvance.current = 0;
      return;
    }
    autoAdvance.current -= 1;
    const next = addDays(selectedDate, 1);
    setSelectedDate(next);
    setViewMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  }, [selectedDay, selectedDate]);

  if (!today || !viewMonth) return <SchedulerFrame />;

  const busy = booking !== "idle";

  const monthStart = viewMonth;
  const firstWeekday = monthStart.getDay();
  const daysInMonth = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0,
  ).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(
    today.getFullYear(),
    today.getMonth() + MONTHS_AHEAD,
    1,
  );
  const canGoBack = monthStart > currentMonthStart;
  const canGoForward = monthStart < lastMonthStart;

  const shiftMonth = (delta) =>
    setViewMonth(
      new Date(monthStart.getFullYear(), monthStart.getMonth() + delta, 1),
    );

  const pickDate = (date) => {
    if (busy) return;
    autoAdvance.current = 0;
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingError(null);
  };

  const pickSlot = (slot) => {
    if (busy) return;
    setSelectedSlot(slot);
    setBookingError(null);
  };

  const confirm = async () => {
    if (!selectedSlot || busy || !caseId) return;
    setBooking("booking");
    setBookingError(null);
    try {
      await bookSlot({ caseId, date: selectedDate, slot: selectedSlot });
      setBooking("booked");
      window.location.assign(withCaseId(NEXT_STEP_HREF, caseId));
    } catch (error) {
      setBooking("idle");
      setBookingError(error.message);
      setSelectedSlot(null);
      load(selectedDate, { force: true });
    }
  };

  const times = selectedDay?.status === "ready" ? selectedDay.slots : [];
  const ready = Boolean(selectedDate && selectedSlot);

  let status;
  if (!caseId) {
    status = (
      <>
        We can't find your application reference, so this session can't be
        booked yet.{" "}
        <a href={START_HREF} className="underline">
          Start your application
        </a>{" "}
        and you'll be brought back here.
      </>
    );
  } else if (bookingError) {
    status = bookingError;
  } else if (booking === "booking") {
    status = "Booking your session…";
  } else if (booking === "booked") {
    status = "You're booked. Taking you to the last step…";
  } else if (ready) {
    status = `${longDateFormatter.format(selectedDate)} at ${formatTime(selectedSlot.time)}`;
  } else {
    status = "Choose a date and a time to continue.";
  }

  return (
    <SchedulerFrame>
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:overflow-hidden">
        {/* Month */}
        <div className="p-5 md:min-h-0 md:overflow-y-auto md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-semibold">{monthFormatter.format(monthStart)}</p>
            <div className="flex items-center gap-2">
              <MonthButton
                label="Previous month"
                disabled={!canGoBack}
                onClick={() => shiftMonth(-1)}
              >
                <ChevronLeft className="size-5 text-scheme-text" />
              </MonthButton>
              <MonthButton
                label="Next month"
                disabled={!canGoForward}
                onClick={() => shiftMonth(1)}
              >
                <ChevronRight className="size-5 text-scheme-text" />
              </MonthButton>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1.5">
            {WEEKDAY_LABELS.map((day) => (
              <span
                key={day}
                className="text-center text-small text-scheme-text/50"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: cellCount }, (_, index) => {
              const dayNumber = index - firstWeekday + 1;
              if (dayNumber < 1 || dayNumber > daysInMonth) {
                return <span key={index} aria-hidden="true" />;
              }
              const date = new Date(
                monthStart.getFullYear(),
                monthStart.getMonth(),
                dayNumber,
              );
              return (
                <DayCell
                  key={index}
                  date={date}
                  label={longDateFormatter.format(date)}
                  bookable={isBookable(date, today)}
                  selected={sameDay(date, selectedDate)}
                  isToday={sameDay(date, today)}
                  onSelect={() => pickDate(date)}
                />
              );
            })}
          </div>
        </div>

        {/* That day's times */}
        <div className="border-t-2 border-scheme-border p-5 md:min-h-0 md:overflow-y-auto md:border-t-0 md:border-l-2 md:p-6">
          <p className="font-semibold">
            {selectedDate ? shortDateFormatter.format(selectedDate) : "Times"}
          </p>
          <p className="mt-1 text-small text-scheme-text/60">
            Eastern Time (ET)
          </p>

          <div aria-live="polite">
            {times.length > 0 ? (
              <div className="mt-4 flex flex-col gap-2">
                {times.map((slot) => (
                  <TimeCell
                    key={slot.time}
                    label={formatTime(slot.time)}
                    selected={slot.time === selectedSlot?.time}
                    onSelect={() => pickSlot(slot)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-small text-scheme-text/60">
                {!selectedDate
                  ? "Pick a date to see the times that are open."
                  : !selectedDay || selectedDay.status === "loading"
                    ? "Checking what's open…"
                    : selectedDay.status === "error"
                      ? selectedDay.error
                      : "Nothing open on this day. Try another date."}
              </p>
            )}
            {selectedDay?.status === "error" && (
              <button
                type="button"
                onClick={() => load(selectedDate, { force: true })}
                className="mt-3 text-small underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirm bar */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-2 border-scheme-border p-5 md:p-6">
        <p
          aria-live="polite"
          className={cn(
            "text-small",
            !ready && !bookingError && caseId && "text-scheme-text/60",
          )}
        >
          {status}
        </p>
        <Button
          title="Confirm time"
          disabled={!ready || busy || !caseId}
          onClick={confirm}
        >
          {busy ? "Booking…" : "Confirm Time"}
        </Button>
      </div>
    </SchedulerFrame>
  );
}

/**
 * The card itself, rendered with or without content.
 *
 * It exists separately so the pre-mount state is the same box as the mounted
 * one — the calendar cannot render until the browser has told it what day it
 * is, and a box that appears at a different size a frame later reads as a
 * glitch.
 */
function SchedulerFrame({ children = null }) {
  return (
    // `max-h-full` rather than `h-full`, centred in whatever height it is
    // given. The Zoho screens have to stretch — an iframe cannot report its own
    // height, so it takes the box it is given or nothing. This one knows
    // exactly how tall it wants to be, so on a tall display it hugs its content
    // instead of drawing a 2px rectangle around a lot of nothing, and on a
    // short one it fills and the two panes scroll inside themselves.
    <div className="flex h-full min-h-0 items-center">
      <div className="flex max-h-full w-full min-h-0 flex-col overflow-hidden rounded-card border-2 border-scheme-border">
        {children}
      </div>
    </div>
  );
}

function MonthButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-form border-2 border-scheme-border transition-all duration-200 ease-in-out hover:bg-neutral-darkest-5 disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  );
}

function DayCell({ date, label, bookable, selected, isToday, onSelect }) {
  if (!bookable) {
    return (
      <span className="flex aspect-square items-center justify-center text-small text-scheme-text/25">
        {date.getDate()}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex aspect-square items-center justify-center rounded-form border-2 border-scheme-border text-small transition-all duration-200 ease-in-out",
        selected
          ? "bg-scheme-text text-scheme-background"
          : "hover:bg-neutral-darkest-5",
        // Today is marked by weight, not by a second colour — the calendar
        // already has one filled state and adding another would make two
        // things compete to look chosen.
        isToday && !selected && "font-semibold",
      )}
    >
      {date.getDate()}
    </button>
  );
}

function TimeCell({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "min-h-11 w-full rounded-form border-2 border-scheme-border px-3 py-2 text-center transition-all duration-200 ease-in-out",
        selected
          ? "bg-scheme-text text-scheme-background"
          : "hover:bg-neutral-darkest-5",
      )}
    >
      {label}
    </button>
  );
}
