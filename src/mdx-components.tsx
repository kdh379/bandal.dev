import Link from "next/link";

import type { MDXComponents } from "mdx/types";
import type { ReactNode, CSSProperties, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  onMouseOver?: (e: MouseEvent<HTMLElement>) => void;
  onMouseOut?: (e: MouseEvent<HTMLElement>) => void;
};

const CustomLink = ({ href, children, ...props }: Props) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }: Props) => (
      <article className="my-12">{children}</article>
    ),
    h1: ({ children, ...props }: Props) => (
      <h1
        className="mt-12 mb-6 text-4xl font-bold tracking-tight"
        style={{
          color: "var(--heading-color)",
          fontFamily: "var(--font-serif)",
        }}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: Props) => (
      <h2
        className="mt-10 mb-4 text-3xl font-bold tracking-tight"
        style={{
          color: "var(--heading-color)",
          fontFamily: "var(--font-serif)",
        }}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: Props) => (
      <h3
        className="mt-8 mb-4 text-2xl font-bold tracking-tight"
        style={{
          color: "var(--heading-color)",
          fontFamily: "var(--font-serif)",
        }}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: Props) => (
      <h4
        className="mt-6 mb-4 text-xl font-bold tracking-tight"
        style={{
          color: "var(--heading-color)",
          fontFamily: "var(--font-serif)",
        }}
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }: Props) => (
      <p className="mb-6 leading-7 text-lg" {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }: Props) => (
      <CustomLink
        href={href}
        className="transition-colors duration-200"
        style={{
          color: "var(--link-color)",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          textDecorationThickness: "1px",
        }}
        onMouseOver={(e: MouseEvent<HTMLElement>) => {
          e.currentTarget.style.color = "var(--link-hover-color)";
        }}
        onMouseOut={(e: MouseEvent<HTMLElement>) => {
          e.currentTarget.style.color = "var(--link-color)";
        }}
        {...props}
      >
        {children}
      </CustomLink>
    ),
    ul: ({ children, ...props }: Props) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: Props) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: Props) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    hr: (props: Props) => (
      <hr
        className="my-12 mx-auto w-1/4"
        style={{ borderColor: "var(--hr-color)" }}
        {...props}
      />
    ),
    blockquote: ({ children, ...props }: Props) => (
      <blockquote
        className="pl-6 py-3 my-8 italic"
        style={{
          borderLeftWidth: "3px",
          borderLeftStyle: "solid",
          borderLeftColor: "var(--blockquote-border)",
          color: "var(--blockquote-color)",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: Props) => (
      <code
        className="px-1.5 py-0.5 rounded-md"
        style={{
          backgroundColor: "var(--code-background)",
          color: "var(--code-color)",
          fontSize: "0.875em",
          fontFamily: "var(--font-mono)",
        }}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }: Props) => (
      <pre
        className="p-5 mb-6 overflow-x-auto rounded-lg text-sm"
        style={{
          backgroundColor: "var(--code-background)",
          color: "var(--code-color)",
          boxShadow: "var(--box-shadow)",
          fontFamily: "var(--font-mono)",
        }}
        {...props}
      >
        {children}
      </pre>
    ),
    table: ({ children, ...props }: Props) => (
      <div className="overflow-x-auto my-8">
        <table
          className="w-full text-left border-collapse rounded-lg overflow-hidden"
          style={{
            borderColor: "var(--table-border)",
            boxShadow: "var(--box-shadow)",
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: Props) => (
      <thead style={{ backgroundColor: "var(--table-header-bg)" }} {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: Props) => (
      <th
        className="px-4 py-3 font-semibold text-sm"
        style={{ borderWidth: "1px", borderColor: "var(--table-border)" }}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: Props) => (
      <td
        className="px-4 py-3 text-sm"
        style={{ borderWidth: "1px", borderColor: "var(--table-border)" }}
        {...props}
      >
        {children}
      </td>
    ),
  };
}
