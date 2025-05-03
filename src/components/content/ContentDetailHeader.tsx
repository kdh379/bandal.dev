import Link from "next/link";

import { cn } from "@/lib/utils";

type ContentDetailHeaderProps = {
  title: string;
  date: string;
  backLink: {
    href: string;
    label: string;
  };
};

export default function ContentDetailHeader({
  title,
  date,
  backLink,
}: ContentDetailHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={backLink.href}
        className={cn(
          "inline-flex items-center mb-6",
          "text-link",
          "hover:translate-x-[-4px] transition-transform",
        )}
      >
        ← {backLink.label}
      </Link>
      <h1
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          "text-heading font-serif",
        )}
      >
        {title}
      </h1>
      <time className="text-base text-blockquote">{date}</time>
    </div>
  );
}
