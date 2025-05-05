"use client";

import { useEffect, useRef, useState } from "react";

import { MoonIcon, SunIcon, DesktopIcon } from "@/components/ThemeIcons";
import { Button } from "@/components/ui/Button";
import { useCursor } from "@/hooks/useCursor";

type Theme = "light" | "dark" | "system";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("system");
  const ref = useRef<HTMLDivElement>(null);
  const { cursorStyle, initContainer } = useCursor(theme, {
    selector: `[data-theme="${theme}"]`,
  });

  useEffect(() => {
    initContainer(ref.current);
  }, [initContainer]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    setTheme(storedTheme || "system");
  }, []);

  useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem("theme");
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const themeOptions: { value: Theme; icon: React.ReactNode }[] = [
    { value: "light", icon: <SunIcon className="w-5 h-5" /> },
    { value: "dark", icon: <MoonIcon className="w-5 h-5" /> },
    { value: "system", icon: <DesktopIcon className="w-5 h-5" /> },
  ];

  return (
    <div ref={ref} className="flex border rounded-full p-1 border-hr relative">
      <span
        className="absolute bg-gray-200 dark:bg-gray-700 size-8 rounded-full -z-1 left-0"
        style={cursorStyle}
      />
      {themeOptions.map(({ value, icon }) => (
        <Button
          key={value}
          isIconOnly
          color="foreground"
          variant="light"
          size="sm"
          radius="full"
          data-theme={value}
          onClick={() => setTheme(value)}
          aria-label={`${value} 테마로 변경`}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
