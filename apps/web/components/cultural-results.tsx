"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CompassPlanResponse } from "@culturecompass/shared";
import { PORTAL_TABS, type PortalTab } from "@/lib/constants";

interface CulturalResultsProps {
  plan: CompassPlanResponse;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function CulturalResults({ plan }: CulturalResultsProps) {
  const [activeTab, setActiveTab] = useState<PortalTab>("heritage");
  const dest = plan.featuredDestination;

  return (
    <motion.div initial={false} animate={{ opacity: 1 }} className="flex flex-col gap-5">
      {/* Hero — Local Lore */}
      <section
        className="relative overflow-hidden rounded-2xl border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          background: `linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--accent)" }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="theme-badge">Local Lore & Storytelling</span>
            <div className="flex gap-2">
              <MetaPill label="Budget" value={dest.estimatedBudget} />
              <MetaPill label="Best time" value={dest.bestTimeToVisit} />
            </div>
          </div>

          <h2 className="theme-text mt-4 font-serif text-2xl font-bold sm:text-3xl">
            {dest.name}
          </h2>
          <p className="theme-text-muted text-sm">{dest.country}</p>
          <p className="theme-text mt-1 text-sm font-medium">{dest.tagline}</p>

          <blockquote
            className="relative mt-6 rounded-xl border-l-4 py-2 pl-5 pr-2"
            style={{ borderColor: "var(--accent)", background: "var(--accent-muted)" }}
          >
            <span
              className="absolute -left-1 -top-3 font-serif text-5xl opacity-20"
              style={{ color: "var(--accent)" }}
            >
              &ldquo;
            </span>
            <p className="theme-text font-serif text-base italic leading-relaxed sm:text-lg">
              {plan.storySnippet.preview}
            </p>
            <footer className="theme-text-subtle mt-3 text-xs">
              — {plan.storySnippet.title}
            </footer>
          </blockquote>

          <p className="theme-text-muted mt-4 text-sm leading-relaxed">{dest.rationale}</p>

          <Link
            href={`/story/${dest.id}?name=${encodeURIComponent(dest.name)}`}
            className="theme-text mt-4 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Read the full legend →
          </Link>
        </div>
      </section>

      {/* Destination chips */}
      <motion.div variants={containerVariants} initial="show" animate="show" className="flex flex-wrap gap-2">
        {plan.destinations.map((d) => (
          <motion.span
            key={d.id}
            variants={itemVariants}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              d.id === dest.id ? "theme-chip-active" : "theme-chip"
            }`}
          >
            {d.id === dest.id && "★ "}
            {d.name}
          </motion.span>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="theme-divider border-b pb-0">
        <div className="flex flex-wrap gap-1">
          {PORTAL_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`theme-tab relative mb-[-1px] rounded-t-lg border-b-2 px-3 py-2.5 sm:px-4 ${
                activeTab === tab.id
                  ? "theme-tab-active border-b-2 font-semibold"
                  : "border-transparent"
              }`}
              style={
                activeTab === tab.id
                  ? { borderBottomColor: "var(--accent)" }
                  : undefined
              }
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === "heritage" && (
            <TabPanel key="heritage">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                <motion.div variants={itemVariants} className="theme-card">
                  <SectionLabel icon="📜" title="Cultural Significance" />
                  <p className="theme-text-muted mt-2 text-sm leading-relaxed">
                    {plan.heritage.culturalSignificance}
                  </p>
                </motion.div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {plan.attractions.map((item, i) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      whileHover={{ y: -3 }}
                      className="theme-card group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="theme-badge text-[10px]">{item.category}</span>
                        <span className="theme-text-subtle text-xs">#{i + 1}</span>
                      </div>
                      <h4 className="theme-text mt-2 font-semibold">{item.name}</h4>
                      <p className="theme-text-muted mt-2 text-sm">{item.description}</p>
                      <p
                        className="theme-text-subtle mt-3 border-t pt-2 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ borderColor: "var(--border)" }}
                      >
                        💡 {item.tip}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: "✦", title: "Highlights", items: plan.heritage.highlights },
                    { icon: "◎", title: "Traditions", items: plan.heritage.traditions },
                    { icon: "◇", title: "Etiquette", items: plan.heritage.etiquetteTips },
                  ].map((section) => (
                    <motion.div key={section.title} variants={itemVariants} className="theme-card">
                      <SectionLabel icon={section.icon} title={section.title} />
                      <ul className="mt-3 space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="theme-text-muted flex gap-2 text-xs">
                            <span style={{ color: "var(--accent)" }}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabPanel>
          )}

          {activeTab === "gems" && (
            <TabPanel key="gems">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-3 sm:grid-cols-2"
              >
                {plan.hiddenGems.map((gem, i) => (
                  <motion.div
                    key={gem.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="theme-card relative overflow-hidden"
                  >
                    <div
                      className="absolute right-0 top-0 h-16 w-16 rounded-bl-full opacity-10"
                      style={{ background: "var(--accent)" }}
                    />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
                      className="theme-badge text-[10px]"
                    >
                      💎 Hidden Gem
                    </motion.span>
                    <h4 className="theme-text mt-2 font-semibold">{gem.name}</h4>
                    <p className="theme-text-muted mt-2 text-sm">{gem.description}</p>
                    <p className="theme-text mt-2 text-sm font-medium">{gem.whyVisit}</p>
                    <p className="theme-text-subtle mt-2 text-xs">Local tip: {gem.localTip}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabPanel>
          )}

          {activeTab === "events" && (
            <TabPanel key="events">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative pl-6">
                <div
                  className="absolute bottom-0 left-[7px] top-0 w-px"
                  style={{ background: "var(--border)" }}
                />
                <div className="space-y-4">
                  {plan.events.map((event) => (
                    <motion.div key={event.name} variants={itemVariants} className="relative">
                      <div
                        className="absolute -left-6 top-4 h-3.5 w-3.5 rounded-full border-2"
                        style={{
                          borderColor: "var(--accent)",
                          background: "var(--background)",
                        }}
                      />
                      <div className="theme-card">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h4 className="theme-text font-semibold">{event.name}</h4>
                          <span className="theme-badge text-[10px]">{event.date}</span>
                        </div>
                        <p className="theme-text-muted mt-2 text-sm">{event.description}</p>
                        <p className="theme-text-subtle mt-2 text-xs">📍 {event.location}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabPanel>
          )}

          {activeTab === "experiences" && (
            <TabPanel key="experiences">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-3 sm:grid-cols-2"
              >
                {plan.experiences.map((exp) => (
                  <motion.div
                    key={exp.name}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    className="theme-card flex flex-col"
                  >
                    <div className="flex items-center gap-2">
                      <span className="theme-badge text-[10px]">{exp.type}</span>
                      <span className="theme-text-subtle text-xs">⏱ {exp.duration}</span>
                    </div>
                    <h4 className="theme-text mt-3 font-semibold">{exp.name}</h4>
                    <p className="theme-text-muted mt-2 flex-1 text-sm">{exp.description}</p>
                    <p
                      className="theme-text-subtle mt-3 border-t pt-2 text-xs italic"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {exp.authenticityNote}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </TabPanel>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg border px-2.5 py-1 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <p className="theme-text-subtle text-[10px] uppercase tracking-wide">{label}</p>
      <p className="theme-text text-xs font-medium">{value}</p>
    </div>
  );
}

function SectionLabel({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <h4 className="theme-text text-sm font-semibold">{title}</h4>
    </div>
  );
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
