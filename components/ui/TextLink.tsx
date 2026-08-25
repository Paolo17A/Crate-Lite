import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Props = {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  uppercase?: boolean;
  className?: string;
  children?: ReactNode;
};

const baseClass =
  "text-sm font-medium text-burnt-orange underline underline-offset-4 transition-opacity hover:opacity-80";

export default function TextLink({
  label,
  href,
  onClick,
  uppercase = false,
  className = "",
  children,
}: Props) {
  const classes = [
    baseClass,
    uppercase ? "uppercase tracking-wide" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
      {children}
    </button>
  );
}
