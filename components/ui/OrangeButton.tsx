import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Rounded = "xs" | "default" | "full";

type Props = {
  label: string;
  /** When set, renders a Next.js Link to this href. */
  redirectAction?: string;
  rounded?: Rounded;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-label"?: string;
  draggable?: boolean;
};

const roundedClass: Record<Rounded, string> = {
  xs: "rounded-xs",
  default: "rounded",
  full: "rounded-full",
};

const baseClass =
  "bg-burnt-orange text-sand transition-colors hover:bg-burnt-orange/90 disabled:cursor-not-allowed disabled:opacity-40";

export default function OrangeButton({
  label,
  redirectAction,
  rounded = "default",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  children,
  draggable,
  ...aria
}: Props) {
  const classes = [baseClass, roundedClass[rounded], className]
    .filter(Boolean)
    .join(" ");

  if (redirectAction) {
    return (
      <Link
        href={redirectAction}
        className={classes}
        draggable={draggable}
        aria-label={aria["aria-label"]}
      >
        {label}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-expanded={aria["aria-expanded"]}
      aria-controls={aria["aria-controls"]}
      aria-label={aria["aria-label"]}
    >
      {label}
      {children}
    </button>
  );
}
