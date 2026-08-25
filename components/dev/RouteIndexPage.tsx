"use client";

import DevMuiProvider from "@/components/dev/DevMuiProvider";
import EndpointTable from "@/components/dev/EndpointTable";
import { useEndpointIndex } from "@/hooks/useEndpointIndex";

export default function RouteIndexPage() {
  const { rows, error } = useEndpointIndex();

  return (
    <DevMuiProvider>
      <section className="rounded-lg border border-stone bg-sand p-5 shadow-sm sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Route index
        </p>
        <h1 className="mt-2 font-performer text-xl font-bold text-espresso sm:text-2xl">
          Active system endpoints
        </h1>
        <p className="mt-2 text-sm text-espresso/70">
          Live ping results for GET routes, plus MongoDB and Redis connection status.
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded border border-burnt-orange/40 bg-burnt-orange/10 px-3 py-2 text-sm text-espresso"
          >
            {error}
          </p>
        ) : (
          <>
            <div className="mt-5">
              <EndpointTable rows={rows} />
            </div>
          </>
        )}
      </section>
    </DevMuiProvider>
  );
}
