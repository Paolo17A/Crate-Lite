import { isDateSelectable, toDateKey } from "@/lib/availability";
import type { Performer } from "@/types/performer";

export const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Private party",
  "Festival",
  "Other",
] as const;

export const BOOKING_REDIRECT_SECONDS = 10;

export type TimeFieldErrors = { start: string; end: string };

export const EMPTY_TIME_ERRORS: TimeFieldErrors = { start: "", end: "" };

export type BookingTimeOption = {
  /** 24h HH:MM value used for form state and comparisons */
  value: string;
  /** Display label like "12:30 AM" */
  label: string;
};

function formatTimeLabel(hours24: number, minutes: number): string {
  const period = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** Half-hour slots from 12:00 AM through 11:30 PM. */
export const BOOKING_TIME_OPTIONS: BookingTimeOption[] = Array.from(
  { length: 48 },
  (_, index) => {
    const hours24 = Math.floor(index / 2);
    const minutes = index % 2 === 0 ? 0 : 30;
    const value = `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return {
      value,
      label: formatTimeLabel(hours24, minutes),
    };
  },
);

export function toTimeKey(date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/** Normalize HH:MM or HH:MM:SS to HH:MM for comparisons. */
export function normalizeTime(value: string): string {
  return value.slice(0, 5);
}

export function validateBookingDate(
  performer: Pick<Performer, "bookedDates">,
  value: string,
): string {
  if (!value) return "Please select an event date.";
  if (!isDateSelectable(performer, value)) {
    return "That date is unavailable. Check availability and choose another.";
  }
  return "";
}

/** Only the "after now" checks — used when the selected date changes. */
export function pastCurrentTimeErrors(
  date: string,
  start: string,
  end: string,
  now = new Date(),
): TimeFieldErrors {
  if (date !== toDateKey(now)) {
    return { ...EMPTY_TIME_ERRORS };
  }

  const nowKey = toTimeKey(now);
  const startKey = start ? normalizeTime(start) : "";
  const endKey = end ? normalizeTime(end) : "";

  return {
    start:
      startKey && startKey <= nowKey
        ? "You must select a time after the current time."
        : "",
    end:
      endKey && endKey <= nowKey
        ? "You must select a time after the current time."
        : "",
  };
}

export function validateBookingTimes(
  date: string,
  start: string,
  end: string,
  now = new Date(),
): TimeFieldErrors {
  let startError = "";
  let endError = "";

  if (!start) startError = "Please select a start time.";
  if (!end) endError = "Please select an end time.";

  const startKey = start ? normalizeTime(start) : "";
  const endKey = end ? normalizeTime(end) : "";

  const pastErrors = pastCurrentTimeErrors(date, start, end, now);
  if (pastErrors.start) startError = pastErrors.start;
  if (pastErrors.end) endError = pastErrors.end;

  if (startKey && endKey && endKey <= startKey && !endError) {
    endError = "End time must be after start time.";
  }

  return { start: startError, end: endError };
}
