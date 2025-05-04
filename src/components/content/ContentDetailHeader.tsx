import Link from "next/link";

import { ViewTransition } from "@/components/ViewTransition";
import { cn } from "@/lib/utils";

type ContentDetailHeaderProps = {
  slug: string;
  title: string;
  date: string;
  backLink: {
    href: string;
    label: string;
  };
};

export default function ContentDetailHeader({
  slug,
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
          "text-primary",
          "hover:translate-x-[-4px] transition-transform",
        )}
      >
        ← {backLink.label}
      </Link>
      <ViewTransition name={`title-${slug}`}>
        <h1
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            "text-heading font-serif",
          )}
        >
          {title}
        </h1>
      </ViewTransition>
      <ViewTransition name={`date-${slug}`}>
        <time className="text-base text-blockquote">{date}</time>
      </ViewTransition>
    </div>
  );
}
