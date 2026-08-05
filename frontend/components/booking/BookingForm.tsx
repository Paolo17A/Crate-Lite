"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (startTime && endTime && endTime <= startTime) {
      setTimeError("End time must be after start time.");
      return;
    }

    setTimeError("");
    setSubmitted(true);
  }

  if (submitted) {
    return <BookingSuccess performerName={performer.name} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Event Date</span>
        <input
          type="date"
          name="eventDate"
          required
          min={today}
          className={fieldClass}
        />
      </label>
      <div className="space-y-2">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Start Time</span>
            <input
              type="time"
              name="startTime"
              required
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setTimeError("");
              }}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>End Time</span>
            <input
              type="time"
              name="endTime"
              required
              value={endTime}
              min={startTime || undefined}
              onChange={(e) => {
                setEndTime(e.target.value);
                setTimeError("");
              }}
              className={fieldClass}
            />
          </label>
        </div>
        {timeError && (
          <p className="text-sm font-medium text-burnt-orange" role="alert">
            {timeError}
          </p>
        )}
      </div>
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
      <label className="block">
        <span className={labelClass}>Event Type</span>
        <select name="eventType" required className={fieldClass} defaultValue="">
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
