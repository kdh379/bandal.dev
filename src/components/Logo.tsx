import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="text-xl font-bold transition hover:opacity-80">
      <span className="font-bold text-primary">bandal</span>
      .dev
    </Link>
  );
}
