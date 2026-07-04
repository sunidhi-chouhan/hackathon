"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingState, ErrorState, Card } from "@culturecompass/ui";
import { DestinationCard } from "@/components/destination-card";
import { createCompassPlan } from "@/lib/api-client";
import type { CompassPlanRequest, CompassPlanResponse } from "@culturecompass/shared";

export default function DiscoverPage() {
  const [plan, setPlan] = useState<CompassPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlan() {
      const stored = sessionStorage.getItem("compassRequest");
      if (!stored) {
        setError("No discovery request found. Please start from the home page.");
        setLoading(false);
        return;
      }

      try {
        const request: CompassPlanRequest = JSON.parse(stored);
        const result = await createCompassPlan(request);
        setPlan(result);
        sessionStorage.setItem("compassPlan", JSON.stringify(result));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to generate plan.");
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, []);

  if (loading) {
    return <LoadingState message="CultureCompass is crafting your personalized journey..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-amber-700 underline hover:text-amber-900">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Your Cultural Journey</h1>
        <p className="mt-2 text-stone-600">
          Based on your preferences, here are destinations and experiences curated for you.
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-stone-900">Featured Destination</h2>
        <DestinationCard destination={plan.featuredDestination} featured />
      </section>

      {plan.storySnippet && (
        <section>
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <h2 className="text-lg font-semibold text-stone-900">{plan.storySnippet.title}</h2>
            <p className="mt-3 text-stone-700 leading-relaxed">{plan.storySnippet.preview}</p>
            <Link
              href={`/story/${plan.featuredDestination.id}?name=${encodeURIComponent(plan.featuredDestination.name)}`}
              className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              Read the full story →
            </Link>
          </Card>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-stone-900">All Recommendations</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plan.destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-stone-900">Top Attractions</h3>
          <ul className="mt-3 space-y-2">
            {plan.attractions.slice(0, 3).map((a) => (
              <li key={a.name} className="text-sm text-stone-600">
                <span className="font-medium text-stone-800">{a.name}</span> — {a.category}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold text-stone-900">Hidden Gems</h3>
          <ul className="mt-3 space-y-2">
            {plan.hiddenGems.slice(0, 3).map((g) => (
              <li key={g.name} className="text-sm text-stone-600">
                <span className="font-medium text-stone-800">{g.name}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
