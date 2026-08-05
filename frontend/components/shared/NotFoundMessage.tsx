import Link from "next/link";

type Action = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type Props = {
  title: string;
  description: string;
  actions?: Action[];
};

const primaryClass =
  "rounded bg-burnt-orange px-6 py-3 text-sm font-medium uppercase tracking-wide text-sand transition-colors hover:bg-burnt-orange/90";

const secondaryClass =
  "rounded border border-burnt-orange px-6 py-3 text-sm font-medium uppercase tracking-wide text-burnt-orange transition-colors hover:bg-burnt-orange/10";

export default function NotFoundMessage({
  title,
  description,
  actions = [{ href: "/", label: "Back to home" }],
}: Props) {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-medium text-espresso">{title}</h1>
      <p className="mt-3 text-espresso/70">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {actions.map((action) => (
          <Link
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={
              action.variant === "secondary" ? secondaryClass : primaryClass
            }
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
