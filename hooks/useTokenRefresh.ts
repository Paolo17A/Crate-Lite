"use client";

import { useCallback, useMemo, useState } from "react";
import { refreshRequest } from "@/lib/auth";

type ReplaceAccessToken = (accessToken: string) => void;

export function useTokenRefresh(replaceAccessToken: ReplaceAccessToken) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousAccessToken, setPreviousAccessToken] = useState<string | null>(null);

  const refresh = useCallback(
    async (currentAccessToken?: string) => {
      setLoading(true);
      setError(null);
      try {
        const next = await refreshRequest();
        setPreviousAccessToken(currentAccessToken ?? null);
        replaceAccessToken(next);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Refresh failed");
      } finally {
        setLoading(false);
      }
    },
    [replaceAccessToken],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return useMemo(
    () => ({
      refresh,
      loading,
      error,
      previousAccessToken,
      clearError,
    }),
    [refresh, loading, error, previousAccessToken, clearError],
  );
}
