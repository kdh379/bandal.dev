import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  icon?: React.ReactNode;
}

export function NavLink({ href, children, isExternal, icon }: NavLinkProps) {
  if (icon) {
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 transition-transform hover:scale-110"
        style={{ color: "var(--foreground)" }}
        aria-label={children?.toString()}
      >
        {icon}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      className="transition-colors hover:text-blue-500 font-medium"
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </Link>
  );
}
