"use client";

import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 10;

export function useDragScroll<T extends HTMLElement>(deps: unknown[] = []) {
  const trackRef = useRef<T | null>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller-controlled deps
  }, deps);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller-controlled deps
  }, deps);

  return {
    ref: trackRef,
    dragging,
    centered,
  };
}
