"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LoadingState, ErrorState, Card } from "@culturecompass/ui";
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

  if (loading) return <LoadingState />;
  if (error) {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState message={error} />
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-amber-700 underline">
            Start a new discovery
          </Link>
        </div>
      </div>
    );
  }

  if (!destination || !plan) return null;

  const isFeatured = plan.featuredDestination.id === destination.id;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/discover" className="text-sm text-amber-700 hover:text-amber-900">
          ← Back to results
        </Link>
        <div className="mt-4">
          {isFeatured && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Featured Pick
            </span>
          )}
          <h1 className="mt-2 text-3xl font-bold text-stone-900">{destination.name}</h1>
          <p className="text-stone-500">{destination.country}</p>
          <p className="mt-2 text-lg font-medium text-amber-700">{destination.tagline}</p>
        </div>
      </div>

      <Card>
        <p className="text-stone-700">{destination.rationale}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
          <span>Best time: {destination.bestTimeToVisit}</span>
          <span>Budget: {destination.estimatedBudget}</span>
        </div>
        <Link
          href={`/story/${destination.id}?name=${encodeURIComponent(destination.name)}`}
          className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-900"
        >
          Read immersive story →
        </Link>
      </Card>

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
        <Card>
          <p className="text-sm text-stone-600">
            Detailed cultural tabs are available for your featured destination. Switch to{" "}
            <Link
              href={`/destination/${plan.featuredDestination.id}`}
              className="font-medium text-amber-700 underline"
            >
              {plan.featuredDestination.name}
            </Link>{" "}
            for the full experience.
          </p>
        </Card>
      )}
    </div>
  );
}
