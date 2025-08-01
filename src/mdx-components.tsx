import Link from "next/link";
import React from "react";

import { CodeExample } from "@/components/CodeExample";
import { buttonVariants } from "@/components/ui/Button";

import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (React.isValidElement(node)) {
    if (node.type === "small") {
      return "";
    }

    // @ts-ignore
    return getTextContent(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  return ""; // If the node is neither text nor a React element
}

function slugify(str: React.ReactNode) {
  return getTextContent(str)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const HeadingComponent = ({ children }: React.PropsWithChildren) => {
    const slug = slugify(children);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        },
        children,
      ),
    ]);
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper(props) {
      return <div className="slide-enter-content">{props.children}</div>;
    },
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="scroll-mt-24 text-4xl font-bold text-heading mb-6 tracking-tight">
        {children}
      </h1>
    ),
    ...components,

    h2: (props) => {
      const Heading = createHeading(2);
      return (
        <Heading {...props}>
          <span className="scroll-mt-24 text-3xl font-bold text-heading mt-16 mb-6 block border-b border-hr pb-2 tracking-tight">
            {props.children}
          </span>
        </Heading>
      );
    },
    h3: (props) => {
      const Heading = createHeading(3);
      return (
        <Heading {...props}>
          <span className="scroll-mt-24 text-2xl font-semibold text-heading mt-12 mb-4 block font-sans tracking-tight">
            {props.children}
          </span>
        </Heading>
      );
    },
    h4: (props) => {
      const Heading = createHeading(4);
      return (
        <Heading {...props}>
          <span className="scroll-mt-24 text-xl font-semibold text-heading mt-10 mb-3 block font-sans tracking-tight">
            {props.children}
          </span>
        </Heading>
      );
    },
    h5: (props) => {
      const Heading = createHeading(5);
      return (
        <Heading {...props}>
          <span className="scroll-mt-24 text-lg font-semibold text-heading mt-8 mb-2 block font-sans tracking-tight">
            {props.children}
          </span>
        </Heading>
      );
    },
    h6: (props) => {
      const Heading = createHeading(6);
      return (
        <Heading {...props}>
          <span className="scroll-mt-24 text-base font-semibold text-heading mt-6 mb-2 block font-sans tracking-tight">
            {props.children}
          </span>
        </Heading>
      );
    },

    p(props) {
      return (
        <p className="my-4 leading-relaxed text-foreground font-sans">
          {props.children}
        </p>
      );
    },
    ul(props) {
      return (
        <ul className="list-disc pl-6 my-2 space-y-1 text-foreground font-sans [&_p]:my-0">
          {props.children}
        </ul>
      );
    },
    ol(props) {
      return (
        <ol className="list-decimal pl-6 my-2 space-y-1 text-foreground font-sans">
          {props.children}
        </ol>
      );
    },
    li(props) {
      return <li className="ml-2 font-sans">{props.children}</li>;
    },
    blockquote(props) {
      return (
        <blockquote className="border-l-4 border-blockquote-border pl-4 py-2 my-6 text-blockquote bg-blockquote/5 rounded-md">
          {props.children}
        </blockquote>
      );
    },
    hr() {
      return <hr className="my-8 border-hr" />;
    },
    a(props: any) {
      const href: string = props.href ?? "";
      if (href.startsWith("http://") || href.startsWith("https://")) {
        // 외부 링크: 새 탭, 아이콘, rel 속성 등
        return (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "link", color: "foreground" })}
          >
            {props.children}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
              <path d="m21 3-9 9" />
              <path d="M15 3h6v6" />
            </svg>
          </a>
        );
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        // 메일/전화 링크: 기본 동작
        return (
          <a
            {...props}
            className={buttonVariants({ variant: "link", color: "foreground" })}
          >
            {props.children}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </a>
        );
      }
      if (href.startsWith("#")) {
        // 앵커 링크: 기본 동작
        return (
          <a
            {...props}
            className={buttonVariants({ variant: "link", color: "foreground" })}
          >
            {props.children}
          </a>
        );
      }
      // 내부 링크: Next.js Link 사용
      return (
        <Link
          {...props}
          className={buttonVariants({ variant: "link", color: "foreground" })}
        />
      );
    },
    code({ children }: { children: string | ReactNode }) {
      // 문자열이 아닌 경우
      if (typeof children !== "string") {
        return (
          <code className="px-1 py-0.5 rounded bg-code-background text-code-color text-[15px] font-mono">
            {children}
          </code>
        );
      }
      // 태그가 있는 경우
      if (children.startsWith("<")) {
        return (
          <code className="px-1 py-0.5 rounded bg-code-background text-code-color text-[15px] font-mono">
            {children}
          </code>
        );
      }
      // 태그가 없는 경우
      return (
        <code className="px-1 py-0.5 rounded bg-code-background text-code-color text-[15px] font-mono">
          {children
            .split(/(<[^>]+>)/g)
            .map((part, i) =>
              part.startsWith("<") && part.endsWith(">") ? (
                <var key={i}>{part}</var>
              ) : (
                part
              ),
            )}
        </code>
      );
    },
    pre(props) {
      const child = React.Children.only(props.children) as React.ReactElement;
      if (!child) return null;
      // @ts-ignore
      const { className, children: code } = child.props;
      const lang = className ? className.replace("language-", "") : "";
      let filename = undefined;
      // 첫 줄에서 [!code filename:…] 지시어 추출
      const lines = code.split("\n");
      const filenameRegex = /\[!code filename\:(.+)\]/;
      const match = lines[0].match(filenameRegex);
      let codeBody = code;
      if (match) {
        filename = match[1];
        codeBody = lines.splice(1).join("\n");
      }
      return (
        <div className="my-6 font-mono">
          <CodeExample
            example={{ lang, code: codeBody }}
            className="not-prose rounded-lg shadow bg-code-background font-mono"
            filename={filename}
          />
        </div>
      );
    },
    table(props) {
      return (
        <div className="my-6 w-full overflow-x-auto">
          <table className="w-full border-collapse text-foreground font-sans">
            {React.Children.toArray(props.children).filter((child) =>
              React.isValidElement(child),
            )}
          </table>
        </div>
      );
    },
    thead(props) {
      return (
        <thead className="bg-table-header-bg">
          {React.Children.toArray(props.children).filter((child) =>
            React.isValidElement(child),
          )}
        </thead>
      );
    },
    tbody(props) {
      return (
        <tbody>
          {React.Children.toArray(props.children).filter((child) =>
            React.isValidElement(child),
          )}
        </tbody>
      );
    },
    tr(props) {
      return (
        <tr className="border-b border-table-border">
          {React.Children.toArray(props.children).filter((child) =>
            React.isValidElement(child),
          )}
        </tr>
      );
    },
    th(props) {
      return (
        <th className="px-4 py-3 text-left font-semibold">{props.children}</th>
      );
    },
    td(props) {
      return <td className="px-4 py-3">{props.children}</td>;
    },
  };
}
