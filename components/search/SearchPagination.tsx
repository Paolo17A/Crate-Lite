import OrangeButton from "@/components/ui/OrangeButton";

type Props = {
  rangeStart: number;
  rangeEnd: number;
  count: number;
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function SearchPagination({
  rangeStart,
  rangeEnd,
  count,
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-espresso/60">
        Showing {rangeStart}–{rangeEnd} of {count}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <OrangeButton
            label="Previous"
            disabled={page <= 1}
            onClick={onPrevious}
            className="px-4 py-2 text-sm font-medium"
          />
          <span className="px-2 text-sm text-espresso">
            Page {page} of {totalPages}
          </span>
          <OrangeButton
            label="Next"
            disabled={page >= totalPages}
            onClick={onNext}
            className="px-4 py-2 text-sm font-medium"
          />
        </div>
      )}
    </div>
  );
}
