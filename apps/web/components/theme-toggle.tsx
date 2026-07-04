"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="theme-surface relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="text-base"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </motion.span>
    </button>
  );
}
