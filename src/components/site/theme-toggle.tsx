import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem("coromandel-theme");
    const preferred = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", preferred);
    setIsDark(preferred);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("coromandel-theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <Button
      type="button"
      variant="navGhost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {mounted && isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
