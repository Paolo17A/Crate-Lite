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
