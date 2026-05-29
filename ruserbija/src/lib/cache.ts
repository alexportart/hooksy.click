// ============================================================
// Слой кэширования — чтение/запись JSON-файлов
// Для MVP используем файловую систему (data/cache/*.json)
// ============================================================

import fs from 'fs';
import path from 'path';
import { SearchResponse, TopicId } from './types';
import { CACHE_TTL_MS } from './topics';

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

/** Получить путь к файлу кэша для конкретного топика */
function getCachePath(topicId: TopicId): string {
  return path.join(CACHE_DIR, `${topicId}.json`);
}

/** Прочитать кэш для топика. Возвращает null если кэша нет или он устарел. */
export function getCachedResponse(topicId: TopicId): { data: SearchResponse; isFresh: boolean } | null {
  const filePath = getCachePath(topicId);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`[Cache] Нет файла кэша для "${topicId}"`);
      return null;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: SearchResponse = JSON.parse(raw);

    const age = Date.now() - new Date(data.scrapedAt).getTime();
    const isFresh = age < CACHE_TTL_MS;

    console.log(
      `[Cache] "${topicId}": возраст ${Math.round(age / 1000 / 60)} мин, свежий: ${isFresh}`
    );

    return { data, isFresh };
  } catch (err) {
    console.error(`[Cache] Ошибка чтения кэша для "${topicId}":`, err);
    return null;
  }
}

/** Сохранить результат поиска в кэш */
export function saveCachedResponse(response: SearchResponse): void {
  const filePath = getCachePath(response.topic);

  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(response, null, 2), 'utf-8');
    console.log(`[Cache] Сохранён кэш для "${response.topic}"`);
  } catch (err) {
    console.error(`[Cache] Ошибка сохранения кэша для "${response.topic}":`, err);
  }
}

/** Проверить свежесть кэша БЕЗ чтения данных (лёгкая проверка) */
export function isCacheFresh(topicId: TopicId): boolean {
  const filePath = getCachePath(topicId);

  try {
    if (!fs.existsSync(filePath)) return false;

    const stat = fs.statSync(filePath);
    const age = Date.now() - stat.mtimeMs;
    return age < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

/** Получить время последнего обновления кэша */
export function getCacheAge(topicId: TopicId): number | null {
  const filePath = getCachePath(topicId);

  try {
    if (!fs.existsSync(filePath)) return null;

    const stat = fs.statSync(filePath);
    return Date.now() - stat.mtimeMs;
  } catch {
    return null;
  }
}

/** Вернуть статусы кэшей для всех топиков (для админки) */
export function getAllCacheStatus(): Record<string, { cached: boolean; ageMinutes: number | null; fresh: boolean }> {
  const { TOPIC_LIST } = require('./topics');
  const status: Record<string, { cached: boolean; ageMinutes: number | null; fresh: boolean }> = {};

  for (const topic of TOPIC_LIST) {
    const age = getCacheAge(topic.id);
    status[topic.id] = {
      cached: age !== null,
      ageMinutes: age !== null ? Math.round(age / 1000 / 60) : null,
      fresh: age !== null ? age < CACHE_TTL_MS : false,
    };
  }

  return status;
}