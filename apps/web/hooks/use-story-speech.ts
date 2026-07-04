"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  charIndexToWordIndex,
  isSpeechSynthesisSupported,
  tokenizeNarrative,
} from "@/lib/story-speech";

export type StorySpeechStatus = "idle" | "playing" | "paused";

interface UseStorySpeechOptions {
  rate?: number;
}

export function useStorySpeech(narrative: string, options: UseStorySpeechOptions = {}) {
  const { rate = 0.92 } = options;
  const [status, setStatus] = useState<StorySpeechStatus>("idle");
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [readThroughIndex, setReadThroughIndex] = useState(-1);
  const tokens = useMemo(() => tokenizeNarrative(narrative), [narrative]);
  const supported = isSpeechSynthesisSupported();
  const fallbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const boundaryFiredRef = useRef(false);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    clearFallbackTimer();
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus("idle");
    setActiveWordIndex(-1);
    setReadThroughIndex(-1);
  }, [clearFallbackTimer, supported]);

  const startFallbackHighlight = useCallback(() => {
    clearFallbackTimer();
    if (tokens.length === 0) return;

    const msPerWord = Math.max(180, Math.round((narrative.length / tokens.length) * 45));
    let index = 0;
    setActiveWordIndex(0);
    setReadThroughIndex(-1);

    fallbackTimerRef.current = setInterval(() => {
      if (index >= tokens.length - 1) {
        clearFallbackTimer();
        setReadThroughIndex(tokens.length - 1);
        setActiveWordIndex(-1);
        setStatus("idle");
        return;
      }
      setReadThroughIndex(index);
      index += 1;
      setActiveWordIndex(index);
    }, msPerWord);
  }, [clearFallbackTimer, narrative.length, tokens.length]);

  const play = useCallback(() => {
    if (!supported || !narrative.trim()) return;

    window.speechSynthesis.cancel();
    clearFallbackTimer();
    boundaryFiredRef.current = false;

    const utterance = new SpeechSynthesisUtterance(narrative);
    utterance.rate = rate;
    utterance.pitch = 1;
    utteranceRef.current = utterance;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        boundaryFiredRef.current = true;
        clearFallbackTimer();
        const wordIndex = charIndexToWordIndex(tokens, event.charIndex);
        setReadThroughIndex(Math.max(0, wordIndex - 1));
        setActiveWordIndex(wordIndex);
      }
    };

    utterance.onstart = () => {
      setStatus("playing");
      setActiveWordIndex(0);
      setReadThroughIndex(-1);
      window.setTimeout(() => {
        if (!boundaryFiredRef.current) {
          startFallbackHighlight();
        }
      }, 500);
    };

    utterance.onend = () => {
      clearFallbackTimer();
      setStatus("idle");
      setReadThroughIndex(tokens.length - 1);
      setActiveWordIndex(-1);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      clearFallbackTimer();
      setStatus("idle");
      setActiveWordIndex(-1);
      utteranceRef.current = null;
    };

    window.speechSynthesis.speak(utterance);
  }, [clearFallbackTimer, narrative, rate, startFallbackHighlight, supported, tokens]);

  const pause = useCallback(() => {
    if (!supported) return;
    clearFallbackTimer();
    window.speechSynthesis.pause();
    setStatus("paused");
    setReadThroughIndex((prev) => Math.max(prev, activeWordIndex));
  }, [activeWordIndex, clearFallbackTimer, supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }
    play();
  }, [play, supported]);

  useEffect(() => () => {
    clearFallbackTimer();
    if (isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }, [clearFallbackTimer]);

  useEffect(() => {
    stop();
  }, [narrative, stop]);

  return {
    tokens,
    status,
    activeWordIndex,
    readThroughIndex,
    supported,
    play,
    pause,
    resume,
    stop,
  };
}
