import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getPreferredTheme,
  setTheme,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(getPreferredTheme());
  }, []);

  function handleToggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className={cn(
        "touch-manipulation border-border bg-card/90 backdrop-blur-sm min-h-11 px-3 sm:min-h-8",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <>
          <Sun className="size-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Light mode</span>
        </>
      ) : (
        <>
          <Moon className="size-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Dark mode</span>
        </>
      )}
    </Button>
  );
}
