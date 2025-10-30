import { useEffect, useState } from "react";

const THEME_KEY = "theme"; // localStorage key

export default function ThemeToggle() {
  // initialize using localStorage or system preference
  const getInitial = () => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "dark" || stored === "light") return stored;
      // fallback to system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch (e) {
      // ignore localStorage errors (e.g., private mode)
      console.error(`Error accessing localStorage: ${e.message}`);
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitial);

  // apply the theme to <html> and persist it
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
        console.error(`Error accessing localStorage: ${e.message}`);
    }
  }, [theme]);

  // keep theme in sync if user changes system preference while page open
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (!mq || !mq.addEventListener) return;
    const handler = (e) => {
      // only change if user hasn't explicitly set preference in localStorage
      try {
        const stored = localStorage.getItem(THEME_KEY);
        if (!stored) setTheme(e.matches ? "dark" : "light");
      } catch (err) {
        // ignore
        console.error(`Error accessing localStorage: ${err.message}`);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-md border bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-sm backdrop-blur-sm"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
