"use client";

import DevMuiProvider from "@/components/dev/DevMuiProvider";
import LoginForm from "@/components/dev/LoginForm";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

export default function AuthPlaygroundPage() {
  const auth = useAuthSession();
  const tokenRefresh = useTokenRefresh(auth.replaceAccessToken);

  return (
    <DevMuiProvider>
      <section className="rounded-lg border border-stone bg-sand p-5 shadow-sm sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Auth playground
        </p>
        <h1 className="mt-2 font-performer text-xl font-bold text-espresso sm:text-2xl">
          Login form mock
        </h1>
        <p className="mt-2 text-sm text-espresso/70">
          Posts to Crate Backend with a role toggle. The refresh cookie is HttpOnly
          (`crate_refresh`) on the API origin, so this page infers cookie status from
          login, refresh, and logout — it does not print the cookie value. Access JWTs
          are shown in full.
        </p>
        <div className="mt-5">
          <LoginForm auth={auth} tokenRefresh={tokenRefresh} />
        </div>
      </section>
    </DevMuiProvider>
  );
}
