import { cn } from "@/lib/utils";

type ContentHeaderProps = {
  title: string;
  description: string;
};

export default function ContentHeader({
  title,
  description,
}: ContentHeaderProps) {
  return (
    <div className="mb-12">
      <h1
        className={cn(
          "text-4xl md:text-5xl font-bold mb-4",
          "text-heading font-serif",
          "transition-all duration-300",
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "text-lg md:text-xl",
          "text-blockquote",
          "transition-all duration-300",
        )}
      >
        {description}
      </p>
    </div>
  );
}
