export type PlatformId =
  | "twitter"
  | "threads"
  | "telegram"
  | "linkedin"
  | "facebook"
  | "vk"
  | "reddit"
  | "mastodon";

export type Platform = {
  id: PlatformId;
  maxChars: number;
};

export const PLATFORMS: Platform[] = [
  { id: "twitter", maxChars: 280 },
  { id: "threads", maxChars: 490 },
  { id: "telegram", maxChars: 4096 },
  { id: "linkedin", maxChars: 3000 },
  { id: "facebook", maxChars: 63206 },
  { id: "vk", maxChars: 1990 },
  { id: "reddit", maxChars: 9990 },
  { id: "mastodon", maxChars: 500 },
];

export const PLATFORM_COUNT = PLATFORMS.length;
