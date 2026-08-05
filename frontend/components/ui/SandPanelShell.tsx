import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  role?: string;
  "aria-label"?: string;
  className?: string;
};

const baseClass =
  "absolute right-0 z-50 mt-2 isolate rounded-lg border border-stone bg-sand shadow-lg";

export default function SandPanelShell({
  children,
  id,
  role,
  className = "",
  ...aria
}: Props) {
  return (
    <div
      id={id}
      role={role}
      aria-label={aria["aria-label"]}
      className={[baseClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
