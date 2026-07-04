"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    emoji: "🏛",
    title: "Heritage",
    description:
      "Walk through centuries of tradition — temples, monuments, and stories etched into every stone.",
  },
  {
    emoji: "💎",
    title: "Hidden Gems",
    description:
      "Discover the places locals guard closely — quiet courtyards, secret viewpoints, and untold legends.",
  },
  {
    emoji: "🎭",
    title: "Local Experiences",
    description:
      "Connect with authentic culture through workshops, festivals, and moments that feel truly alive.",
  },
] as const;

export function FeatureCards() {
  return (
    <section
      id="explore"
      className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-4 sm:px-6 lg:px-8"
      aria-labelledby="explore-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 id="explore-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          What awaits you
        </h2>
        <p className="theme-text-muted mx-auto mt-3 max-w-lg text-sm sm:text-base">
          CultureCompass reveals the soul of every place — not just where to go, but why it matters.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        {CARDS.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -8,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="glass-card group cursor-default rounded-3xl p-8"
          >
            <motion.span
              className="mb-5 block text-4xl"
              whileHover={{ scale: 1.15, rotate: [-2, 2, 0] }}
              transition={{ duration: 0.35 }}
              aria-hidden="true"
            >
              {card.emoji}
            </motion.span>
            <h3 className="theme-text text-lg font-semibold tracking-tight">{card.title}</h3>
            <p className="theme-text-muted mt-3 text-sm leading-relaxed">{card.description}</p>
            <div
              className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full"
              style={{ background: "var(--border)" }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
