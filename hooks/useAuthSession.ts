"use client";

import { useCallback, useMemo, useState } from "react";
import { loginRequest, logoutRequest } from "@/lib/auth";
import type { AuthEvent, AuthRole, RefreshCookieStatus, RoleSession } from "@/types/auth";

const EMPTY_SESSIONS: Record<AuthRole, RoleSession | null> = {
  client: null,
  performer: null,
  admin: null,
};

export function useAuthSession() {
  const [activeRole, setActiveRole] = useState<AuthRole>("client");
  const [sessions, setSessions] = useState<Record<AuthRole, RoleSession | null>>(EMPTY_SESSIONS);
  const [cookieStatus, setCookieStatus] = useState<RefreshCookieStatus>("none");
  const [lastEvent, setLastEvent] = useState<AuthEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = sessions[activeRole];

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const next = await loginRequest(email, password, activeRole);
        setSessions((prev) => ({ ...prev, [activeRole]: next }));
        setCookieStatus("present");
        setLastEvent({ kind: "login", at: Date.now() });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [activeRole],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutRequest();
      setSessions((prev) => ({ ...prev, [activeRole]: null }));
      setCookieStatus("cleared");
      setLastEvent({ kind: "logout", at: Date.now() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  }, [activeRole]);

  const replaceAccessToken = useCallback(
    (accessToken: string) => {
      setSessions((prev) => {
        const current = prev[activeRole];
        if (!current) {
          return prev;
        }
        return { ...prev, [activeRole]: { ...current, accessToken } };
      });
      setCookieStatus("rotated");
      setLastEvent({ kind: "refresh", at: Date.now() });
    },
    [activeRole],
  );

  return useMemo(
    () => ({
      activeRole,
      setActiveRole,
      session,
      sessions,
      cookieStatus,
      lastEvent,
      replaceAccessToken,
      login,
      logout,
      loading,
      error,
    }),
    [
      activeRole,
      session,
      sessions,
      cookieStatus,
      lastEvent,
      replaceAccessToken,
      login,
      logout,
      loading,
      error,
    ],
  );
}
