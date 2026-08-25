"use client";

import { useServerHealth } from "@/hooks/useServerHealth";

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  if (totalSeconds < 60) return `${totalSeconds}s`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) {
    return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return remMinutes === 0 ? `${hours}h` : `${hours}h ${remMinutes}m`;
}

function formatCheckedAt(timestamp: number) {
  return new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
}

const statusCopy = {
  checking: "Checking",
  up: "Online",
  down: "Offline",
} as const;

export default function ServerHealthCard() {
  const health = useServerHealth();
  const elapsedMs =
    health.status === "up" && health.upSince && health.lastCheckedAt
      ? health.lastCheckedAt - health.upSince
      : null;
  const uptimeLabel =
    elapsedMs == null
      ? health.status === "down"
        ? "No current uptime"
        : "Waiting for first ping"
      : elapsedMs < 1000
        ? "Just now"
        : `Up for ${formatDuration(elapsedMs)}`;

  return (
    <section className="rounded-lg border border-stone bg-sand p-5 shadow-sm sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-espresso/55">
        Server health
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            health.status === "up"
              ? "animate-pulse bg-burnt-orange"
              : health.status === "checking"
                ? "animate-pulse bg-stone"
                : "bg-espresso/35"
          }`}
          aria-hidden="true"
        />
        <h1 className="font-performer text-xl font-bold text-espresso sm:text-2xl">
          {statusCopy[health.status]}
        </h1>
      </div>

      <dl className="mt-5 space-y-3 text-sm text-espresso/70">
        <div className="flex justify-between gap-4">
          <dt>Latency</dt>
          <dd className="tabular-nums text-espresso">
            {health.latencyMs == null ? "—" : `${health.latencyMs} ms`}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Last checked</dt>
          <dd className="tabular-nums text-espresso">
            {health.lastCheckedAt
              ? formatCheckedAt(health.lastCheckedAt)
              : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Uptime streak</dt>
          <dd className="text-right text-espresso">
            {uptimeLabel}
            {health.consecutiveSuccesses > 0 ? (
              <span className="mt-0.5 block text-xs text-espresso/55">
                {health.consecutiveSuccesses} successful{" "}
                {health.consecutiveSuccesses === 1 ? "ping" : "pings"}
              </span>
            ) : null}
          </dd>
        </div>
      </dl>

      {health.error ? (
        <p className="mt-4 text-sm text-espresso/70">{health.error}</p>
      ) : null}

      <p className="mt-5 break-all text-xs text-espresso/40">{health.endpoint}</p>
    </section>
  );
}
