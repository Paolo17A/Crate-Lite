"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PerformerCard from "@/components/shared/PerformerCard";
import type { Performer, PerformerCategory } from "@/types/performer";

type Props = {
  title: string;
  category: PerformerCategory;
  performers: Performer[];
};

const DRAG_THRESHOLD = 10;

export default function CategoryRow({ title, category, performers }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [centered, setCentered] = useState(true);
  const [dragging, setDragging] = useState(false);

  const dragState = useRef({
    pointerId: -1,
    tracking: false,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    suppressClick: false,
  });
  const momentumRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateAlignment = () => {
      setCentered(track.scrollWidth <= track.clientWidth + 1);
    };

    updateAlignment();
    const observer = new ResizeObserver(updateAlignment);
    observer.observe(track);
    window.addEventListener("resize", updateAlignment);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateAlignment);
    };
  }, [performers]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const stopMomentum = () => {
      if (momentumRef.current !== null) {
        cancelAnimationFrame(momentumRef.current);
        momentumRef.current = null;
      }
    };

    const startMomentum = () => {
      stopMomentum();
      let velocity = dragState.current.velocity;

      const step = () => {
        if (Math.abs(velocity) < 0.15) {
          momentumRef.current = null;
          return;
        }

        track.scrollLeft -= velocity;
        velocity *= 0.95;
        momentumRef.current = requestAnimationFrame(step);
      };

      momentumRef.current = requestAnimationFrame(step);
    };

    const onPointerDown = (e: PointerEvent) => {
      // Native touch scrolling handles mobile; custom drag is for mouse/pen
      if (e.pointerType === "touch") return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      stopMomentum();
      const now = performance.now();
      dragState.current = {
        pointerId: e.pointerId,
        tracking: true,
        dragging: false,
        startX: e.clientX,
        scrollLeft: track.scrollLeft,
        lastX: e.clientX,
        lastTime: now,
        velocity: 0,
        suppressClick: false,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const state = dragState.current;
      if (!state.tracking || e.pointerId !== state.pointerId) return;

      const dx = e.clientX - state.startX;

      if (!state.dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;

        state.dragging = true;
        state.suppressClick = true;
        setDragging(true);
        track.setPointerCapture(e.pointerId);
      }

      e.preventDefault();

      const now = performance.now();
      const frameDx = e.clientX - state.lastX;
      const dt = now - state.lastTime;
      if (dt > 0) {
        state.velocity = (frameDx / dt) * 16;
      }
      state.lastX = e.clientX;
      state.lastTime = now;
      track.scrollLeft = state.scrollLeft - dx;
    };

    const endDrag = (e: PointerEvent) => {
      const state = dragState.current;
      if (!state.tracking || e.pointerId !== state.pointerId) return;

      const wasDragging = state.dragging;
      state.tracking = false;
      state.dragging = false;
      setDragging(false);

      if (track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }

      if (wasDragging) {
        startMomentum();
      }
    };

    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const onClickCapture = (e: MouseEvent) => {
      if (dragState.current.suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        dragState.current.suppressClick = false;
      }
    };

    const onWheel = () => {
      stopMomentum();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove, { passive: false });
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("dragstart", onDragStart, true);
    track.addEventListener("click", onClickCapture, true);
    track.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      stopMomentum();
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("dragstart", onDragStart, true);
      track.removeEventListener("click", onClickCapture, true);
      track.removeEventListener("wheel", onWheel);
    };
  }, [performers]);

  if (performers.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-medium text-espresso sm:text-2xl">
        {title}
      </h2>
      <div className="relative">
        <ul
          ref={trackRef}
          className={`flex gap-5 overflow-x-auto pb-6 scrollbar-thin select-none sm:gap-6 ${
            centered ? "justify-center" : "justify-start"
          } ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {performers.map((performer) => (
            <li
              key={performer.id}
              className="w-[210px] shrink-0 sm:w-[230px]"
            >
              <PerformerCard performer={performer} />
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <Link
          href={`/search?category=${encodeURIComponent(category)}`}
          className="font-performer text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
