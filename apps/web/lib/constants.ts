export const SUGGESTED_DESTINATIONS = [
  "Kyoto, Japan",
  "Marrakech, Morocco",
  "Oaxaca, Mexico",
  "Lisbon, Portugal",
  "Jaipur, India",
  "Florence, Italy",
  "Hanoi, Vietnam",
  "Cusco, Peru",
  "Istanbul, Turkey",
  "Chiang Mai, Thailand",
  "Seville, Spain",
  "Hoi An, Vietnam",
  "Fez, Morocco",
  "Ubud, Indonesia",
  "Cartagena, Colombia",
] as const;

export const INTEREST_ICONS: Record<string, string> = {
  history: "🏛️",
  art: "🎨",
  music: "🎵",
  food: "🍜",
  nature: "🌿",
  architecture: "🏰",
  festivals: "🎭",
  "local-life": "🏘️",
  spirituality: "🕯️",
  nightlife: "🌙",
};

export type PortalTab = "heritage" | "gems" | "events" | "experiences";

export const PORTAL_TABS: { id: PortalTab; label: string; icon: string }[] = [
  { id: "heritage", label: "Heritage & Attractions", icon: "🏛️" },
  { id: "gems", label: "Hidden Gems", icon: "💎" },
  { id: "events", label: "Local Events", icon: "📅" },
  { id: "experiences", label: "Authentic Experiences", icon: "🤝" },
];
