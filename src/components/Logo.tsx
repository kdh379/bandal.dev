import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold transition hover:opacity-80"
      style={{ color: "var(--heading-color)" }}
    >
      <span className="font-bold" style={{ color: "var(--link-color)" }}>
        bandal
      </span>
      .dev
    </Link>
  );
}
