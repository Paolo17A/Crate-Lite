import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  priority?: boolean;
  /** When false, render the logo without linking home (e.g. already on home). */
  link?: boolean;
};

export default function CrateLogo({
  className = "",
  priority = false,
  link = true,
}: Props) {
  const image = (
    <Image
      src="/crate-logo.png"
      alt="Crate"
      width={220}
      height={64}
      priority={priority}
      className="h-12 w-auto object-contain sm:h-14"
    />
  );

  if (!link) {
    return (
      <span className={`inline-flex shrink-0 items-center ${className}`}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-80 ${className}`}
      aria-label="Crate home"
    >
      {image}
    </Link>
  );
}
