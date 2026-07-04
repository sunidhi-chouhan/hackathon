/**
 * Sanitizes user-provided text before interpolation into AI prompts.
 * Strips control characters and common prompt-injection patterns.
 */
export function sanitizePromptInput(value: string, maxLength: number): string {
  return value
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .replace(/ignore\s+(all\s+)?(previous|prior)\s+instructions/gi, "[filtered]")
    .replace(/system\s*:/gi, "[filtered]")
    .trim();
}

export function wrapUserData(label: string, value: string): string {
  return `<${label}>${value}</${label}>`;
}
