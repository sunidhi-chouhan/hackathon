"use client";

import { motion } from "framer-motion";
import { Binoculars } from "lucide-react";
import {
  LOCAL_LENS_LABEL,
  LENS_MODE_LABELS,
  LOCAL_LENS_CATEGORIES,
  type LensMode,
} from "@culturecompass/shared";
import { getLensDescription } from "@/lib/local-lens-helpers";

interface LocalLensToggleProps {
  mode: LensMode;
  loading?: boolean;
  onChange: (mode: LensMode) => void;
}

export function LocalLensToggle({ mode, loading, onChange }: LocalLensToggleProps) {
  return (
    <section
      className="local-lens-banner relative overflow-hidden rounded-3xl border p-5 sm:p-6"
      aria-label="Local Lens perspective toggle"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "var(--accent-muted)" }}
          >
            <Binoculars className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div>
            <p className="theme-badge mb-1 text-[10px]">Featured</p>
            <h2 className="theme-text font-serif text-xl font-semibold tracking-tight sm:text-2xl">
              {LOCAL_LENS_LABEL}
            </h2>
            <p className="theme-text-muted mt-1 max-w-md text-sm leading-relaxed">
              {getLensDescription(mode)}
            </p>
          </div>
        </div>

        <div
          className="flex shrink-0 rounded-full border p-1"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
          role="tablist"
          aria-label="View mode"
        >
          {(["tourist", "local"] as const).map((option) => {
            const selected = mode === option;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={selected}
                disabled={loading}
                onClick={() => onChange(option)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                  selected ? "" : "theme-text-muted"
                } ${loading ? "opacity-60" : ""}`}
              >
                {selected && (
                  <motion.span
                    layoutId="lens-toggle-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--accent)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className="relative z-10"
                  style={selected ? { color: "var(--accent-foreground)" } : undefined}
                >
                  {LENS_MODE_LABELS[option]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {mode === "local" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="relative mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4"
        >
          {LOCAL_LENS_CATEGORIES.map((cat) => (
            <span key={cat} className="theme-chip text-xs">
              {cat}
            </span>
          ))}
        </motion.div>
      )}
    </section>
  );
}
