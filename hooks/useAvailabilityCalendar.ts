"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  buildCalendarCells,
  buildMonthOptions,
  buildYearOptions,
  isBeforeCurrentMonth,
  startOfMonth,
  toDateKey,
} from "@/lib/availability";
import type { Performer } from "@/types/performer";

export function useAvailabilityCalendar(
  performer: Pick<Performer, "bookedDates">,
) {
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

  const yearOptions = useMemo(
    () => buildYearOptions(currentYear),
    [currentYear],
  );

  const monthOptions = useMemo(
    () =>
      buildMonthOptions(
        visibleMonth.getFullYear(),
        currentYear,
        currentMonth,
      ),
    [visibleMonth, currentYear, currentMonth],
  );

  const cells = useMemo(
    () => buildCalendarCells(visibleMonth),
    [visibleMonth],
  );

  const canGoPrev = !isBeforeCurrentMonth(addMonths(visibleMonth, -1));

  function goPrev() {
    setVisibleMonth((month) => addMonths(month, -1));
  }

  function goNext() {
    setVisibleMonth((month) => addMonths(month, 1));
  }

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

  return {
    visibleMonth,
    todayKey,
    bookedSet,
    upcomingBookedCount,
    yearOptions,
    monthOptions,
    cells,
    canGoPrev,
    goPrev,
    goNext,
    setMonth,
    setYear,
  };
}
