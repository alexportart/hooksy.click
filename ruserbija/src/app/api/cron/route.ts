// ============================================================
// GET /api/cron — обновление кэшей через RapidAPI
// Стратегия: каждая группа запрашивается ОДИН РАЗ,
// посты распределяются по топикам по ключевым словам.
// Итого: 8 запросов к API на весь прогон.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { TopicId, FbPost } from '@/lib/types';
import { getTopic, FB_GROUPS, TOPIC_LIST } from '@/lib/topics';
import { summarizePosts } from '@/lib/summarizer';
import { saveCachedResponse } from '@/lib/cache';

const RAPIDAPI_KEY  = process.env.RAPIDAPI_KEY  || '';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'facebook-scraper3.p.rapidapi.com';

const VALID_TOPICS: TopicId[] = [
  'housing', 'banks', 'cost_of_living', 'vnj',
  'healthcare', 'auto', 'business', 'education', 'transport',
  'taxes', 'language', 'sim', 'moving', 'coworking',
  'pets', 'notary', 'food', 'remote_work',
];

function groupIdFromUrl(url: string): string {
  const m = url.match(/\/groups\/([^/?#]+)/);
  return m ? m[1] : url;
}

async function fetchGroupPosts(groupUrl: string): Promise<FbPost[]> {
  const groupId = groupIdFromUrl(groupUrl);
  const url = new URL(`https://${RAPIDAPI_HOST}/group/posts`);
  url.searchParams.set('group_id', groupId);
  url.searchParams.set('limit', '50');

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY, 'X-RapidAPI-Host': RAPIDAPI_HOST },
  });

  if (!res.ok) throw new Error(`RapidAPI ${res.status} group_id=${groupId}`);

  const data = await res.json();
  const raw: any[] = data.posts || [];

  return raw.map((p: any, i: number): FbPost => ({
    id:            String(p.post_id || `${groupId}_${i}`),
    text:          String(p.message || p.message_rich || ''),
    url:           String(p.url || `https://www.facebook.com/groups/${groupId}/`),
    date:          p.timestamp
                     ? new Date(p.timestamp * 1000).toISOString().split('T')[0]
                     : new Date().toISOString().split('T')[0],
    authorName:    String(p.author?.name || 'Пользователь'),
    groupName:     String(p.associated_group_id || groupId),
    likes:         Number(p.reactions?.like || p.reactions_count || 0),
    commentsCount: Number(p.comments_count || 0),
    topComments:   [],
  }));
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ruserbija-cron-2026';
  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const scrapedAt = new Date().toISOString();
  console.log('[Cron] Старт. Загружаем посты из каждой группы по одному разу...');

  // 1. Загружаем все группы по одному разу
  const allGroupUrls = Object.values(FB_GROUPS);
  const groupPostsMap: Record<string, FbPost[]> = {};

  for (let i = 0; i < allGroupUrls.length; i++) {
    const groupUrl = allGroupUrls[i];
    if (i > 0) await new Promise(r => setTimeout(r, 2500));
    try {
      console.log(`[Cron] Группа [${i+1}/${allGroupUrls.length}]: ${groupUrl}`);
      const posts = await fetchGroupPosts(groupUrl);
      groupPostsMap[groupUrl] = posts;
      console.log(`[Cron]   → ${posts.length} постов`);
    } catch (err) {
      console.error(`[Cron] Ошибка группы ${groupUrl}:`, err);
      groupPostsMap[groupUrl] = [];
    }
  }

  const totalFetched = Object.values(groupPostsMap).reduce((s, p) => s + p.length, 0);
  console.log(`[Cron] Загружено всего: ${totalFetched} постов из ${allGroupUrls.length} групп`);

  // 2. Для каждого топика — фильтруем из кэша групп
  const results: Record<string, { success: boolean; posts: number; duration: string; error?: string }> = {};

  for (const topicId of VALID_TOPICS) {
    const start = Date.now();
    try {
      const topicConfig = getTopic(topicId);
      if (!topicConfig) {
        results[topicId] = { success: false, posts: 0, duration: '0s', error: 'Топик не найден' };
        continue;
      }

      // Собираем посты из групп этого топика
      const topicPosts: FbPost[] = [];
      for (const groupUrl of topicConfig.groupUrls) {
        const posts = groupPostsMap[groupUrl] || [];
        const relevant = posts.filter(p =>
          p.text.length > 10 &&
          topicConfig.keywords.some(kw => p.text.toLowerCase().includes(kw.toLowerCase()))
        );
        topicPosts.push(...relevant);
      }

      // Дедупликация по id
      const unique = topicPosts.filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i);
      const topPostsSlice = unique.slice(0, 30);

      console.log(`[Cron] Топик "${topicId}": ${topPostsSlice.length} релевантных постов`);

      // AI-анализ
      const response = await summarizePosts(
        topicId,
        topPostsSlice,
        scrapedAt,
        topicConfig.groupUrls.length
      );

      saveCachedResponse(response);

      const duration = ((Date.now() - start) / 1000).toFixed(1);
      results[topicId] = { success: true, posts: topPostsSlice.length, duration: `${duration}s` };
    } catch (err) {
      const duration = ((Date.now() - start) / 1000).toFixed(1);
      results[topicId] = {
        success: false, posts: 0, duration: `${duration}s`,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
      console.error(`[Cron] Топик "${topicId}" ошибка:`, err);
    }
  }

  return NextResponse.json({ status: 'completed', results, timestamp: scrapedAt });
}
