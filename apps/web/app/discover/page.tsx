"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ParchmentSkeleton } from "@/components/parchment-skeleton";
import { CulturalResults } from "@/components/cultural-results";
import { ErrorState } from "@culturecompass/ui";
import { createCompassPlan } from "@/lib/api-client";
import { getDisplayError } from "@/lib/errors";
import type { CompassPlanRequest, CompassPlanResponse } from "@culturecompass/shared";

export default function DiscoverPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<CompassPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlan() {
      const cached = sessionStorage.getItem("compassPlan");
      if (cached) {
        setPlan(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const stored = sessionStorage.getItem("compassRequest");
      if (!stored) {
        router.replace("/");
        return;
      }

      try {
        const request: CompassPlanRequest = JSON.parse(stored);
        const result = await createCompassPlan(request);
        setPlan(result);
        sessionStorage.setItem("compassPlan", JSON.stringify(result));
      } catch (err) {
        setError(getDisplayError(err));
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, [router]);

  if (loading) {
    return (
      <div className="theme-surface rounded-2xl">
        <ParchmentSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState message={error} onRetry={() => router.push("/")} />
        <div className="mt-4 text-center">
          <Link href="/" className="theme-text text-sm underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="theme-text font-serif text-2xl font-bold">Your Cultural Journey</h1>
        <Link href="/" className="theme-text text-sm underline-offset-4 hover:underline">
          ← New search
        </Link>
      </div>
      <div className="theme-surface rounded-2xl p-4 sm:p-6">
        <CulturalResults plan={plan} />
      </div>
    </div>
  );
}
