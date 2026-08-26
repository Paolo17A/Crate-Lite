export const AUTH_ROLES = ["client", "performer", "admin"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

export type AuthAccount = {
  email: string;
  firstName: string;
  lastName: string;
  stageName?: string | null;
};

export type RoleSession = {
  accessToken: string;
  account: AuthAccount;
};

export type RefreshCookieStatus = "none" | "present" | "rotated" | "cleared";

export type AuthEventKind = "login" | "refresh" | "logout";

export type AuthEvent = {
  kind: AuthEventKind;
  at: number;
};

export type AccessTokenPayload = {
  sub: string;
  role: AuthRole;
  sid: string;
  iat: number;
  exp: number;
};
