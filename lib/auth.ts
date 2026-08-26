import { getApiUrl, readJson } from "@/lib/api";
import { AUTH_ROLES, type AccessTokenPayload, type AuthAccount, type AuthRole, type RoleSession } from "@/types/auth";

type AuthErrorBody = {
  message?: string;
};

type LoginResponse = AuthErrorBody & {
  accessToken?: string;
  client?: AuthAccount;
  performer?: AuthAccount;
  admin?: AuthAccount;
};

type RefreshResponse = AuthErrorBody & {
  accessToken?: string;
};

function jsonFromJwtSegment(segment: string): string {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return atob(normalized + pad);
}

export function decodeAccessToken(token: string): AccessTokenPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }
    const parsed = JSON.parse(jsonFromJwtSegment(payload)) as Partial<AccessTokenPayload>;
    if (
      typeof parsed.sub !== "string" ||
      typeof parsed.sid !== "string" ||
      typeof parsed.iat !== "number" ||
      typeof parsed.exp !== "number" ||
      typeof parsed.role !== "string" ||
      !(AUTH_ROLES as readonly string[]).includes(parsed.role)
    ) {
      return null;
    }
    return {
      sub: parsed.sub,
      role: parsed.role as AuthRole,
      sid: parsed.sid,
      iat: parsed.iat,
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}

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

export async function refreshRequest(): Promise<string> {
  const { res, body } = await authFetch<RefreshResponse>("/api/auth/refresh", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(body?.message || `Refresh failed (${res.status})`);
  }

  if (!body?.accessToken) {
    throw new Error("Invalid refresh response");
  }

  return body.accessToken;
}
