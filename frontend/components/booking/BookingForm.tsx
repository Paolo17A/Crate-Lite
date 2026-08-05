"use client";

import AvailabilityCalendar from "@/components/shared/AvailabilityCalendar";
import OrangeButton from "@/components/ui/OrangeButton";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useCountdownRedirect } from "@/hooks/useCountdownRedirect";
import {
  BOOKING_REDIRECT_SECONDS,
  BOOKING_TIME_OPTIONS,
  EVENT_TYPES,
} from "@/lib/booking";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

const fieldClass =
  "w-full rounded border border-stone bg-white px-3 py-2.5 text-sm text-espresso outline-none transition-colors focus:border-burnt-orange";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-black";

function BookingSuccess({ performerName }: { performerName: string }) {
  const { secondsLeft } = useCountdownRedirect(BOOKING_REDIRECT_SECONDS, "/");

  return (
    <div className="px-2 py-6 text-center sm:py-8">
      <p className="text-2xl font-medium text-espresso">Request sent</p>
      <p className="mt-3 text-espresso/70">
        Your booking request for {performerName} was recorded (mock).
        We&apos;ll follow up soon.
      </p>

      <OrangeButton
        label="Search for more performers"
        redirectAction="/search"
        className="mt-8 inline-block px-6 py-3 text-sm font-bold uppercase tracking-wide"
      />

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
  const {
    submitted,
    eventDate,
    dateError,
    startTime,
    endTime,
    startTimeError,
    endTimeError,
    handleEventDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit,
  } = useBookingForm(performer);

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
              <select
                name="startTime"
                required
                value={startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className={fieldClass}
              >
                <option value="" disabled>
                  Select start time
                </option>
                {BOOKING_TIME_OPTIONS.map((option) => (
                  <option key={`start-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
              <select
                name="endTime"
                required
                value={endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className={fieldClass}
              >
                <option value="" disabled>
                  Select end time
                </option>
                {BOOKING_TIME_OPTIONS.map((option) => (
                  <option key={`end-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
              {EVENT_TYPES.map((type) => (
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
      <OrangeButton
        label="Submit booking request"
        type="submit"
        className="w-full px-6 py-4 text-base font-bold uppercase tracking-wide sm:text-lg"
      />
    </form>
  );
}
