"use client";

import { Button } from "@/components/ui/button";
import { bookSlot, dayKey, fetchSlots } from "@/lib/booking-api";
import { readCaseId, withCaseId } from "@/lib/case-id";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React from "react";
import { ArrowBack, ChevronLeft, ChevronRight } from "relume-icons";

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
 * Two stages in one card, so whichever choice is next gets the whole card
 * (2026-09-29 redesign). The first version put a month and a day's times side
 * by side; the times column was a quarter of the card, so a busy day was a
 * long narrow list to scroll through.
 *
 *   1. **Date.** The month, full width, plus a shortcut to the earliest day
 *      that has anything open (found by the auto-advance below).
 *   2. **Time.** Picking a day swaps the month for that day: a "Change date"
 *      way back, a seven-day strip to hop between neighbouring days without
 *      going back to the month, and the times as a three- or four-column grid
 *      grouped into morning / afternoon / evening. The confirm bar lives here.
 *
 * Motion is the brand's: opacity plus a small y-translate, 300ms on the
 * standard curve, a short stagger on the time chips. Nothing springs or
 * scales, and all of it is dropped under `prefers-reduced-motion`.
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
const START_HREF = "/peer-coaching";

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

  // "date" (the month) or "time" (one day's times). See the header comment.
  const [stage, setStage] = React.useState("date");
  // The first day the auto-advance found with anything open, offered as a
  // shortcut from the month.
  const [earliest, setEarliest] = React.useState(null);
  const reduceMotion = useReducedMotion();
  const timeHeadingRef = React.useRef(null);
  const monthHeadingRef = React.useRef(null);

  React.useEffect(() => {
    if (earliest || autoAdvance.current !== 0) return;
    if (selectedDay?.status === "ready" && selectedDay.slots.length > 0) {
      setEarliest(selectedDate);
    }
  }, [earliest, selectedDay, selectedDate]);

  // Move focus with the stage, so a keyboard or screen-reader user lands on
  // the new content instead of on a control that has just been removed.
  // Compared against the last stage rather than skipped on first run, so it
  // cannot fire on load (dev mode runs effects twice) and steal focus.
  const lastStage = React.useRef(stage);
  React.useEffect(() => {
    if (lastStage.current === stage) return;
    lastStage.current = stage;
    const target = stage === "time" ? timeHeadingRef : monthHeadingRef;
    const id = window.setTimeout(() => target.current?.focus(), 320);
    return () => window.clearTimeout(id);
  }, [stage]);

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
    status = "Choose a time to continue.";
  }

  const openDay = (date) => {
    if (busy) return;
    pickDate(date);
    setStage("time");
  };

  const backToMonth = () => {
    if (busy) return;
    setViewMonth(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    );
    setStage("date");
  };

  // The week strip: Sunday to Saturday around the selected day.
  const weekStart = selectedDate
    ? addDays(selectedDate, -selectedDate.getDay())
    : today;
  const week = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const canPrevWeek = addDays(weekStart, -1) >= today;
  const canNextWeek = isBookable(addDays(weekStart, 7), today);
  const shiftWeek = (delta) => {
    let target = addDays(selectedDate, delta * 7);
    if (target < today) target = today;
    if (isBookable(target, today)) pickDate(target);
  };

  const knownEmpty = (date) => {
    const day = days[dayKey(date)];
    return day?.status === "ready" && day.slots.length === 0;
  };

  // Zoho returns 24-hour "HH:MM" strings.
  const groups = [
    { label: "Morning", test: (hour) => hour < 12 },
    { label: "Afternoon", test: (hour) => hour >= 12 && hour < 17 },
    { label: "Evening", test: (hour) => hour >= 17 },
  ]
    .map((group) => ({
      label: group.label,
      slots: times.filter((slot) => group.test(Number(slot.time.split(":")[0]))),
    }))
    .filter((group) => group.slots.length > 0);

  // The brand's motion: opacity plus a small y-translate on the standard
  // curve. Under reduced motion everything appears in place, instantly.
  const ease = [0.4, 0, 0.2, 1];
  const stageMotion = reduceMotion
    ? { initial: false, exit: { opacity: 0, transition: { duration: 0 } } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
        exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease } },
      };
  const swapMotion = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2, ease } },
        exit: { opacity: 0, transition: { duration: 0.1, ease } },
      };
  const chipMotion = (index) =>
    reduceMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 4 },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease, delay: Math.min(index, 16) * 0.015 },
          },
        };

  let offset = 0;

  return (
    <SchedulerFrame bounded={stage === "time"}>
      <AnimatePresence mode="popLayout" initial={false}>
        {stage === "date" ? (
          <motion.div
            key="date"
            className="flex min-h-0 flex-1 flex-col"
            {...stageMotion}
          >
            <div className="relative min-h-0 flex-1 overflow-y-auto p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p
                    ref={monthHeadingRef}
                    tabIndex={-1}
                    className="font-semibold outline-none md:text-medium"
                  >
                    {monthFormatter.format(monthStart)}
                  </p>
                  <p className="mt-1 text-small text-scheme-text/60">
                    Pick a day to see its open times.
                  </p>
                </div>
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

              <div className="mb-2 grid grid-cols-7 gap-1.5 md:gap-2">
                {WEEKDAY_LABELS.map((day) => (
                  <span
                    key={day}
                    className="text-center text-small text-scheme-text/50"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={dayKey(monthStart)}
                  className="grid grid-cols-7 gap-1.5 md:gap-2"
                  {...swapMotion}
                >
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
                        empty={knownEmpty(date)}
                        onSelect={() => openDay(date)}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-2 border-scheme-border p-5 md:p-6">
              <p
                aria-live="polite"
                className={cn("text-small", caseId && "text-scheme-text/60")}
              >
                {!caseId
                  ? status
                  : earliest
                    ? `Earliest opening: ${longDateFormatter.format(earliest)}.`
                    : "Looking for the earliest opening…"}
              </p>
              {earliest && (
                <Button
                  variant="secondary"
                  title="See times"
                  onClick={() => openDay(earliest)}
                >
                  See Times
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="time"
            className="flex min-h-0 flex-1 flex-col"
            {...stageMotion}
          >
            <div className="shrink-0 border-b-2 border-scheme-border p-5 md:p-6">
              {/* One row: back to the month, the day, the week arrows. The
                  back control and the date sit together so "which day" and
                  "change it" read as one thing, and the row costs one line of
                  height rather than two on a short laptop screen. */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <MonthButton
                    label="Change date"
                    disabled={busy}
                    onClick={backToMonth}
                  >
                    {/* The arrow, not a chevron: the week arrows beside it
                        are chevrons, and two left chevrons would read as the
                        same action. */}
                    <ArrowBack className="size-5 text-scheme-text" />
                  </MonthButton>
                  <div className="min-w-0">
                    <p
                      ref={timeHeadingRef}
                      tabIndex={-1}
                      className="font-semibold outline-none md:text-medium"
                    >
                      {longDateFormatter.format(selectedDate)}
                    </p>
                    <p className="text-small text-scheme-text/60">
                      Eastern Time (ET)
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <MonthButton
                    label="Previous week"
                    disabled={!canPrevWeek || busy}
                    onClick={() => shiftWeek(-1)}
                  >
                    <ChevronLeft className="size-5 text-scheme-text" />
                  </MonthButton>
                  <MonthButton
                    label="Next week"
                    disabled={!canNextWeek || busy}
                    onClick={() => shiftWeek(1)}
                  >
                    <ChevronRight className="size-5 text-scheme-text" />
                  </MonthButton>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1.5 md:gap-2">
                {week.map((date) => (
                  <WeekDay
                    key={dayKey(date)}
                    date={date}
                    label={longDateFormatter.format(date)}
                    bookable={isBookable(date, today)}
                    selected={sameDay(date, selectedDate)}
                    empty={knownEmpty(date)}
                    onSelect={() => pickDate(date)}
                  />
                ))}
              </div>
            </div>

            {/* The times take whatever height the card has left, and scroll
                only when a day has more than fits. */}
            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 md:p-6">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={dayKey(selectedDate)}
                  aria-live="polite"
                  {...swapMotion}
                >
                  {groups.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {groups.map((group) => {
                        const start = offset;
                        offset += group.slots.length;
                        return (
                          <div key={group.label}>
                            <p className="text-small font-semibold">
                              {group.label}
                              <span className="font-normal text-scheme-text/60">
                                {" "}
                                · {group.slots.length} open
                              </span>
                            </p>
                            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                              {group.slots.map((slot, index) => (
                                <motion.div
                                  key={slot.time}
                                  {...chipMotion(start + index)}
                                >
                                  <TimeCell
                                    label={formatTime(slot.time)}
                                    selected={slot.time === selectedSlot?.time}
                                    onSelect={() => pickSlot(slot)}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : !selectedDay || selectedDay.status === "loading" ? (
                    <div>
                      <p className="text-small text-scheme-text/60">
                        Checking what's open…
                      </p>
                      {/* Placeholder chips in the 5% wash, so the grid is
                          already the right shape when the times land. */}
                      <div
                        aria-hidden="true"
                        className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5"
                      >
                        {Array.from({ length: 8 }, (_, index) => (
                          <div
                            key={index}
                            className="h-11 rounded-form bg-neutral-darkest-5"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-3">
                      <p className="text-small text-scheme-text/60">
                        {selectedDay.status === "error"
                          ? selectedDay.error
                          : "Nothing open on this day."}
                      </p>
                      {selectedDay.status === "error" ? (
                        <button
                          type="button"
                          onClick={() => load(selectedDate, { force: true })}
                          className="text-small underline"
                        >
                          Try again
                        </button>
                      ) : (
                        isBookable(addDays(selectedDate, 1), today) && (
                          <button
                            type="button"
                            onClick={() => pickDate(addDays(selectedDate, 1))}
                            className="text-small underline"
                          >
                            Try the next day
                          </button>
                        )
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Confirm bar. Below lg the card is in page flow and a busy
                day runs well past the fold, so the bar sticks to the bottom
                of the screen: whichever time you tap, Confirm is in reach
                without scrolling for it. That is also why the frame only
                clips its overflow from lg — `overflow-hidden` on an ancestor
                stops `sticky` working. From lg the card is height-bounded and
                the bar simply sits at its foot. */}
            <div className="sticky bottom-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-b-card border-t-2 border-scheme-border bg-scheme-background p-5 md:p-6 lg:static">
              <p
                aria-live="polite"
                className={cn(
                  "text-small",
                  !ready && !bookingError && caseId && "text-scheme-text/60",
                  ready && !bookingError && caseId && "font-semibold",
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
          </motion.div>
        )}
      </AnimatePresence>
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
function SchedulerFrame({ children = null, bounded = true }) {
  return (
    // `max-h-full` rather than `h-full`, centred in whatever height it is
    // given. The Zoho screens have to stretch — an iframe cannot report its own
    // height, so it takes the box it is given or nothing. This one knows
    // exactly how tall it wants to be, so on a tall display it hugs its content
    // instead of drawing a 2px rectangle around a lot of nothing, and on a
    // short one it fills and the two panes scroll inside themselves.
    // From lg the card is lifted out of flow (`absolute inset-0` inside a
    // `relative` box), so it takes the height the intake grid gives it rather
    // than pushing the page taller: the times then scroll inside the card
    // instead of the whole page scrolling (2026-09-29). Below lg it stays in
    // flow and the page scrolls normally, which on a phone is what you want.
    //
    // Only the time stage is bounded that way (`bounded`). The month is a
    // fixed shape that never needs to scroll, and bounding it on a short
    // laptop screen (~840px) cut the grid off mid-row with the remaining weeks
    // hidden behind an inner scroll nobody could see (2026-10-07). Unbounded,
    // it stays in flow at its natural height and, on a screen that short, the
    // page grows a little instead.
    <div className="relative h-full min-h-0">
    <div
      className={cn(
        "flex h-full min-h-0 items-center",
        bounded && "lg:absolute lg:inset-0",
      )}
    >
      {/* `relative` because the stage transitions use `popLayout`: the
          outgoing stage is taken out of flow and positioned against this box
          while it fades, so the incoming one mounts at once instead of
          waiting for the exit to finish. */}
      <div
        className={cn(
          "relative flex w-full min-h-0 flex-col rounded-card border-2 border-scheme-border",
          bounded && "max-h-full lg:overflow-hidden",
        )}
      >
        {children}
      </div>
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

function DayCell({ date, label, bookable, selected, isToday, empty, onSelect }) {
  if (!bookable) {
    return (
      <span className="flex h-11 items-center justify-center text-small text-scheme-text/25 md:h-14">
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
        // Fixed height, not `aspect-square`: now that the month has the whole
        // card width, square cells came out 80px and six weeks of them no
        // longer fitted a 768px laptop screen.
        "flex h-11 items-center justify-center rounded-form border-2 border-scheme-border text-small transition-all duration-200 ease-in-out md:h-14",
        selected
          ? "bg-scheme-text text-scheme-background"
          : "hover:bg-neutral-darkest-5",
        // Today is marked by weight, not by a second colour — the calendar
        // already has one filled state and adding another would make two
        // things compete to look chosen.
        isToday && !selected && "font-semibold",
        // A day already fetched and found empty stays pickable (Zoho can free
        // a slot) but reads quieter, so the eye goes to the days that aren't.
        empty && !selected && "border-scheme-border/30 text-scheme-text/40",
      )}
    >
      {date.getDate()}
    </button>
  );
}

/** One day in the time stage's week strip: weekday over date. */
function WeekDay({ date, label, bookable, selected, empty, onSelect }) {
  const weekday = WEEKDAY_LABELS[date.getDay()];
  if (!bookable) {
    return (
      <span className="flex flex-col items-center justify-center py-1.5 text-small text-scheme-text/25">
        <span>{weekday}</span>
        <span>{date.getDate()}</span>
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
        "flex flex-col items-center justify-center rounded-form border-2 border-scheme-border py-1.5 text-small transition-all duration-200 ease-in-out",
        selected
          ? "bg-scheme-text text-scheme-background"
          : "hover:bg-neutral-darkest-5",
        empty && !selected && "border-scheme-border/30 text-scheme-text/40",
      )}
    >
      <span className={cn(!selected && !empty && "text-scheme-text/60")}>
        {weekday}
      </span>
      <span className="font-semibold">{date.getDate()}</span>
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
