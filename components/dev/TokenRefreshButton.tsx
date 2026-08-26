"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { decodeAccessToken } from "@/lib/auth";
import type { AuthEvent, RefreshCookieStatus, RoleSession } from "@/types/auth";

type Props = {
  session: RoleSession | null;
  cookieStatus: RefreshCookieStatus;
  lastEvent: AuthEvent | null;
  tokenRefresh: ReturnType<typeof useTokenRefresh>;
  busy?: boolean;
};

const tokenSx = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "0.75rem",
  wordBreak: "break-all" as const,
  whiteSpace: "pre-wrap" as const,
};

function formatUnix(seconds: number) {
  return new Date(seconds * 1000).toLocaleString();
}

function formatEvent(event: AuthEvent | null) {
  if (!event) {
    return "—";
  }
  return `${event.kind} at ${new Date(event.at).toLocaleTimeString()}`;
}

function secondsRemaining(exp: number, nowMs: number) {
  return Math.max(0, Math.floor((exp * 1000 - nowMs) / 1000));
}

export default function TokenRefreshButton({
  session,
  cookieStatus,
  lastEvent,
  tokenRefresh,
  busy = false,
}: Props) {
  const { refresh, loading, error, previousAccessToken, clearError } = tokenRefresh;
  const [now, setNow] = useState(() => Date.now());
  const payload = session ? decodeAccessToken(session.accessToken) : null;
  const previousPayload =
    lastEvent?.kind === "refresh" && previousAccessToken
      ? decodeAccessToken(previousAccessToken)
      : null;
  const showPrevious =
    lastEvent?.kind === "refresh" && Boolean(previousAccessToken) && Boolean(session);
  const canRefresh = cookieStatus !== "none";

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (lastEvent?.kind === "login" || lastEvent?.kind === "logout") {
      clearError();
    }
  }, [lastEvent, clearError]);

  return (
    <Stack spacing={2}>
      <Button
        type="button"
        variant="outlined"
        disabled={busy || loading || !canRefresh}
        onClick={() => void refresh(session?.accessToken)}
        fullWidth
      >
        {loading ? "Refreshing…" : "Refresh token"}
      </Button>

      {error ? (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      ) : null}

      <Stack
        spacing={1.25}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          px: 1.5,
          py: 1.25,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em" }}>
          TOKEN INSPECTOR
        </Typography>

        <Typography variant="body2">Refresh cookie: {cookieStatus}</Typography>
        <Typography variant="body2">Last event: {formatEvent(lastEvent)}</Typography>
        <Typography variant="body2" color="text.secondary">
          Cookie is HttpOnly (`crate_refresh`). Status is inferred from login / refresh / logout;
          the value is not printed.
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em", pt: 0.5 }}>
          ACCESS JWT
        </Typography>
        <Typography variant="body2" component="pre" sx={tokenSx}>
          {session?.accessToken ?? "—"}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em", pt: 0.5 }}>
          DECODED PAYLOAD
        </Typography>
        {payload ? (
          <Stack spacing={0.35}>
            <Typography variant="body2">sub: {payload.sub}</Typography>
            <Typography variant="body2">role: {payload.role}</Typography>
            <Typography variant="body2">sid: {payload.sid}</Typography>
            <Typography variant="body2">
              iat: {payload.iat} ({formatUnix(payload.iat)})
            </Typography>
            <Typography variant="body2">
              exp: {payload.exp} ({formatUnix(payload.exp)}) · {secondsRemaining(payload.exp, now)}s
              remaining
            </Typography>
          </Stack>
        ) : (
          <Typography variant="body2">—</Typography>
        )}

        {showPrevious ? (
          <>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ letterSpacing: "0.04em", pt: 0.5 }}
            >
              PREVIOUS ACCESS JWT (BEFORE REFRESH)
            </Typography>
            <Typography variant="body2" component="pre" sx={tokenSx}>
              {previousAccessToken}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              `sid` stays the same across rotation; `iat` / `exp` and the JWT string change.
              {previousPayload && payload
                ? ` sid ${previousPayload.sid === payload.sid ? "unchanged" : "changed"}; iat ${
                    previousPayload.iat === payload.iat ? "unchanged" : "changed"
                  }; exp ${previousPayload.exp === payload.exp ? "unchanged" : "changed"}.`
                : null}
            </Typography>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}
