"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Search, Sparkles, ArrowRight, Send } from "lucide-react";
import {
  ASSISTANT_PROMPTS,
  BUDGET_OPTIONS,
  COMPANION_OPTIONS,
  DURATION_OPTIONS,
  INITIAL_PLANNER_ANSWERS,
  PLANNER_INTERESTS,
  PLANNER_STEPS,
  type PlannerAnswers,
  type PlannerStep,
  formatUserAnswer,
} from "@/lib/planner-constants";
import { filterDestinationSuggestions } from "@/lib/location-utils";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ConversationalPlannerProps {
  initialDestination?: string;
  onGenerate: (answers: PlannerAnswers) => void;
  generating?: boolean;
}

export function ConversationalPlanner({
  initialDestination = "",
  onGenerate,
  generating = false,
}: ConversationalPlannerProps) {
  const [step, setStep] = useState<PlannerStep>("destination");
  const [answers, setAnswers] = useState<PlannerAnswers>({
    ...INITIAL_PLANNER_ANSWERS,
    destination: initialDestination,
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm CultureCompass — your cultural companion. Let's find a place that speaks to your soul.",
    },
    {
      id: "q-destination",
      role: "assistant",
      text: ASSISTANT_PROMPTS.destination,
    },
  ]);
  const [destinationInput, setDestinationInput] = useState(initialDestination);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepIndex = PLANNER_STEPS.indexOf(step);

  const suggestions = filterDestinationSuggestions(destinationInput);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, step, scrollToBottom]);

  function appendMessages(...msgs: ChatMessage[]) {
    setMessages((prev) => [...prev, ...msgs]);
  }

  function advanceFrom(current: PlannerStep, updatedAnswers: PlannerAnswers) {
    const answerText = formatUserAnswer(current, updatedAnswers);
    const currentIdx = PLANNER_STEPS.indexOf(current);
    const nextStep = PLANNER_STEPS[currentIdx + 1];

    appendMessages({
      id: `user-${current}-${Date.now()}`,
      role: "user",
      text: answerText,
    });

    if (nextStep === "generate") {
      setStep("generate");
      appendMessages({
        id: "ready",
        role: "assistant",
        text: "Wonderful. I have everything I need to craft your cultural journey.",
      });
      return;
    }

    setStep(nextStep);
    appendMessages({
      id: `q-${nextStep}`,
      role: "assistant",
      text: ASSISTANT_PROMPTS[nextStep as Exclude<PlannerStep, "generate">],
    });
  }

  function handleDestinationContinue(override?: string) {
    const dest = override !== undefined ? override : destinationInput;
    const updated = { ...answers, destination: dest };
    setAnswers(updated);
    if (override !== undefined) {
      setDestinationInput(override);
    }
    setShowSuggestions(false);
    advanceFrom("destination", updated);
  }

  function handleInterestsContinue() {
    if (answers.interests.length === 0) return;
    advanceFrom("interests", answers);
  }

  function toggleInterest(interest: (typeof PLANNER_INTERESTS)[number]) {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function selectCompanion(companion: (typeof COMPANION_OPTIONS)[number]) {
    const updated = { ...answers, companion };
    setAnswers(updated);
    setTimeout(() => advanceFrom("companions", updated), 280);
  }

  function selectBudget(budget: (typeof BUDGET_OPTIONS)[number]["id"]) {
    const updated = { ...answers, budget };
    setAnswers(updated);
    setTimeout(() => advanceFrom("budget", updated), 280);
  }

  function selectDuration(duration: (typeof DURATION_OPTIONS)[number]) {
    const updated = { ...answers, duration };
    setAnswers(updated);
    if (duration !== "Custom") {
      setTimeout(() => advanceFrom("duration", updated), 280);
    }
  }

  function handleCustomDurationContinue() {
    if (!answers.duration) return;
    advanceFrom("duration", answers);
  }

  return (
    <div className="flex h-[calc(100dvh-4.5rem)] flex-col">
      <div className="theme-divider flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="glass-icon flex h-9 w-9 items-center justify-center rounded-full">
            <Compass className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div>
            <p className="theme-text text-sm font-semibold">CultureCompass</p>
            <p className="theme-text-subtle text-xs">Cultural companion</p>
          </div>
        </div>
        <p className="theme-text-subtle text-xs" aria-live="polite">
          {step === "generate" ? "Ready" : `Step ${Math.min(stepIndex + 1, 5)} of 5`}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
        role="log"
        aria-label="Conversation with CultureCompass"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                    <Compass className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:text-base ${
                    msg.role === "assistant"
                      ? "glass-card rounded-bl-md"
                      : "rounded-br-md"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background: "var(--accent)",
                          color: "var(--accent-foreground)",
                        }
                      : undefined
                  }
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="theme-divider border-t px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {step === "destination" && (
              <motion.div
                key="destination"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="glass-search relative flex items-center gap-2 rounded-2xl px-4 py-1">
                  <Search className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
                  <input
                    type="search"
                    value={destinationInput}
                    onChange={(e) => {
                      setDestinationInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => e.key === "Enter" && handleDestinationContinue()}
                    placeholder="Search a city or region…"
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none sm:text-base"
                    style={{ color: "var(--foreground)" }}
                    aria-label="Where do you want to explore?"
                  />
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="glass-card max-h-36 overflow-auto rounded-xl py-1">
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          className="theme-text-muted w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--accent-muted)]"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setDestinationInput(s);
                            setShowSuggestions(false);
                          }}
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDestinationContinue("")}
                    className="theme-chip text-sm"
                  >
                    <Sparkles className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
                    Surprise me
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDestinationContinue()}
                    className="cta-glow ml-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "interests" && (
              <motion.div
                key="interests"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap gap-2" role="group" aria-label="Interests">
                  {PLANNER_INTERESTS.map((interest) => {
                    const selected = answers.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleInterest(interest)}
                        className={`theme-chip ${selected ? "theme-chip-active" : ""}`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  disabled={answers.interests.length === 0}
                  onClick={handleInterestsContinue}
                  className="cta-glow flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.div>
            )}

            {step === "companions" && (
              <motion.div
                key="companions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                role="group"
                aria-label="Travel companions"
              >
                {COMPANION_OPTIONS.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectCompanion(option)}
                    className="glass-card rounded-2xl px-4 py-4 text-sm font-medium transition-colors hover:border-[var(--accent)]"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === "budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                role="group"
                aria-label="Budget"
              >
                {BUDGET_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectBudget(option.id)}
                    className="glass-card flex flex-col items-center rounded-2xl px-3 py-4"
                  >
                    <span className="theme-text text-lg font-semibold">{option.label}</span>
                    <span className="theme-text-subtle mt-1 text-xs">{option.description}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === "duration" && (
              <motion.div
                key="duration"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Duration">
                  {DURATION_OPTIONS.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectDuration(option)}
                      className={`glass-card rounded-2xl px-3 py-4 text-sm font-medium ${
                        answers.duration === option ? "ring-2 ring-[var(--accent)]" : ""
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                {answers.duration === "Custom" && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={answers.customDuration}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, customDuration: e.target.value }))
                      }
                      placeholder="e.g. 10 days"
                      className="theme-input flex-1"
                      aria-label="Custom duration"
                    />
                    <button
                      type="button"
                      onClick={handleCustomDurationContinue}
                      className="cta-glow shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === "generate" && (
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <motion.button
                  type="button"
                  disabled={generating}
                  onClick={() => onGenerate(answers)}
                  whileHover={{ scale: generating ? 1 : 1.01 }}
                  whileTap={{ scale: generating ? 1 : 0.98 }}
                  className="cta-glow flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-base font-semibold shadow-lg disabled:opacity-60"
                  aria-busy={generating}
                >
                  {generating ? (
                    <>Charting your journey…</>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Generate Journey
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
