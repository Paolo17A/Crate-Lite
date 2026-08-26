import { getApiUrl, readJson } from "@/lib/api";
import type { AuthAccount, AuthRole, RoleSession } from "@/types/auth";

type AuthErrorBody = {
  message?: string;
};

type LoginResponse = AuthErrorBody & {
  accessToken?: string;
  client?: AuthAccount;
  performer?: AuthAccount;
  admin?: AuthAccount;
};

function toNetworkError(err: unknown): Error {
  if (err instanceof TypeError) {
    return new Error(
      "Could not reach the API. Login is a cross-origin request, so the frontend origin must be allowed by CORS (health checks can still succeed via /backend).",
    );
  }
  return err instanceof Error ? err : new Error("Request failed");
}

async function authFetch<T>(path: string, init?: RequestInit): Promise<{ res: Response; body: T | null }> {
  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      credentials: "include",
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    const body = await readJson<T>(res);
    return { res, body };
  } catch (err) {
    throw toNetworkError(err);
  }
}

export async function loginRequest(
  email: string,
  password: string,
  role: AuthRole,
): Promise<RoleSession> {
  const { res, body } = await authFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });

  if (!res.ok) {
    throw new Error(body?.message || `Login failed (${res.status})`);
  }

  const account = body?.[role];
  if (!body?.accessToken || !account) {
    throw new Error("Invalid login response");
  }

  return { accessToken: body.accessToken, account };
}

export async function logoutRequest(): Promise<void> {
  const { res, body } = await authFetch<AuthErrorBody>("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(body?.message || `Logout failed (${res.status})`);
  }
}
