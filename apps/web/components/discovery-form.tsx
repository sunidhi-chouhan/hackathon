"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DEFAULT_LENS_MODE,
  DEFAULT_MODEL_PRESET,
  INTEREST_TAGS,
  MODEL_PRESET_OPTIONS,
  TRAVEL_STYLES,
} from "@culturecompass/shared";
import type { CompassPlanRequest, CompassPlanResponse, ModelPreset } from "@culturecompass/shared";
import { createCompassPlan } from "@/lib/api-client";
import { getDisplayError } from "@/lib/errors";
import { INTEREST_ICONS } from "@/lib/constants";
import { LocationInput } from "@/components/location-input";

interface DiscoveryFormProps {
  onLoading: () => void;
  onSuccess: (plan: CompassPlanResponse) => void;
  onError: (message: string) => void;
}

export function DiscoveryForm({ onLoading, onSuccess, onError }: DiscoveryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [form, setForm] = useState({
    destination: "",
    budget: "",
    duration: "",
    travelStyle: "cultural",
    modelPreset: DEFAULT_MODEL_PRESET as ModelPreset,
    notes: "",
  });

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (selectedInterests.length === 0) {
      setFormError("Please select at least one interest.");
      return;
    }

    if (!form.budget || !form.duration) {
      setFormError("Budget and duration are required.");
      return;
    }

    const payload: CompassPlanRequest = {
      destination: form.destination.trim() || undefined,
      interests: selectedInterests,
      budget: form.budget,
      duration: form.duration,
      travelStyle: form.travelStyle,
      modelPreset: form.modelPreset,
      notes: form.notes,
      lensMode: DEFAULT_LENS_MODE,
    };

    setLoading(true);
    onLoading();

    try {
      const result = await createCompassPlan(payload);
      sessionStorage.setItem("compassRequest", JSON.stringify(payload));
      sessionStorage.setItem("compassPlan", JSON.stringify(result));
      onSuccess(result);
    } catch (err) {
      onError(getDisplayError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
      <LocationInput
        value={form.destination}
        onChange={(destination) => setForm({ ...form, destination })}
      />

      <div>
        <label className="theme-text mb-2 block text-sm font-medium">What interests you?</label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Travel interests">
          {INTEREST_TAGS.map((tag) => {
            const selected = selectedInterests.includes(tag);
            return (
              <motion.button
                key={tag}
                type="button"
                onClick={() => toggleInterest(tag)}
                whileTap={{ scale: 0.97 }}
                aria-pressed={selected}
                className={`theme-chip inline-flex shrink-0 items-center gap-1.5 capitalize ${
                  selected ? "theme-chip-active" : ""
                }`}
              >
                <span className={selected ? "" : "opacity-50"} aria-hidden="true">
                  {INTEREST_ICONS[tag] ?? "✦"}
                </span>
                {tag.replace("-", " ")}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Budget" id="budget">
          <input
            id="budget"
            type="text"
            placeholder="e.g. $2000"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="theme-input"
          />
        </Field>
        <Field label="Duration" id="duration">
          <input
            id="duration"
            type="text"
            placeholder="e.g. 5 days"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="theme-input"
          />
        </Field>
      </div>

      <Field label="Travel style" id="travelStyle">
        <select
          id="travelStyle"
          value={form.travelStyle}
          onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
          className="theme-select"
        >
          {TRAVEL_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </Field>

      <Field label="AI model" id="modelPreset">
        <select
          id="modelPreset"
          value={form.modelPreset}
          onChange={(e) =>
            setForm({ ...form, modelPreset: e.target.value as ModelPreset })
          }
          className="theme-select normal-case"
        >
          {MODEL_PRESET_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label} — {option.description}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Additional notes (optional)" id="notes">
        <textarea
          id="notes"
          rows={2}
          placeholder="Special preferences..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="theme-input"
        />
      </Field>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        {formError && (
          <p className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500 dark:text-red-300">
            {formError}
          </p>
        )}
        <button type="submit" disabled={loading} className="theme-btn-primary" aria-busy={loading}>
          {loading ? "Charting your journey..." : "Discover My Cultural Journey"}
        </button>
        {loading && (
          <p className="sr-only" aria-live="polite">
            Generating your cultural plan. This may take a moment.
          </p>
        )}
      </motion.div>
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="theme-text mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
