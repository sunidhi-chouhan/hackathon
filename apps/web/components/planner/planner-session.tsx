"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { CompassPlanRequest, CompassPlanResponse, LensMode } from "@culturecompass/shared";
import { DEFAULT_LENS_MODE } from "@culturecompass/shared";
import { ConversationalPlanner } from "@/components/planner/conversational-planner";
import { JourneyDashboard } from "@/components/dashboard/journey-dashboard";
import { ParchmentSkeleton } from "@/components/parchment-skeleton";
import { ErrorState } from "@culturecompass/ui";
import { createCompassPlan } from "@/lib/api-client";
import { getDisplayError } from "@/lib/errors";
import { buildCompassPlanRequest, type PlannerAnswers } from "@/lib/planner-constants";
import { readPlannerSession } from "@/lib/planner-session-storage";

type SessionPhase = "planner" | "loading" | "results" | "error";

interface PlannerSessionProps {
  initialDestination?: string;
}

export function PlannerSession({ initialDestination }: PlannerSessionProps) {
  const [phase, setPhase] = useState<SessionPhase>("planner");
  const [plan, setPlan] = useState<CompassPlanResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<CompassPlanRequest | null>(null);
  const [lensMode, setLensMode] = useState<LensMode>(DEFAULT_LENS_MODE);
  const [lensLoading, setLensLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restored = readPlannerSession(sessionStorage);
    if (!restored) return;
    setPlan(restored.plan);
    setLastRequest(restored.request);
    setLensMode(restored.lensMode);
    setPhase("results");
  }, []);

  async function handleGenerate(answers: PlannerAnswers) {
    setPhase("loading");
    setError(null);

    try {
      const payload = buildCompassPlanRequest(answers, lensMode);
      const result = await createCompassPlan(payload);
      setPlan(result);
      setLastRequest(payload);
      sessionStorage.setItem("compassRequest", JSON.stringify(payload));
      sessionStorage.setItem("compassPlan", JSON.stringify(result));
      setPhase("results");
    } catch (err) {
      setError(getDisplayError(err));
      setPhase("error");
    }
  }

  async function handleLensModeChange(mode: LensMode) {
    if (mode === lensMode || !lastRequest) return;

    setLensMode(mode);
    setLensLoading(true);
    setError(null);

    try {
      const payload: CompassPlanRequest = { ...lastRequest, lensMode: mode };
      const result = await createCompassPlan(payload);
      setPlan(result);
      setLastRequest(payload);
      sessionStorage.setItem("compassRequest", JSON.stringify(payload));
      sessionStorage.setItem("compassPlan", JSON.stringify(result));
    } catch (err) {
      setError(getDisplayError(err));
    } finally {
      setLensLoading(false);
    }
  }

  if (phase === "results" && plan) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {error && (
          <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300" role="alert">
              {error}
            </p>
          </div>
        )}
        <JourneyDashboard
          plan={plan}
          lensMode={lensMode}
          lensLoading={lensLoading}
          onLensModeChange={handleLensModeChange}
        />
      </motion.div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="theme-text-muted mb-6 text-center text-sm sm:text-base"
          aria-live="polite"
        >
          The compass is listening to the stories of the world…
        </motion.p>
        <div className="w-full max-w-lg">
          <ParchmentSkeleton />
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex min-h-[calc(100dvh-4.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4">
          <ErrorState
            message={error ?? "Something went wrong."}
            onRetry={() => setPhase("planner")}
          />
          <p className="text-center">
            <Link href="/" className="theme-text text-sm underline-offset-4 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="planner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ConversationalPlanner
          initialDestination={initialDestination}
          onGenerate={handleGenerate}
        />
      </motion.div>
    </AnimatePresence>
  );
}
