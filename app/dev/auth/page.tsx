import type { Metadata } from "next";
import AuthPlaygroundPage from "@/components/dev/AuthPlaygroundPage";

export const metadata: Metadata = {
  title: "Auth playground — Crate",
};

export default function AuthPage() {
  return (
    <div className="bg-parchment px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <AuthPlaygroundPage />
      </div>
    </div>
  );
}
