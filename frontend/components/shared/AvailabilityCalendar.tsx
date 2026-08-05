"use client";

import { useId, useMemo, useState } from "react";
import { isDateSelectable, toDateKey } from "@/lib/availability";
import type { Performer } from "@/types/performer";

type ViewProps = {
  mode: "view";
  performer: Pick<Performer, "bookedDates">;
  size?: "default" | "compact";
};

type PickProps = {
  mode: "pick";
  performer: Pick<Performer, "bookedDates">;
  value: string;
  onChange: (dateKey: string) => void;
  size?: "default" | "compact";
};

type Props = ViewProps | PickProps;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
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
];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function isBeforeCurrentMonth(month: Date, now = new Date()): boolean {
  return (
    month.getFullYear() < now.getFullYear() ||
    (month.getFullYear() === now.getFullYear() &&
      month.getMonth() < now.getMonth())
  );
}

const selectClass =
  "rounded border border-stone bg-white px-1.5 py-1 text-espresso outline-none transition-colors focus:border-burnt-orange";

export default function AvailabilityCalendar(props: Props) {
  const { performer, mode, size = "default" } = props;
  const compact = size === "compact";
  const monthSelectId = useId();
  const yearSelectId = useId();
  const todayKey = toDateKey(new Date());
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(new Date()),
  );

  const bookedSet = useMemo(
    () => new Set(performer.bookedDates),
    [performer.bookedDates],
  );

  const upcomingBookedCount = useMemo(
    () => performer.bookedDates.filter((d) => d >= todayKey).length,
    [performer.bookedDates, todayKey],
  );

  const yearOptions = useMemo(() => {
    const years: number[] = [];
    for (let y = currentYear; y <= currentYear + 3; y++) years.push(y);
    return years;
  }, [currentYear]);

  const monthOptions = useMemo(() => {
    const year = visibleMonth.getFullYear();
    return MONTHS.map((label, index) => ({
      label,
      index,
      disabled:
        year < currentYear ||
        (year === currentYear && index < currentMonth),
    }));
  }, [visibleMonth, currentYear, currentMonth]);

  const cells = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const items: ({ key: string; day: number; dateKey: string } | null)[] = [];

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
  }, [visibleMonth]);

  const canGoPrev = !isBeforeCurrentMonth(addMonths(visibleMonth, -1));

  function setMonth(monthIndex: number) {
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    if (isBeforeCurrentMonth(next)) return;
    setVisibleMonth(next);
  }

  function setYear(year: number) {
    let next = new Date(year, visibleMonth.getMonth(), 1);
    if (isBeforeCurrentMonth(next)) {
      next = startOfMonth(new Date());
    }
    setVisibleMonth(next);
  }

  const dayText = compact ? "text-xs" : "text-sm";
  const gap = compact ? "gap-0.5" : "gap-1";
  const navBtn = compact
    ? "rounded border border-stone px-2 py-1 text-xs text-espresso transition-colors hover:border-burnt-orange disabled:cursor-not-allowed disabled:opacity-35"
    : "rounded border border-stone px-3 py-1.5 text-sm text-espresso transition-colors hover:border-burnt-orange disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div className={compact ? "mx-auto w-full max-w-[260px]" : "w-full max-w-md"}>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
          disabled={!canGoPrev}
          className={navBtn}
          aria-label="Previous month"
        >
          ‹
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
          <label className="sr-only" htmlFor={monthSelectId}>
            Month
          </label>
          <select
            id={monthSelectId}
            value={visibleMonth.getMonth()}
            onChange={(e) => setMonth(Number(e.target.value))}
            className={`${selectClass} ${compact ? "max-w-[7.5rem] text-xs" : "text-sm"}`}
          >
            {monthOptions.map(({ label, index, disabled }) => (
              <option key={label} value={index} disabled={disabled}>
                {compact ? label.slice(0, 3) : label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor={yearSelectId}>
            Year
          </label>
          <select
            id={yearSelectId}
            value={visibleMonth.getFullYear()}
            onChange={(e) => setYear(Number(e.target.value))}
            className={`${selectClass} ${compact ? "text-xs" : "text-sm"}`}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
          className={navBtn}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div
        className={`mt-3 grid grid-cols-7 ${gap} text-center font-medium uppercase tracking-wide text-espresso/50 ${
          compact ? "text-[10px]" : "text-xs"
        }`}
      >
        {WEEKDAYS.map((label) => (
          <div key={label} className={compact ? "py-0.5" : "py-1"}>
            {label}
          </div>
        ))}
      </div>

      <div className={`mt-0.5 grid grid-cols-7 ${gap}`}>
        {cells.map((cell, index) => {
          if (!cell) {
            return (
              <div
                key={`empty-${index}`}
                className={compact ? "h-7" : "aspect-square"}
              />
            );
          }

          const booked = bookedSet.has(cell.dateKey);
          const past = cell.dateKey < todayKey;
          const isToday = cell.dateKey === todayKey;
          const selected = mode === "pick" && props.value === cell.dateKey;
          const selectable =
            mode === "pick" && isDateSelectable(performer, cell.dateKey);
          const cellSize = compact
            ? "h-7 w-full"
            : "aspect-square";

          if (mode === "view") {
            return (
              <div
                key={cell.key}
                className={[
                  `flex ${cellSize} items-center justify-center rounded ${dayText}`,
                  booked
                    ? "bg-espresso/15 font-medium text-espresso/45 line-through"
                    : past
                      ? "text-espresso/30"
                      : "text-espresso",
                  isToday && !booked ? "ring-1 ring-burnt-orange/50" : "",
                ].join(" ")}
                title={booked ? "Booked" : undefined}
                aria-label={
                  booked
                    ? `${cell.dateKey} booked`
                    : `${cell.dateKey} available`
                }
              >
                {cell.day}
              </div>
            );
          }

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!selectable}
              onClick={() => props.onChange(cell.dateKey)}
              className={[
                `flex ${cellSize} items-center justify-center rounded ${dayText} transition-colors`,
                selected
                  ? "bg-burnt-orange font-medium text-sand"
                  : booked
                    ? "cursor-not-allowed bg-espresso/15 font-medium text-espresso/45 line-through"
                    : past
                      ? "cursor-not-allowed text-espresso/30"
                      : "text-espresso hover:bg-burnt-orange/15",
                isToday && !selected && !booked
                  ? "ring-1 ring-burnt-orange/50"
                  : "",
              ].join(" ")}
              aria-pressed={selected}
              aria-label={
                booked
                  ? `${cell.dateKey} booked`
                  : past
                    ? `${cell.dateKey} unavailable`
                    : `Select ${cell.dateKey}`
              }
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <ul
        className={`mt-3 flex flex-wrap justify-center gap-3 text-espresso/65 ${
          compact ? "text-[10px]" : "text-xs"
        }`}
      >
        <li className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded ring-1 ring-burnt-orange/40"
            aria-hidden
          />
          Available
        </li>
        <li className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded bg-espresso/15"
            aria-hidden
          />
          Booked
        </li>
        {mode === "pick" && (
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded bg-burnt-orange"
              aria-hidden
            />
            Selected
          </li>
        )}
      </ul>

      {mode === "view" && upcomingBookedCount > 0 && (
        <p
          className={`mt-2 text-center text-espresso/60 ${
            compact ? "text-[11px]" : "text-sm"
          }`}
        >
          {upcomingBookedCount} upcoming booked date
          {upcomingBookedCount === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}
