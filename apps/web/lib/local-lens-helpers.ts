import type { CompassPlanResponse, LensMode } from "@culturecompass/shared";
import { LENS_MODE_DESCRIPTIONS } from "@culturecompass/shared";

export interface LensSpot {
  name: string;
  description: string;
  category: string;
  tip?: string;
}

export function getLensDescription(mode: LensMode): string {
  return LENS_MODE_DESCRIPTIONS[mode];
}

export function getTouristSpots(plan: CompassPlanResponse): LensSpot[] {
  return plan.attractions.map((a) => ({
    name: a.name,
    description: a.description,
    category: a.category,
    tip: a.tip,
  }));
}

export function getLocalSpots(plan: CompassPlanResponse): LensSpot[] {
  const dashboard = plan.dashboard;
  const gems: LensSpot[] = plan.hiddenGems.map((g) => ({
    name: g.name,
    description: g.description,
    category: "Hidden gem",
    tip: g.localTip,
  }));

  const experiences: LensSpot[] = plan.experiences.map((e) => ({
    name: e.name,
    description: e.description,
    category: e.type,
    tip: e.authenticityNote,
  }));

  const foodSpots: LensSpot[] = (dashboard?.foodHighlights ?? []).map((name) => ({
    name,
    description: "A local favorite — ask what's fresh today.",
    category: "Street food",
  }));

  const marketSpots: LensSpot[] = (dashboard?.shoppingGuide ?? [])
    .filter((s) => /market|artisan|craft/i.test(s))
    .map((name) => ({
      name,
      description: "Where residents shop for quality and character.",
      category: "Markets",
    }));

  return [...gems, ...experiences, ...foodSpots, ...marketSpots];
}

export function getLensSpots(plan: CompassPlanResponse, mode: LensMode): LensSpot[] {
  return mode === "tourist" ? getTouristSpots(plan) : getLocalSpots(plan);
}
