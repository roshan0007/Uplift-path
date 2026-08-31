"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { ChevronLeft, ChevronRight } from "relume-icons";

/**
 * Step 3 of the intake funnel: pick a date, then a time, then confirm.
 *
 * **This is the interface only. Every time it offers is invented.** Real
 * availability comes from Zoho Bookings and that API is not wired up yet, so
 * the two functions that decide what is open — `isBookable` and `slotsFor` —
 * are the entire mock, and they are the only things that have to be replaced.
 * Nothing else in this file knows where availability comes from.
 *
 * The other half of the handoff is `onConfirm`: today it just moves to the
 * consent step. The real version books the slot first and only advances if
 * Zoho accepts it.
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

/** Where the confirm control goes. Step 4 of the funnel. */
const NEXT_STEP_HREF = "/consent-form";

/** How far ahead the calendar will let anyone look. */
const MONTHS_AHEAD = 3;

/**
 * MOCK. The times a session could start, in 24h so they sort as strings.
 * Replace with the slots Zoho Bookings returns for the chosen date.
 */
const SLOT_TIMES = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "13:00",
  "13:45",
  "14:30",
  "15:15",
  "16:00",
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * MOCK. Weekdays only, from tomorrow, within the window the calendar shows.
 * Replace with a lookup against Zoho Bookings' availability.
 */
function isBookable(date, today) {
  const weekday = date.getDay();
  if (weekday === 0 || weekday === 6) return false;
  if (date <= today) return false;
  return date <= addDays(today, MONTHS_AHEAD * 31);
}

/**
 * MOCK. A stable subset of SLOT_TIMES, derived from the date so a given day
 * always looks the same and two days rarely look alike. No randomness — the
 * grid must not change under someone who is mid-decision.
 */
function slotsFor(date, today) {
  if (!isBookable(date, today)) return [];
  // The 7/3/3-over-5 arithmetic is only there to make neighbouring days differ.
  // An earlier version stepped by a factor of the modulus, which made every
  // day in a month drop the same two slots — a calendar where every date is
  // identical is worse than no calendar, because it looks like real data.
  const seed = date.getDate() * 7 + date.getMonth() * 3;
  return SLOT_TIMES.filter((_, index) => (seed + index * 3) % 5 !== 0);
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
  const [viewMonth, setViewMonth] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  React.useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    // Open on the first day that can actually be booked rather than on an empty
    // month. The times column is the point of the screen and it should have
    // something in it before anyone touches the calendar.
    let first = addDays(now, 1);
    for (let i = 0; i < 14 && !isBookable(first, now); i += 1) {
      first = addDays(first, 1);
    }
    setViewMonth(new Date(first.getFullYear(), first.getMonth(), 1));
    setSelectedDate(first);
  }, []);

  if (!today || !viewMonth) return <SchedulerFrame />;

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
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const times = selectedDate ? slotsFor(selectedDate, today) : [];
  const ready = Boolean(selectedDate && selectedTime);

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

          {times.length > 0 ? (
            <div className="mt-4 flex flex-col gap-2">
              {times.map((time) => (
                <TimeCell
                  key={time}
                  label={formatTime(time)}
                  selected={time === selectedTime}
                  onSelect={() => setSelectedTime(time)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-small text-scheme-text/60">
              {selectedDate
                ? "Nothing open on this day. Try another date."
                : "Pick a date to see the times that are open."}
            </p>
          )}
        </div>
      </div>

      {/* Confirm bar */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-2 border-scheme-border p-5 md:p-6">
        <p className={cn("text-small", !ready && "text-scheme-text/60")}>
          {ready
            ? `${longDateFormatter.format(selectedDate)} at ${formatTime(selectedTime)}`
            : "Choose a date and a time to continue."}
        </p>
        {/* Disabled until there is something to confirm. A real anchor once
            there is, so the browser treats it as navigation — see the note on
            onConfirm above for what this becomes when Zoho Bookings is wired. */}
        {ready ? (
          <Button asChild title="Confirm time">
            <a href={NEXT_STEP_HREF}>Confirm Time</a>
          </Button>
        ) : (
          <Button title="Confirm time" disabled>
            Confirm Time
          </Button>
        )}
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
