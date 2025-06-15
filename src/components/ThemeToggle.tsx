
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  // Use system preference or saved theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <Button 
      variant="ghost"
      size="icon"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="transition-all duration-200 hover:bg-primary/15"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-blue-700 dark:text-blue-200 transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-blue-700 dark:text-blue-200 transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;

