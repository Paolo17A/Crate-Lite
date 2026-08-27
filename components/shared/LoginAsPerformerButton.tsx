import Link from "next/link";

type Props = {
  className?: string;
};

export default function LoginAsPerformerButton({ className = "" }: Props) {
  return (
    <Link
      href="/performers/onboarding"
      className={`shrink-0 whitespace-nowrap rounded-full bg-burnt-orange px-3 py-2 text-center text-xs font-semibold text-sand transition-colors hover:bg-burnt-orange/90 sm:px-5 sm:text-sm ${className}`.trim()}
    >
      Join as Performer
    </Link>
  );
}
