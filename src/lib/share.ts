import type { PlatformId } from "../config/platforms";

/** Сети, доступные в меню «Поделиться постом» (как в прежней версии). */
export type ShareTarget = Exclude<PlatformId, "instagram" | "tiktok">;

export const SHARE_TARGETS: ShareTarget[] = [
  "twitter",
  "threads",
  "telegram",
  "linkedin",
  "facebook",
  "vk",
  "reddit",
  "mastodon",
];

export function buildShareAction(target: ShareTarget, text: string): { url: string | null; copyFirst: boolean } {
  const encoded = encodeURIComponent(text);
  const pageUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://hooksy.click");

  switch (target) {
    case "twitter":
      return { url: `https://twitter.com/intent/tweet?text=${encoded}`, copyFirst: false };
    case "threads":
      return { url: `https://www.threads.net/intent/post?text=${encoded}`, copyFirst: false };
    case "telegram":
      return { url: `https://t.me/share/url?url=${pageUrl}&text=${encoded}`, copyFirst: true };
    case "linkedin":
      return {
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
        copyFirst: true,
      };
    case "facebook":
      return { url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, copyFirst: true };
    case "vk":
      return { url: `https://vk.com/share.php?comment=${encoded}`, copyFirst: false };
    case "reddit":
      return { url: `https://www.reddit.com/submit?title=${encoded}`, copyFirst: false };
    case "mastodon":
      return { url: null, copyFirst: true };
    default:
      return { url: null, copyFirst: true };
  }
}

export async function shareToNetwork(target: ShareTarget, text: string) {
  const { url, copyFirst } = buildShareAction(target, text);

  if (copyFirst || !url) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  }

  if (url) {
    const features =
      target === "telegram" || target === "facebook" ? "width=600,height=700" : undefined;
    window.open(url, "_blank", features);
  }
}
