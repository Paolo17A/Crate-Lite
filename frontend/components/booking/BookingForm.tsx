"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvailabilityCalendar from "@/components/shared/AvailabilityCalendar";
import { isDateSelectable, toDateKey } from "@/lib/availability";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

const fieldClass =
  "w-full rounded border border-stone bg-white px-3 py-2.5 text-sm text-espresso outline-none transition-colors focus:border-burnt-orange";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-black";

const eventTypes = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Private party",
  "Festival",
  "Other",
];

const REDIRECT_SECONDS = 10;

function toTimeKey(date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/** Normalize HH:MM or HH:MM:SS to HH:MM for comparisons. */
function normalizeTime(value: string): string {
  return value.slice(0, 5);
}

function BookingSuccess({ performerName }: { performerName: string }) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/");
      return;
    }

    const id = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(id);
  }, [secondsLeft, router]);

  return (
    <div className="px-2 py-6 text-center sm:py-8">
      <p className="text-2xl font-medium text-espresso">Request sent</p>
      <p className="mt-3 text-espresso/70">
        Your booking request for {performerName} was recorded (mock).
        We&apos;ll follow up soon.
      </p>

      <Link
        href="/search"
        className="mt-8 inline-block rounded bg-burnt-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90"
      >
        Search for more performers
      </Link>

      <p className="mt-6 text-sm text-espresso/65">
        You will be sent back home in{" "}
        <span
          key={secondsLeft}
          className="inline-block animate-[countdownPop_0.45s_ease-out] font-semibold text-burnt-orange tabular-nums"
        >
          {secondsLeft}
        </span>{" "}
        second{secondsLeft === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export default function BookingForm({ performer }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  function validateDate(value: string): string {
    if (!value) return "Please select an event date.";
    if (!isDateSelectable(performer, value)) {
      return "That date is unavailable. Check availability and choose another.";
    }
    return "";
  }

  function validateTimes(
    date: string,
    start: string,
    end: string,
  ): { start: string; end: string } {
    let startError = "";
    let endError = "";

    if (!start) startError = "Please select a start time.";
    if (!end) endError = "Please select an end time.";

    const startKey = start ? normalizeTime(start) : "";
    const endKey = end ? normalizeTime(end) : "";

    const pastErrors = pastCurrentTimeErrors(date, start, end);
    if (pastErrors.start) startError = pastErrors.start;
    if (pastErrors.end) endError = pastErrors.end;

    if (startKey && endKey && endKey <= startKey && !endError) {
      endError = "End time must be after start time.";
    }

    return { start: startError, end: endError };
  }

  /** Only the "after now" checks — used when the selected date changes. */
  function pastCurrentTimeErrors(
    date: string,
    start: string,
    end: string,
  ): { start: string; end: string } {
    if (date !== toDateKey(new Date())) {
      return { start: "", end: "" };
    }

    const now = toTimeKey();
    const startKey = start ? normalizeTime(start) : "";
    const endKey = end ? normalizeTime(end) : "";

    return {
      start:
        startKey && startKey <= now
          ? "You must select a time after the current time."
          : "",
      end:
        endKey && endKey <= now
          ? "You must select a time after the current time."
          : "",
    };
  }

  function handleEventDateChange(dateKey: string) {
    setEventDate(dateKey);
    setDateError("");
    const errors = pastCurrentTimeErrors(dateKey, startTime, endTime);
    setStartTimeError(errors.start);
    setEndTimeError(errors.end);
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextDateError = validateDate(eventDate);
    setDateError(nextDateError);
    if (nextDateError) {
      setStartTimeError("");
      setEndTimeError("");
      return;
    }

    const nextTimeErrors = validateTimes(eventDate, startTime, endTime);
    setStartTimeError(nextTimeErrors.start);
    setEndTimeError(nextTimeErrors.end);
    if (nextTimeErrors.start || nextTimeErrors.end) return;

    setSubmitted(true);
  }

  if (submitted) {
    return <BookingSuccess performerName={performer.name} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2 sm:items-stretch">
        <div className="flex h-full flex-col">
          <span className={labelClass}>Event Date</span>
          <input type="hidden" name="eventDate" value={eventDate} required />
          <div className="mt-1 flex flex-1 justify-center rounded border border-stone bg-white p-3">
            <AvailabilityCalendar
              mode="pick"
              size="compact"
              performer={performer}
              value={eventDate}
              onChange={handleEventDateChange}
            />
          </div>
          {dateError && (
            <p
              className="mt-2 text-center text-sm font-medium text-burnt-orange"
              role="alert"
            >
              {dateError}
            </p>
          )}
        </div>

        <div className="flex h-full flex-col space-y-5">
          <div>
            <label className="block">
              <span className={labelClass}>Start Time</span>
              <input
                type="time"
                name="startTime"
                required
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setStartTimeError("");
                }}
                className={fieldClass}
              />
            </label>
            {startTimeError && (
              <p className="mt-1.5 text-sm font-medium text-burnt-orange" role="alert">
                {startTimeError}
              </p>
            )}
          </div>
          <div>
            <label className="block">
              <span className={labelClass}>End Time</span>
              <input
                type="time"
                name="endTime"
                required
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setEndTimeError("");
                }}
                className={fieldClass}
              />
            </label>
            {endTimeError && (
              <p className="mt-1.5 text-sm font-medium text-burnt-orange" role="alert">
                {endTimeError}
              </p>
            )}
          </div>
          <label className="block">
            <span className={labelClass}>Event Type</span>
            <select
              name="eventType"
              required
              className={fieldClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select event type
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Event Location</span>
            <input
              type="text"
              name="eventLocation"
              required
              placeholder="Venue or address"
              className={fieldClass}
            />
          </label>
        </div>
      </div>

      <label className="block">
        <span className={labelClass}>Additional Notes</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Guest count, vibe, special requests…"
          className={`${fieldClass} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="w-full rounded bg-burnt-orange px-6 py-4 text-base font-bold uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90 sm:text-lg"
      >
        Submit booking request
      </button>
    </form>
  );
}
