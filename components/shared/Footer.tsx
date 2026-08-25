import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-espresso text-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-brand text-xl tracking-tight text-sand transition-opacity hover:opacity-80"
        >
          Crate
        </Link>
        <p className="text-sm text-sand/65">
          Connect with DJs, musicians, bands, and other entertainers.
        </p>
        <p className="text-xs text-sand/40">
          © {new Date().getFullYear()} Crate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
