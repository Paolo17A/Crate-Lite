import type { Performer } from "@/types/performer";

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
