"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedGlobe() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--globe-glow) 0%, transparent 55%)",
        }}
      />

      <motion.div
        className="relative"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 90, repeat: Infinity, ease: "linear" }
        }
      >
        <svg
          viewBox="0 0 400 400"
          className="h-[min(90vw,520px)] w-[min(90vw,520px)] opacity-[0.35] dark:opacity-[0.25]"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-[var(--foreground)]"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="60"
            ry="160"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-[var(--foreground)]"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="110"
            ry="160"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--foreground)]"
            opacity="0.6"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="80"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--foreground)]"
            opacity="0.5"
          />
          <ellipse
            cx="200"
            cy="130"
            rx="140"
            ry="45"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--foreground)]"
            opacity="0.4"
          />
          <ellipse
            cx="200"
            cy="270"
            rx="140"
            ry="45"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--foreground)]"
            opacity="0.4"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 160;
            const y1 = 200 + Math.sin(rad) * 160;
            return (
              <line
                key={deg}
                x1="200"
                y1="200"
                x2={x1}
                y2={y1}
                stroke="currentColor"
                strokeWidth="0.35"
                className="text-[var(--foreground)]"
                opacity="0.25"
              />
            );
          })}
        </svg>
      </motion.div>

      <motion.div
        className="absolute h-[min(70vw,400px)] w-[min(70vw,400px)] rounded-full border border-[var(--border)] opacity-40"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.04, 1], opacity: [0.25, 0.4, 0.25] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
