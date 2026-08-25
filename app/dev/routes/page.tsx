import type { Metadata } from "next";
import RouteIndexPage from "@/components/dev/RouteIndexPage";

export const metadata: Metadata = {
  title: "Route index — Crate",
};

export default function RoutesPage() {
  return (
    <div className="bg-parchment px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <RouteIndexPage />
      </div>
    </div>
  );
}
