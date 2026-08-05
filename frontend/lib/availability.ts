import type { Performer } from "@/types/performer";

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type CalendarCell = {
  key: string;
  day: number;
  dateKey: string;
};

export type MonthOption = {
  label: string;
  index: number;
  disabled: boolean;
};

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Build YYYY-MM-DD keys for N days after today (local time, noon). */
export function daysFromToday(...offsets: number[]): string[] {
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  return offsets.map((offset) => {
    const day = new Date(base);
    day.setDate(day.getDate() + offset);
    return toDateKey(day);
  });
}

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Deterministic mock booked dates (4–8 days within the next ~60 days). */
export function bookedDatesForId(id: string): string[] {
  const hash = hashId(id);
  const count = 4 + (hash % 5);
  const offsets = new Set<number>();
  let seed = hash;

  while (offsets.size < count) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    offsets.add(2 + (seed % 58));
  }

  return daysFromToday(...[...offsets].sort((a, b) => a - b));
}

export function isDateBooked(
  performer: Pick<Performer, "bookedDates">,
  dateKey: string,
): boolean {
  return performer.bookedDates.includes(dateKey);
}

export function isDateSelectable(
  performer: Pick<Performer, "bookedDates">,
  dateKey: string,
): boolean {
  const today = toDateKey(new Date());
  if (dateKey < today) return false;
  return !isDateBooked(performer, dateKey);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function isBeforeCurrentMonth(month: Date, now = new Date()): boolean {
  return (
    month.getFullYear() < now.getFullYear() ||
    (month.getFullYear() === now.getFullYear() &&
      month.getMonth() < now.getMonth())
  );
}

export function buildCalendarCells(
  visibleMonth: Date,
): (CalendarCell | null)[] {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const items: (CalendarCell | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    items.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day, 12);
    items.push({
      key: `${year}-${month}-${day}`,
      day,
      dateKey: toDateKey(date),
    });
  }

  return items;
}

export function buildYearOptions(
  currentYear: number,
  yearsAhead = 3,
): number[] {
  const years: number[] = [];
  for (let y = currentYear; y <= currentYear + yearsAhead; y++) {
    years.push(y);
  }
  return years;
}

export function buildMonthOptions(
  visibleYear: number,
  currentYear: number,
  currentMonth: number,
): MonthOption[] {
  return MONTHS.map((label, index) => ({
    label,
    index,
    disabled:
      visibleYear < currentYear ||
      (visibleYear === currentYear && index < currentMonth),
  }));
}
