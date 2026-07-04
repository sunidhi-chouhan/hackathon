"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  summary: string;
  icon: LucideIcon;
  accent?: string;
  onClick: () => void;
}

export function DashboardCard({
  title,
  summary,
  icon: Icon,
  onClick,
}: DashboardCardProps) {
  return (
    <motion.button
      type="button"
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: "easeOut" as const },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card group flex w-full flex-col items-start rounded-3xl p-5 text-left sm:p-6"
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: "var(--accent-muted)" }}
      >
        <Icon className="h-5 w-5" style={{ color: "var(--foreground)" }} strokeWidth={1.75} />
      </div>
      <h3 className="theme-text text-base font-semibold tracking-tight">{title}</h3>
      <p className="theme-text-muted mt-2 line-clamp-2 text-sm leading-relaxed">{summary}</p>
      <span className="theme-text-subtle mt-4 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
        Tap to explore →
      </span>
    </motion.button>
  );
}
