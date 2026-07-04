"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { AnimatedGlobe } from "@/components/landing/animated-globe";
import { FloatingCulturalIcons } from "@/components/landing/floating-cultural-icons";
import { FeatureCards } from "@/components/landing/feature-cards";

const EXAMPLE_DESTINATIONS = ["Jaipur", "Kyoto", "Bali", "Rome", "Kerala"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function LandingPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  function handleStartExploring() {
    const params = new URLSearchParams();
    if (destination.trim()) {
      params.set("destination", destination.trim());
    }
    const query = params.toString();
    router.push(query ? `/plan?${query}` : "/plan");
  }

  return (
    <div className="landing-full-bleed">
      <section className="relative flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <AnimatedGlobe />
        <FloatingCulturalIcons />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="theme-badge mb-6 text-[11px] tracking-[0.2em]"
          >
            AI Cultural Companion
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Discover the Soul of
            <br />
            <span className="bg-gradient-to-r from-[var(--foreground)] to-[var(--muted)] bg-clip-text text-transparent">
              Every Destination
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="theme-text-muted mt-5 max-w-md text-base sm:text-lg"
          >
            Your AI Cultural Companion powered by Gemini.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 w-full"
          >
            <label htmlFor="hero-destination" className="sr-only">
              Search destination
            </label>
            <div className="glass-search group relative flex items-center gap-3 rounded-2xl px-4 py-2 sm:rounded-full sm:px-6 sm:py-3">
              <Search
                className="h-5 w-5 shrink-0 opacity-40 transition-opacity group-focus-within:opacity-70"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <input
                ref={searchRef}
                id="hero-destination"
                type="search"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where does your curiosity lead?"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-[var(--muted-foreground)] sm:text-lg"
                style={{ color: "var(--foreground)" }}
              />
              <MapPin
                className="hidden h-5 w-5 shrink-0 opacity-30 sm:block"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="theme-text-subtle text-xs">Try:</span>
              {EXAMPLE_DESTINATIONS.map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => setDestination(place)}
                  className="theme-chip text-xs sm:text-sm"
                >
                  {place}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8"
          >
            <motion.button
              type="button"
              onClick={handleStartExploring}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cta-glow inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold shadow-lg transition-shadow sm:px-10 sm:py-4 sm:text-lg"
            >
              Start Exploring
              <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <FeatureCards />
    </div>
  );
}
