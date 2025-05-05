import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";

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
        className={buttonVariants({
          variant: "light",
          color: "foreground",
          isIconOnly: true,
          radius: "full",
        })}
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
      className={buttonVariants({
        variant: "light",
        color: "foreground",
      })}
    >
      {children}
    </Link>
  );
}
