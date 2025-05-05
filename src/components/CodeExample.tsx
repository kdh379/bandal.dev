"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { clsx } from "clsx";
import dedent from "dedent";
import React, { useEffect, useState } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const DEFAULT_THEME = "github-dark";

export function js(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "js", code: dedent(strings, ...args) };
}
export function ts(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "ts", code: dedent(strings, ...args) };
}
export function jsx(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "jsx", code: dedent(strings, ...args) };
}
export function html(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "html", code: dedent(strings, ...args) };
}
export function svelte(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "svelte", code: dedent(strings, ...args) };
}
export function css(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "css", code: dedent(strings, ...args) };
}

export function CodeExampleGroup({
  examples,
  filenames,
  className = "",
}: {
  examples: { lang: string; code: string }[];
  filenames: string[];
  className?: string;
}) {
  return (
    <Tabs.Root defaultValue={filenames[0]} className="not-prose">
      <div className="rounded-xl">
        <div className={clsx("rounded-xl p-1 text-sm ", className)}>
          <Tabs.List className="flex gap-1 px-2 pt-2">
            {filenames.map((filename, i) => (
              <Tabs.Trigger
                key={filename}
                value={filename}
                className="px-3 py-1.5 rounded-t-lg text-xs font-mono text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white transition-colors"
              >
                <CodeExampleFilename
                  filename={filename}
                  lang={examples[i].lang}
                />
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {examples.map((example, i) => (
            <Tabs.Content key={filenames[i]} value={filenames[i]} asChild>
              <CodeExampleWrapper>
                <CodeExampleHeader
                  filename={filenames[i]}
                  lang={example.lang}
                  code={example.code}
                />
                <RawHighlightedCode example={example} />
              </CodeExampleWrapper>
            </Tabs.Content>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
}

export function CodeExample({
  example,
  filename,
  className = "",
}: {
  example: { lang: string; code: string };
  filename?: string;
  className?: string;
}) {
  return (
    <CodeExampleWrapper className={className}>
      <CodeExampleHeader
        filename={filename}
        lang={example.lang}
        code={example.code}
      />
      <RawHighlightedCode example={example} />
    </CodeExampleWrapper>
  );
}

export function CodeExampleWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("rounded-xl p-1 text-sm bg-code-background", className)}
    >
      {children}
    </div>
  );
}

function CodeExampleHeader({
  filename,
  lang,
  code,
}: {
  filename?: string;
  lang?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="flex items-center justify-between px-3 pt-2 pb-1.5 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {filename && (
          <span className="truncate text-xs font-mono max-w-[160px]">
            {filename}
          </span>
        )}
        {lang && (
          <Badge color="gray" size="sm" radius="md" className="ml-1">
            {lang}
          </Badge>
        )}
      </div>
      <Button
        size="sm"
        variant="light"
        color="foreground"
        radius="md"
        className="text-xs px-2 py-1 h-auto min-w-[48px]"
        onClick={handleCopy}
        type="button"
        isIconOnly={false}
      >
        {copied ? "복사됨!" : "복사"}
      </Button>
    </div>
  );
}

export function RawHighlightedCode({
  example,
  className,
}: {
  example: { lang: string; code: string };
  className?: string;
}) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    (async () => {
      const html = await codeToHtml(example.code, {
        lang: example.lang as BundledLanguage,
        theme: DEFAULT_THEME,
        transformers: [
          transformerNotationHighlight(),
          transformerNotationDiff(),
          transformerNotationWordHighlight(),
        ],
      });
      setHtml(html.replaceAll("\n", ""));
    })();
  }, [example]);
  return (
    <div
      className={clsx("overflow-x-auto", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CodeExampleFilename({
  filename,
  lang,
}: {
  filename: string;
  lang: string;
}) {
  // 탭에만 쓰이는 파일명+언어 뱃지 (복사 버튼 없음)
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate text-xs text-gray-400 dark:text-white/50 font-mono max-w-[120px]">
        {filename}
      </span>
      {lang && (
        <Badge color="gray" size="sm" radius="md">
          {lang}
        </Badge>
      )}
    </div>
  );
}
