export default function FormStepper({
  steps,
  step,
  className = "",
}: {
  steps: readonly string[];
  step: number;
  className?: string;
}) {
  return (
    <ol className={`flex items-center gap-2 ${className}`.trim()}>
      {steps.map((label, index) => (
        <li
          key={label}
          className="flex flex-1 flex-col gap-2"
          aria-current={index === step ? "step" : undefined}
        >
          <span
            className={`h-1 rounded-full transition-colors ${
              index <= step ? "bg-burnt-orange" : "bg-stone"
            }`}
          />
          <span
            className={`hidden text-[11px] font-medium sm:block ${
              index === step
                ? "text-burnt-orange"
                : index < step
                  ? "text-espresso/55"
                  : "text-espresso/40"
            }`}
          >
            {index + 1}. {label}
          </span>
        </li>
      ))}
    </ol>
  );
}
