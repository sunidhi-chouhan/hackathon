import type { StorySnippet } from "@culturecompass/shared";

export interface StoryToken {
  word: string;
  start: number;
}

export function tokenizeNarrative(text: string): StoryToken[] {
  const tokens: StoryToken[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    tokens.push({ word: match[0], start: match.index });
  }
  return tokens;
}

export function charIndexToWordIndex(tokens: StoryToken[], charIndex: number): number {
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (charIndex >= tokens[i].start) return i;
  }
  return 0;
}

export function getStoryNarrative(snippet: StorySnippet): string {
  return snippet.narrative?.trim() || snippet.preview;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
