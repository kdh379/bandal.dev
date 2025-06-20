import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import { cn } from "@/lib/utils";

type ContentDetailHeaderProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  backLink: {
    href: string;
    label: string;
  };
};

export default function ContentDetailHeader({
  slug,
  title,
  description,
  date,
  backLink,
}: ContentDetailHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={backLink.href}
        className={buttonVariants({
          variant: "link",
          color: "primary",
          className: "mb-4 hover:translate-x-[-4px]",
        })}
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
      <ViewTransition name={`description-${slug}`}>
        <p className="text-base text-blockquote mb-4 ">{description}</p>
      </ViewTransition>
      <ViewTransition name={`date-${slug}`}>
        <time className="text-base text-blockquote">{date}</time>
      </ViewTransition>
    </div>
  );
}
