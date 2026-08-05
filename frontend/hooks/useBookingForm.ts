"use client";

import { useState, type SubmitEvent } from "react";
import {
  EMPTY_TIME_ERRORS,
  pastCurrentTimeErrors,
  validateBookingDate,
  validateBookingTimes,
} from "@/lib/booking";
import type { Performer } from "@/types/performer";

export function useBookingForm(performer: Performer) {
  const [submitted, setSubmitted] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  function handleEventDateChange(dateKey: string) {
    setEventDate(dateKey);
    setDateError("");
    const errors = pastCurrentTimeErrors(dateKey, startTime, endTime);
    setStartTimeError(errors.start);
    setEndTimeError(errors.end);
  }

  function handleStartTimeChange(value: string) {
    setStartTime(value);
    setStartTimeError("");
  }

  function handleEndTimeChange(value: string) {
    setEndTime(value);
    setEndTimeError("");
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextDateError = validateBookingDate(performer, eventDate);
    setDateError(nextDateError);
    if (nextDateError) {
      setStartTimeError(EMPTY_TIME_ERRORS.start);
      setEndTimeError(EMPTY_TIME_ERRORS.end);
      return;
    }

    const nextTimeErrors = validateBookingTimes(eventDate, startTime, endTime);
    setStartTimeError(nextTimeErrors.start);
    setEndTimeError(nextTimeErrors.end);
    if (nextTimeErrors.start || nextTimeErrors.end) return;

    setSubmitted(true);
  }

  return {
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
  };
}
