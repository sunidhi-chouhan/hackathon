import {
  DEFAULT_GEMINI_MODEL,
  DEFAULT_MODEL_PRESET,
  MODEL_PRESETS,
  type ModelPreset,
} from "@culturecompass/shared";

export function resolveModelName(modelPreset?: ModelPreset): string {
  if (modelPreset && modelPreset in MODEL_PRESETS) {
    return MODEL_PRESETS[modelPreset];
  }

  return process.env.GEMINI_MODEL || MODEL_PRESETS[DEFAULT_MODEL_PRESET] || DEFAULT_GEMINI_MODEL;
}
