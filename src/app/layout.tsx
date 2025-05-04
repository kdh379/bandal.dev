import { Noto_Sans_KR, Noto_Serif_KR, JetBrains_Mono } from "next/font/google";

import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

import type { Metadata } from "next";

import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "bandal.dev",
  description: "Next.js와 MDX로 만든 개인 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${notoSerifKR.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1 relative mt-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
