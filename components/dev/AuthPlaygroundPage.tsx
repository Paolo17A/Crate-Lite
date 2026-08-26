"use client";

import DevMuiProvider from "@/components/dev/DevMuiProvider";
import LoginForm from "@/components/dev/LoginForm";
import { useAuthSession } from "@/hooks/useAuthSession";

export default function AuthPlaygroundPage() {
  const auth = useAuthSession();

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
          Posts to Crate Backend with a role toggle. The account must already exist
          in Mongo with a bcrypt password. Refresh cookies are set on the API origin
          (credentials include).
        </p>
        <div className="mt-5">
          <LoginForm auth={auth} />
        </div>
      </section>
    </DevMuiProvider>
  );
}
