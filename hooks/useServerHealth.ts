"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";

const POLL_MS = 5000;

export type ServerHealthStatus = "checking" | "up" | "down";

export type ServerHealth = {
  status: ServerHealthStatus;
  latencyMs: number | null;
  lastCheckedAt: number | null;
  error: string | null;
  consecutiveSuccesses: number;
  upSince: number | null;
  endpoint: string;
};

function healthUrl() {
  return `${getApiUrl()}/health`;
}

function pollUrl() {
  // Same-origin path so the browser is not blocked by CORS / Helmet CORP.
  // next.config.ts rewrites /backend/* to NEXT_PUBLIC_API_URL.
  return "/backend/health";
}

export function useServerHealth(): ServerHealth {
  const [state, setState] = useState<ServerHealth>({
    status: "checking",
    latencyMs: null,
    lastCheckedAt: null,
    error: null,
    consecutiveSuccesses: 0,
    upSince: null,
    endpoint: healthUrl(),
  });

  useEffect(() => {
    const endpoint = healthUrl();
    const requestUrl = pollUrl();
    let cancelled = false;
    let abort: AbortController | null = null;

    async function ping() {
      abort?.abort();
      abort = new AbortController();
      const started = performance.now();

      try {
        const res = await fetch(requestUrl, {
          signal: abort.signal,
          cache: "no-store",
        });
        const latencyMs = Math.round(performance.now() - started);

        let body: { status?: string } | null = null;
        try {
          body = (await res.json()) as { status?: string };
        } catch {
          body = null;
        }

        if (cancelled) return;

        const ok = res.ok && body?.status === "ok";
        const now = Date.now();

        setState((prev) =>
          ok
            ? {
                status: "up",
                latencyMs,
                lastCheckedAt: now,
                error: null,
                consecutiveSuccesses: prev.consecutiveSuccesses + 1,
                upSince: prev.upSince ?? now,
                endpoint,
              }
            : {
                status: "down",
                latencyMs,
                lastCheckedAt: now,
                error: `Unexpected response (${res.status})`,
                consecutiveSuccesses: 0,
                upSince: null,
                endpoint,
              },
        );
      } catch (err) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;

        setState({
          status: "down",
          latencyMs: Math.round(performance.now() - started),
          lastCheckedAt: Date.now(),
          error: err instanceof Error ? err.message : "Request failed",
          consecutiveSuccesses: 0,
          upSince: null,
          endpoint,
        });
      }
    }

    void ping();
    const id = window.setInterval(() => {
      void ping();
    }, POLL_MS);

    return () => {
      cancelled = true;
      abort?.abort();
      window.clearInterval(id);
    };
  }, []);

  return state;
}
