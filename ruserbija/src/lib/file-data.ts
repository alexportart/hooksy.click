import fs from 'fs';
import path from 'path';
import { SearchResponse, TopicId } from './types';

/** Путь к папке с кэшем (data/cache/{topic}.json) */
const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

/** Читает один топик из data/cache/{topicId}.json */
export function loadFileTopicResponse(topicId: TopicId): SearchResponse | null {
  const filePath = path.join(CACHE_DIR, `${topicId}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw) as Partial<SearchResponse>;
    if (!data || !Array.isArray(data.posts)) return null;

    return {
      topic:              topicId,
      summary:            data.summary            ?? '',
      recommendations:    data.recommendations    ?? [],
      posts:              data.posts              ?? [],
      sourcePosts:        (data as any).sourcePosts ?? [],
      scrapedAt:          data.scrapedAt          ?? new Date().toISOString(),
      freshness:          data.freshness          ?? 'только что',
      groupsScraped:      data.groupsScraped      ?? 0,
      totalPostsAnalyzed: data.totalPostsAnalyzed ?? data.posts?.length ?? 0,
      status:             'fresh',
      groupSearchUrls:    data.groupSearchUrls    ?? [],
      groupNames:         data.groupNames         ?? [],
      isDemo:             false,
    };
  } catch {
    return null;
  }
}

export function getFileDataUpdatedAt(): string | null {
  // Берём дату последнего обновления из любого кэш-файла
  const filePath = path.join(CACHE_DIR, 'housing.json');
  if (!fs.existsSync(filePath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.scrapedAt || null;
  } catch {
    return null;
  }
}
