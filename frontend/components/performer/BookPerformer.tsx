import OrangeButton from "@/components/ui/OrangeButton";
import { formatPeso } from "@/lib/format";
import type { Performer } from "@/types/performer";

type Props = {
  performer: Performer;
};

export default function BookPerformer({ performer }: Props) {
  return (
    <div className="w-full shrink-0 text-center sm:w-64 sm:text-right">
      <p className="text-3xl font-medium text-espresso">
        {formatPeso(performer.price)}
      </p>
      <OrangeButton
        label="Book Now"
        redirectAction={`/book/${performer.id}`}
        rounded="full"
        className="mt-4 block w-full px-6 py-3.5 text-center text-base font-medium uppercase tracking-wide"
      />
    </div>
  );
}
