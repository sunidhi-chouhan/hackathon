"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { filterDestinationSuggestions } from "@/lib/location-utils";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = filterDestinationSuggestions(value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor="destination" className="theme-text mb-1.5 block text-sm font-medium">
        Where are you going?
      </label>
      <p className="theme-text-subtle mb-2 text-xs">
        Leave blank to let AI choose for you
      </p>
      <div
        className="relative flex items-center rounded-xl border transition-all duration-300"
        style={{
          borderColor: focused ? "var(--accent)" : "var(--border)",
          background: "var(--surface)",
          boxShadow: focused ? "0 0 0 2px var(--accent-muted)" : undefined,
        }}
      >
        <span className="pointer-events-none pl-4" style={{ color: "var(--accent)" }}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </span>
        <input
          id="destination"
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder="Search a city or region..."
          autoComplete="off"
          className="theme-input border-0 bg-transparent focus:ring-0"
        />
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="theme-surface-elevated absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl py-1 shadow-xl"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(suggestion);
                    setOpen(false);
                  }}
                  className="theme-text-muted flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:opacity-80"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span>📍</span>
                  {suggestion}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
