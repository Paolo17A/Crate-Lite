"use client";

import { useEffect, useState } from "react";
import { API_OFFLINE_MESSAGE, getApiUrl, isHttpOk, readJson } from "@/lib/api";

const POLL_MS = 5000;

const CONNECTION_NAMES: Record<string, string> = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
  99: "Uninitialized",
  ready: "Connected",
  connecting: "Connecting",
  connect: "Connecting",
  wait: "Connecting",
  reconnecting: "Connecting",
  close: "Disconnected",
  end: "Disconnected",
};

export type PingStatus = "checking" | "up" | "down" | "skipped";

export type EndpointRow = {
  id: string;
  kind: "http" | "database" | "redis";
  method: string | null;
  path: string;
  pingStatus: PingStatus;
  latencyMs: number | null;
  lastCheckedAt: number | null;
  detail: string | null;
};

type StatusPayload = {
  database?: {
    connected?: boolean;
    readyState?: number;
    skipped?: boolean;
  };
  redis?: {
    connected?: boolean;
    status?: string | null;
    skipped?: boolean;
  };
  endpoints?: Array<{ method?: string; path?: string }>;
};

function connectionDetail(
  skipped: boolean | undefined,
  envVar: string,
  key: string | number | null | undefined,
) {
  if (skipped) return `Disconnected — ${envVar} is not set`;
  if (key == null) return "Disconnected";
  return CONNECTION_NAMES[String(key)] ?? "Disconnected";
}

function resourceRow(
  kind: "database" | "redis",
  path: string,
  now: number,
  connected: boolean | undefined,
  skipped: boolean | undefined,
  detail: string,
): EndpointRow {
  return {
    id: kind,
    kind,
    method: null,
    path,
    pingStatus: connected ? "up" : skipped ? "skipped" : "down",
    latencyMs: null,
    lastCheckedAt: now,
    detail,
  };
}

function httpRow(
  method: string,
  path: string,
  now: number,
  pingStatus: PingStatus,
  detail: string,
  latencyMs: number | null = null,
): EndpointRow {
  return {
    id: `${method} ${path}`,
    kind: "http",
    method,
    path,
    pingStatus,
    latencyMs,
    lastCheckedAt: now,
    detail,
  };
}

async function pingGet(path: string, signal: AbortSignal) {
  try {
    const started = performance.now();
    const res = await fetch(`/backend${path}`, { signal, cache: "no-store" });
    const ok = isHttpOk(res);
    return {
      pingStatus: (ok ? "up" : "down") as PingStatus,
      latencyMs: Math.round(performance.now() - started),
      detail: ok ? "Connected" : "Disconnected",
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    return {
      pingStatus: "down" as const,
      latencyMs: null,
      detail: "Disconnected",
    };
  }
}

async function buildRows(
  payload: StatusPayload,
  statusLatency: number,
  signal: AbortSignal,
  now: number,
): Promise<EndpointRow[]> {
  const db = payload.database ?? {};
  const redis = payload.redis ?? {};
  const listed = (payload.endpoints ?? []).filter(
    (endpoint): endpoint is { method: string; path: string } =>
      Boolean(endpoint.method && endpoint.path),
  );

  const httpRows = await Promise.all(
    listed.map(async ({ method, path }) => {
      if (method !== "GET") {
        return httpRow(
          method,
          path,
          now,
          "skipped",
          "Non-GET routes are not pinged",
        );
      }
      if (path === "/status") {
        return httpRow(method, path, now, "up", "Connected", statusLatency);
      }
      const ping = await pingGet(path, signal);
      return httpRow(
        method,
        path,
        now,
        ping.pingStatus,
        ping.detail,
        ping.latencyMs,
      );
    }),
  );

  return [
    resourceRow(
      "database",
      "MongoDB",
      now,
      db.connected,
      db.skipped,
      connectionDetail(db.skipped, "MONGODB_URI", db.readyState),
    ),
    resourceRow(
      "redis",
      "Redis",
      now,
      redis.connected,
      redis.skipped,
      connectionDetail(redis.skipped, "REDIS_URL", redis.status),
    ),
    ...httpRows,
  ];
}

export function useEndpointIndex() {
  const [rows, setRows] = useState<EndpointRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [catalogUrl] = useState(() => `${getApiUrl()}/status`);

  useEffect(() => {
    let cancelled = false;
    let abort: AbortController | null = null;

    async function refresh() {
      abort?.abort();
      abort = new AbortController();

      try {
        const started = performance.now();
        const res = await fetch("/backend/status", {
          signal: abort.signal,
          cache: "no-store",
        });
        const statusLatency = Math.round(performance.now() - started);
        const payload = await readJson<StatusPayload>(res);
        if (cancelled) return;

        if (!isHttpOk(res) || !payload) {
          setError(API_OFFLINE_MESSAGE);
          setRows([]);
          return;
        }

        const nextRows = await buildRows(
          payload,
          statusLatency,
          abort.signal,
          Date.now(),
        );
        if (cancelled) return;

        setError(null);
        setRows(nextRows);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(API_OFFLINE_MESSAGE);
        setRows([]);
      }
    }

    void refresh();
    const id = window.setInterval(() => {
      void refresh();
    }, POLL_MS);

    return () => {
      cancelled = true;
      abort?.abort();
      window.clearInterval(id);
    };
  }, []);

  return { rows, error, catalogUrl };
}
