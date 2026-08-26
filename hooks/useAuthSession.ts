"use client";

import { useCallback, useMemo, useState } from "react";
import { loginRequest, logoutRequest } from "@/lib/auth";
import type { AuthRole, RoleSession } from "@/types/auth";

const EMPTY_SESSIONS: Record<AuthRole, RoleSession | null> = {
  client: null,
  performer: null,
  admin: null,
};

export function useAuthSession() {
  const [activeRole, setActiveRole] = useState<AuthRole>("client");
  const [sessions, setSessions] = useState<Record<AuthRole, RoleSession | null>>(EMPTY_SESSIONS);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  }, [activeRole]);

  return useMemo(
    () => ({
      activeRole,
      setActiveRole,
      session,
      sessions,
      login,
      logout,
      loading,
      error,
    }),
    [activeRole, session, sessions, login, logout, loading, error],
  );
}
