import { DEFAULT_MODEL_PRESET, modelPresetSchema, type ModelPreset } from "@culturecompass/shared";

const COMPASS_REQUEST_KEY = "compassRequest";

export function getStoredModelPreset(): ModelPreset | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = sessionStorage.getItem(COMPASS_REQUEST_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored) as { modelPreset?: unknown };
    if (!parsed.modelPreset) return undefined;

    const result = modelPresetSchema.safeParse(parsed.modelPreset);
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}

export function getModelPresetOrDefault(modelPreset?: ModelPreset): ModelPreset {
  return modelPreset ?? DEFAULT_MODEL_PRESET;
}
