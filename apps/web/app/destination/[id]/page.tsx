"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LoadingState, ErrorState } from "@culturecompass/ui";
import { DestinationTabs } from "@/components/destination-tabs";
import type { CompassPlanResponse, Destination } from "@culturecompass/shared";

export default function DestinationPage() {
  const params = useParams();
  const id = params.id as string;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [plan, setPlan] = useState<CompassPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("compassPlan");
    if (!stored) {
      setError("No plan data found. Please generate a plan first.");
      setLoading(false);
      return;
    }

    try {
      const parsed: CompassPlanResponse = JSON.parse(stored);
      setPlan(parsed);
      const dest =
        parsed.destinations.find((d) => d.id === id) ||
        (parsed.featuredDestination.id === id ? parsed.featuredDestination : null);

      if (!dest) {
        setError("Destination not found in your plan.");
      } else {
        setDestination(dest);
      }
    } catch {
      setError("Failed to load destination data.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingState />
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <ErrorState message={error} />
          <div className="mt-4 text-center">
            <Link href="/" className="theme-text text-sm underline-offset-4 hover:underline">
              Start a new discovery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!destination || !plan) return null;

  const isFeatured = plan.featuredDestination.id === destination.id;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <Link href="/" className="theme-text text-sm underline-offset-4 hover:underline">
          ← Back to results
        </Link>
        <div className="mt-4">
          {isFeatured && <span className="theme-badge">Featured Pick</span>}
          <h1 className="theme-text mt-2 text-3xl font-bold">{destination.name}</h1>
          <p className="theme-text-muted">{destination.country}</p>
          <p className="theme-text mt-2 text-lg font-medium">{destination.tagline}</p>
        </div>
      </div>

      <div className="theme-card">
        <p className="theme-text-muted">{destination.rationale}</p>
        <div className="theme-text-subtle mt-4 flex flex-wrap gap-4 text-sm">
          <span>Best time: {destination.bestTimeToVisit}</span>
          <span>Budget: {destination.estimatedBudget}</span>
        </div>
        <Link
          href={`/story/${destination.id}?name=${encodeURIComponent(destination.name)}`}
          className="theme-text mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          Read immersive story →
        </Link>
      </div>

      {isFeatured ? (
        <DestinationTabs
          destinationName={destination.name}
          attractions={plan.attractions}
          hiddenGems={plan.hiddenGems}
          heritage={plan.heritage}
          events={plan.events}
          experiences={plan.experiences}
        />
      ) : (
        <div className="theme-card">
          <p className="theme-text-muted text-sm">
            Detailed cultural tabs are available for your featured destination. Switch to{" "}
            <Link
              href={`/destination/${plan.featuredDestination.id}`}
              className="theme-text font-medium underline"
            >
              {plan.featuredDestination.name}
            </Link>{" "}
            for the full experience.
          </p>
        </div>
      )}
    </div>
  );
}
