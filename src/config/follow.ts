/** Ссылки для блока «следите за развитием проекта». Задайте в .env: VITE_TELEGRAM_URL и т.д. */
export const FOLLOW_LINKS = {
  telegram: import.meta.env.VITE_TELEGRAM_URL || "https://t.me/hooksyclick",
  threads: import.meta.env.VITE_THREADS_URL || "https://www.threads.com/@alexsverchkov",
  youtube: import.meta.env.VITE_YOUTUBE_URL || "https://www.youtube.com/@hooksyclick",
} as const;
