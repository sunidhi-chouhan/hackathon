"use client";

import { motion } from "framer-motion";

export function ParchmentSkeleton() {
  return (
    <div className="flex h-full min-h-[480px] flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <div
          className="theme-surface relative overflow-hidden rounded-2xl p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="animate-shimmer h-3 w-24 rounded-full" />
            <div
              className="h-6 w-6 animate-spin rounded-full border-2"
              style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
            />
          </div>

          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative h-20 w-20"
            >
              <div
                className="absolute inset-0 rounded-full border border-dashed"
                style={{ borderColor: "var(--border)" }}
              />
              <div
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
                style={{ background: "var(--border)" }}
              />
              <div
                className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
                style={{ background: "var(--border)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </motion.div>
          </div>

          <p className="theme-text mb-6 text-center font-serif text-lg">
            Charting your cultural journey...
          </p>

          <div className="space-y-3">
            {[100, 85, 70].map((width, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ delay: i * 0.3, duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                className="animate-shimmer h-2 rounded-full"
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                className="theme-card h-16"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
