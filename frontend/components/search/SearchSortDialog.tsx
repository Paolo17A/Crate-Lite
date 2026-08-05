"use client";

import FilterChoiceRow from "@/components/ui/FilterChoiceRow";
import SandPanelShell from "@/components/ui/SandPanelShell";
import type {
  SortDirection,
  SortField,
  SortSelection,
} from "@/types/search";

const fields: { id: SortField; label: string }[] = [
  { id: "name", label: "Name" },
  { id: "budget", label: "Budget" },
];

const directions: { id: SortDirection; label: string }[] = [
  { id: "asc", label: "Increasing" },
  { id: "desc", label: "Decreasing" },
];

export type SortPanelBodyProps = {
  value: SortSelection;
  onChange: (next: SortSelection) => void;
  fieldName: string;
  directionName: string;
};

export function SortPanelBody({
  value,
  onChange,
  fieldName,
  directionName,
}: SortPanelBodyProps) {
  return (
    <div className="space-y-5">
      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Sort by
        </h3>
        <ul className="mt-3 space-y-2.5">
          {fields.map((field) => (
            <FilterChoiceRow
              key={field.id}
              type="radio"
              name={fieldName}
              label={field.label}
              checked={value.field === field.id}
              onChange={() => onChange({ ...value, field: field.id })}
            />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-espresso/55">
          Order
        </h3>
        <ul className="mt-3 space-y-2.5">
          {directions.map((direction) => (
            <FilterChoiceRow
              key={direction.id}
              type="radio"
              name={directionName}
              label={direction.label}
              checked={value.direction === direction.id}
              onChange={() => onChange({ ...value, direction: direction.id })}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

type SearchSortDialogProps = SortPanelBodyProps & {
  id: string;
};

export default function SearchSortDialog({
  id,
  ...bodyProps
}: SearchSortDialogProps) {
  return (
    <SandPanelShell
      id={id}
      role="dialog"
      aria-label="Sort results"
      className="w-[min(calc(100vw-3rem),16rem)] p-5"
    >
      <SortPanelBody {...bodyProps} />
    </SandPanelShell>
  );
}

export function sortFieldLabel(field: SortField): string {
  return fields.find((item) => item.id === field)?.label ?? "Name";
}
