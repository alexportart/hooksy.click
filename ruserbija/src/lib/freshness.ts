// Помечаем материал как "новый", если он опубликован не старше N дней назад.
// Дата в будущем тоже считается новой (только что добавленный/запланированный материал).

export const NEW_WINDOW_DAYS = 4;

export function isNew(publishedAt?: string, windowDays = NEW_WINDOW_DAYS): boolean {
  if (!publishedAt) return false;
  const published = new Date(publishedAt).getTime();
  if (Number.isNaN(published)) return false;
  const threshold = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return published >= threshold;
}
