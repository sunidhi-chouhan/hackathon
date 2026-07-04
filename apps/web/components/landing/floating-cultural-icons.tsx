"use client";

import {
  Landmark,
  Gem,
  Drama,
  UtensilsCrossed,
  Music2,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingIcon {
  Icon: LucideIcon;
  label: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

const ICONS: FloatingIcon[] = [
  { Icon: Landmark, label: "Heritage", x: "12%", y: "22%", delay: 0, duration: 5 },
  { Icon: Gem, label: "Hidden gems", x: "82%", y: "18%", delay: 0.8, duration: 6 },
  { Icon: Drama, label: "Culture", x: "88%", y: "58%", delay: 1.2, duration: 5.5 },
  { Icon: UtensilsCrossed, label: "Cuisine", x: "8%", y: "62%", delay: 0.4, duration: 6.2 },
  { Icon: Music2, label: "Music", x: "22%", y: "78%", delay: 1.6, duration: 5.8 },
  { Icon: Palette, label: "Art", x: "72%", y: "80%", delay: 2, duration: 6.5 },
];

export function FloatingCulturalIcons() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {ICONS.map(({ Icon, label, x, y, delay, duration }) => (
        <motion.div
          key={label}
          className="glass-icon absolute flex h-12 w-12 items-center justify-center rounded-2xl lg:h-14 lg:w-14"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            reduceMotion
              ? { opacity: 0.7, scale: 1 }
              : {
                  opacity: [0.55, 0.9, 0.55],
                  y: [0, -12, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.3 }
              : {
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <Icon className="h-5 w-5 text-[var(--foreground)] opacity-80 lg:h-6 lg:w-6" strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
