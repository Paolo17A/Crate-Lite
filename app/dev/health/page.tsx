import type { Metadata } from "next";
import ServerHealthCard from "@/components/shared/ServerHealthCard";

export const metadata: Metadata = {
  title: "Server health — Crate",
};

export default function ServerHealthPage() {
  return (
    <div className="bg-parchment px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-lg">
        <ServerHealthCard />
      </div>
    </div>
  );
}
