"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@culturecompass/ui";
import { INTEREST_TAGS, TRAVEL_STYLES } from "@culturecompass/shared";
import type { CompassPlanRequest } from "@culturecompass/shared";

export function DiscoveryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [form, setForm] = useState({
    budget: "",
    duration: "",
    travelStyle: "cultural",
    startDate: "",
    endDate: "",
    notes: "",
  });

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (selectedInterests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }

    if (!form.budget || !form.duration) {
      setError("Budget and duration are required.");
      return;
    }

    const payload: CompassPlanRequest = {
      interests: selectedInterests,
      budget: form.budget,
      duration: form.duration,
      travelStyle: form.travelStyle,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      notes: form.notes,
    };

    setLoading(true);

    try {
      sessionStorage.setItem("compassRequest", JSON.stringify(payload));
      router.push("/discover");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-stone-700">
          What interests you?
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleInterest(tag)}
              className={`rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${
                selectedInterests.includes(tag)
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tag.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-1 block text-sm font-medium text-stone-700">
            Budget
          </label>
          <input
            id="budget"
            type="text"
            placeholder="e.g. $2000, moderate"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="mb-1 block text-sm font-medium text-stone-700">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            placeholder="e.g. 5 days, 1 week"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="travelStyle" className="mb-1 block text-sm font-medium text-stone-700">
          Travel style
        </label>
        <select
          id="travelStyle"
          value={form.travelStyle}
          onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm capitalize focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          {TRAVEL_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="mb-1 block text-sm font-medium text-stone-700">
            Start date (optional)
          </label>
          <input
            id="startDate"
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-1 block text-sm font-medium text-stone-700">
            End date (optional)
          </label>
          <input
            id="endDate"
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-stone-700">
          Additional notes (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any special preferences or constraints..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Starting discovery..." : "Discover My Cultural Journey"}
      </Button>
    </form>
  );
}
