"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CompassPlanResponse } from "@culturecompass/shared";
import { DiscoveryForm } from "@/components/discovery-form";
import { CulturalPortalPlaceholder } from "@/components/cultural-portal-placeholder";
import { ParchmentSkeleton } from "@/components/parchment-skeleton";
import { CulturalResults } from "@/components/cultural-results";
import { ErrorState } from "@culturecompass/ui";

type PortalState = "idle" | "loading" | "results" | "error";

export function CulturalDashboard() {
  const [portalState, setPortalState] = useState<PortalState>("idle");
  const [plan, setPlan] = useState<CompassPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <section className="animate-fade-in text-center lg:text-left">
        <span className="theme-badge">GenAI-Powered Cultural Travel</span>
        <h1 className="theme-text mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Destination Discovery & Cultural Experiences
        </h1>
        <p className="theme-text-muted mt-3 max-w-2xl text-base lg:text-lg">
          Uncover hidden gems, immerse in local heritage, and connect with authentic
          cultural experiences powered by Gemini AI.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-8">
        <div className="animate-fade-in lg:sticky lg:top-24 lg:self-start">
          <div className="theme-surface rounded-2xl p-6 shadow-2xl sm:p-8">
            <h2 className="theme-text mb-6 text-lg font-semibold">
              Plan Your Cultural Journey
            </h2>
            <DiscoveryForm
              onLoading={() => {
                setPortalState("loading");
                setError(null);
              }}
              onSuccess={(result) => {
                setPlan(result);
                setPortalState("results");
              }}
              onError={(message) => {
                setError(message);
                setPortalState("error");
              }}
            />
          </div>
        </div>

        <div className="theme-surface animate-fade-in min-h-[520px] rounded-2xl shadow-2xl">
          <div className="theme-divider flex items-center justify-between border-b px-6 py-4">
            <h2 className="theme-text-subtle text-sm font-semibold uppercase tracking-wider">
              Cultural Portal
            </h2>
            {portalState === "results" && plan && (
              <span className="theme-badge text-[10px]">AI Generated</span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {portalState === "idle" && (
              <motion.div key="idle" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CulturalPortalPlaceholder />
              </motion.div>
            )}
            {portalState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ParchmentSkeleton />
              </motion.div>
            )}
            {portalState === "error" && error && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                <ErrorState message={error} onRetry={() => setPortalState("idle")} />
              </motion.div>
            )}
            {portalState === "results" && plan && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 sm:p-6"
              >
                <CulturalResults plan={plan} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
