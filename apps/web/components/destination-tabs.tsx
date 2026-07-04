"use client";

import { useState } from "react";
import { Card } from "@culturecompass/ui";

type Tab = "attractions" | "hidden-gems" | "heritage" | "events" | "experiences";

interface TabPanelProps {
  destinationName: string;
  attractions: Array<{ name: string; description: string; category: string; tip: string }>;
  hiddenGems: Array<{ name: string; description: string; whyVisit: string; localTip: string }>;
  heritage: {
    highlights: string[];
    traditions: string[];
    etiquetteTips: string[];
    culturalSignificance: string;
  };
  events: Array<{ name: string; date: string; description: string; location: string }>;
  experiences: Array<{
    name: string;
    description: string;
    type: string;
    duration: string;
    authenticityNote: string;
  }>;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "attractions", label: "Attractions" },
  { id: "hidden-gems", label: "Hidden Gems" },
  { id: "heritage", label: "Heritage" },
  { id: "events", label: "Events" },
  { id: "experiences", label: "Experiences" },
];

export function DestinationTabs({
  destinationName,
  attractions,
  hiddenGems,
  heritage,
  events,
  experiences,
}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("attractions");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "attractions" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {attractions.map((item) => (
            <Card key={item.name}>
              <span className="text-xs font-medium uppercase tracking-wide text-amber-600">
                {item.category}
              </span>
              <h4 className="mt-1 font-semibold text-stone-900">{item.name}</h4>
              <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              <p className="mt-2 text-xs text-stone-500">Tip: {item.tip}</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "hidden-gems" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {hiddenGems.map((item) => (
            <Card key={item.name}>
              <h4 className="font-semibold text-stone-900">{item.name}</h4>
              <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              <p className="mt-2 text-sm text-amber-700">{item.whyVisit}</p>
              <p className="mt-2 text-xs text-stone-500">Local tip: {item.localTip}</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "heritage" && (
        <div className="space-y-6">
          <Card>
            <h4 className="font-semibold text-stone-900">Cultural Significance</h4>
            <p className="mt-2 text-sm text-stone-600">{heritage.culturalSignificance}</p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-semibold text-stone-900">Highlights</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-stone-600">
                {heritage.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h4 className="font-semibold text-stone-900">Traditions</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-stone-600">
                {heritage.traditions.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h4 className="font-semibold text-stone-900">Etiquette Tips</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-stone-600">
                {heritage.etiquetteTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((item) => (
            <Card key={item.name}>
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-stone-900">{item.name}</h4>
                <span className="text-xs text-amber-600">{item.date}</span>
              </div>
              <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              <p className="mt-2 text-xs text-stone-500">{item.location}</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "experiences" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {experiences.map((item) => (
            <Card key={item.name}>
              <div className="flex items-center gap-2">
                <span className="rounded bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                  {item.type}
                </span>
                <span className="text-xs text-stone-500">{item.duration}</span>
              </div>
              <h4 className="mt-2 font-semibold text-stone-900">{item.name}</h4>
              <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              <p className="mt-2 text-xs italic text-amber-700">{item.authenticityNote}</p>
            </Card>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-stone-400">
        Cultural insights for {destinationName} powered by Gemini AI
      </p>
    </div>
  );
}
