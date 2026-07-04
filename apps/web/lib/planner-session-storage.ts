import type { CompassPlanRequest, CompassPlanResponse, LensMode } from "@culturecompass/shared";
import { DEFAULT_LENS_MODE } from "@culturecompass/shared";

export interface RestoredPlannerSession {
  plan: CompassPlanResponse;
  request: CompassPlanRequest;
  lensMode: LensMode;
}

export function readPlannerSession(storage: Pick<Storage, "getItem">): RestoredPlannerSession | null {
  const planRaw = storage.getItem("compassPlan");
  const requestRaw = storage.getItem("compassRequest");
  if (!planRaw || !requestRaw) return null;

  try {
    const plan = JSON.parse(planRaw) as CompassPlanResponse;
    const request = JSON.parse(requestRaw) as CompassPlanRequest;
    return {
      plan,
      request,
      lensMode: request.lensMode ?? DEFAULT_LENS_MODE,
    };
  } catch {
    return null;
  }
}
