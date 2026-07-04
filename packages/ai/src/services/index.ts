import {
  compassPlanResponseSchema,
  destinationsResponseSchema,
  attractionsResponseSchema,
  hiddenGemsResponseSchema,
  storyResponseSchema,
  heritageResponseSchema,
  eventsResponseSchema,
  experiencesResponseSchema,
  type CompassPlanRequest,
  type CompassPlanResponse,
  type DestinationsRequest,
  type DestinationsResponse,
  type AttractionsRequest,
  type AttractionsResponse,
  type HiddenGemsRequest,
  type HiddenGemsResponse,
  type StoryRequest,
  type StoryResponse,
  type HeritageRequest,
  type HeritageResponse,
  type EventsRequest,
  type EventsResponse,
  type ExperiencesRequest,
  type ExperiencesResponse,
} from "@culturecompass/shared";
import { generateJson } from "../client";
import { buildCompassPlanPrompt } from "../prompts/compassPlan";
import { buildDestinationsPrompt } from "../prompts/destinations";
import { buildAttractionsPrompt } from "../prompts/attractions";
import { buildHiddenGemsPrompt } from "../prompts/hiddenGems";
import { buildStoryPrompt } from "../prompts/storytelling";
import { buildHeritagePrompt } from "../prompts/heritage";
import { buildEventsPrompt } from "../prompts/events";
import { buildExperiencesPrompt } from "../prompts/experiences";

export async function generateCompassPlan(
  input: CompassPlanRequest,
): Promise<CompassPlanResponse> {
  const prompt = buildCompassPlanPrompt(input);
  return generateJson(prompt, (raw) => compassPlanResponseSchema.parse(raw));
}

export async function generateDestinations(
  input: DestinationsRequest,
): Promise<DestinationsResponse> {
  const prompt = buildDestinationsPrompt(input);
  return generateJson(prompt, (raw) => destinationsResponseSchema.parse(raw));
}

export async function generateAttractions(
  input: AttractionsRequest,
): Promise<AttractionsResponse> {
  const prompt = buildAttractionsPrompt(input);
  return generateJson(prompt, (raw) => attractionsResponseSchema.parse(raw));
}

export async function generateHiddenGems(
  input: HiddenGemsRequest,
): Promise<HiddenGemsResponse> {
  const prompt = buildHiddenGemsPrompt(input);
  return generateJson(prompt, (raw) => hiddenGemsResponseSchema.parse(raw));
}

export async function generateStory(input: StoryRequest): Promise<StoryResponse> {
  const prompt = buildStoryPrompt(input);
  return generateJson(prompt, (raw) => storyResponseSchema.parse(raw));
}

export async function generateHeritage(
  input: HeritageRequest,
): Promise<HeritageResponse> {
  const prompt = buildHeritagePrompt(input);
  return generateJson(prompt, (raw) => heritageResponseSchema.parse(raw));
}

export async function generateEvents(input: EventsRequest): Promise<EventsResponse> {
  const prompt = buildEventsPrompt(input);
  return generateJson(prompt, (raw) => eventsResponseSchema.parse(raw));
}

export async function generateExperiences(
  input: ExperiencesRequest,
): Promise<ExperiencesResponse> {
  const prompt = buildExperiencesPrompt(input);
  return generateJson(prompt, (raw) => experiencesResponseSchema.parse(raw));
}
