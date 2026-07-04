import Link from "next/link";
import { Card } from "@culturecompass/ui";
import type { Destination } from "@culturecompass/shared";

interface DestinationCardProps {
  destination: Destination;
  featured?: boolean;
}

export function DestinationCard({ destination, featured = false }: DestinationCardProps) {
  return (
    <Link href={`/destination/${destination.id}`}>
      <Card hover className={`animate-fade-in h-full ${featured ? "border-amber-300 ring-1 ring-amber-200" : ""}`}>
        {featured && (
          <span className="mb-2 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            Top Pick
          </span>
        )}
        <h3 className="text-xl font-bold text-stone-900">{destination.name}</h3>
        <p className="text-sm text-stone-500">{destination.country}</p>
        <p className="mt-2 text-sm font-medium text-amber-700">{destination.tagline}</p>
        <p className="mt-3 text-sm text-stone-600 line-clamp-3">{destination.rationale}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-stone-500">
          <span>Best: {destination.bestTimeToVisit}</span>
          <span>Budget: {destination.estimatedBudget}</span>
        </div>
      </Card>
    </Link>
  );
}
