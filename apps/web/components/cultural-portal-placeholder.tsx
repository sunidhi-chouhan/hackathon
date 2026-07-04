"use client";

import { motion } from "framer-motion";

const floatingCards = [
  { icon: "🏛️", label: "Heritage", delay: 0 },
  { icon: "💎", label: "Hidden Gems", delay: 0.5 },
  { icon: "📅", label: "Festivals", delay: 1 },
  { icon: "🤝", label: "Experiences", delay: 1.5 },
];

export function CulturalPortalPlaceholder() {
  return (
    <div className="relative flex h-full min-h-[480px] flex-col items-center justify-center overflow-hidden p-6">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: "var(--glow)" }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="theme-surface mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
        >
          🧭
        </motion.div>
        <h3 className="theme-text font-serif text-2xl font-bold">Cultural Portal</h3>
        <p className="theme-text-muted mt-3 max-w-xs text-sm leading-relaxed">
          Your discoveries await. Fill in your journey preferences and let AI unveil
          the soul of every destination.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid w-full max-w-sm grid-cols-2 gap-4">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ scale: 1.03, y: -4 }}
            className="theme-card"
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, delay: card.delay, repeat: Infinity }}
              className="block text-2xl"
            >
              {card.icon}
            </motion.span>
            <p className="theme-text-muted mt-2 text-xs font-medium">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
