/** Maximum lengths for user-supplied text — keeps prompts bounded and efficient. */
export const INPUT_LIMITS = {
  destination: 100,
  budget: 50,
  duration: 50,
  travelStyle: 30,
  notes: 500,
  placeName: 100,
  interestsMax: 10,
  interestTagMax: 30,
} as const;
