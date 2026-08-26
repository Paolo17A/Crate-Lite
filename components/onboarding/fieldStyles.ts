export const fieldClass =
  "w-full rounded-xl border border-stone bg-white px-3.5 py-3 text-sm text-espresso placeholder:text-espresso/40 outline-none focus:border-burnt-orange";

export const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-espresso/60";

export function chipClass(selected: boolean): string {
  return `rounded-full border px-3 py-1.5 text-xs transition-colors ${
    selected
      ? "border-burnt-orange bg-burnt-orange text-sand"
      : "border-stone text-espresso/70 hover:border-burnt-orange/50"
  }`;
}
