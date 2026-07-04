import type {
  CompassPlanRequest,
  CompassPlanResponse,
  DestinationsRequest,
  DestinationsResponse,
  AttractionsRequest,
  AttractionsResponse,
  HiddenGemsRequest,
  HiddenGemsResponse,
  StoryRequest,
  StoryResponse,
  HeritageRequest,
  HeritageResponse,
  EventsRequest,
  EventsResponse,
  ExperiencesRequest,
  ExperiencesResponse,
  ApiError,
} from "@culturecompass/shared";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as ApiError | null;
    throw new Error(errorBody?.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function createCompassPlan(payload: CompassPlanRequest): Promise<CompassPlanResponse> {
  return apiFetch("/api/compass/plan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchDestinations(
  payload: DestinationsRequest,
): Promise<DestinationsResponse> {
  return apiFetch("/api/discover/destinations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchAttractions(
  payload: AttractionsRequest,
): Promise<AttractionsResponse> {
  return apiFetch("/api/discover/attractions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchHiddenGems(payload: HiddenGemsRequest): Promise<HiddenGemsResponse> {
  return apiFetch("/api/discover/hidden-gems", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchStory(payload: StoryRequest): Promise<StoryResponse> {
  return apiFetch("/api/culture/story", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchHeritage(payload: HeritageRequest): Promise<HeritageResponse> {
  return apiFetch("/api/culture/heritage", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchEvents(payload: EventsRequest): Promise<EventsResponse> {
  return apiFetch("/api/culture/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchExperiences(
  payload: ExperiencesRequest,
): Promise<ExperiencesResponse> {
  return apiFetch("/api/culture/experiences", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function checkHealth(): Promise<{ status: string; timestamp: string }> {
  return apiFetch("/api/health");
}
