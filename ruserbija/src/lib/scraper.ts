// ============================================================
// RapidAPI Scraper — получение постов из Facebook-групп
// API: facebook-scraper3.p.rapidapi.com
// Параметр: group_id (числовой ID или slug)
// ============================================================

import { FbPost, ScrapeResult, TopicConfig } from './types';

const RAPIDAPI_KEY  = process.env.RAPIDAPI_KEY  || '';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'facebook-scraper3.p.rapidapi.com';

const MAX_POSTS_PER_GROUP = 30;

/** Извлекает group_id из URL группы: числовой ID или slug */
function groupIdFromUrl(groupUrl: string): string {
  const m = groupUrl.match(/\/groups\/([^/?#]+)/);
  return m ? m[1] : groupUrl;
}

async function fetchGroupPosts(groupUrl: string): Promise<FbPost[]> {
  const groupId = groupIdFromUrl(groupUrl);
  const url = new URL(`https://${RAPIDAPI_HOST}/group/posts`);
  url.searchParams.set('group_id', groupId);
  url.searchParams.set('limit', String(MAX_POSTS_PER_GROUP));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  RAPIDAPI_KEY,
      'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`RapidAPI ${res.status} for group_id=${groupId}: ${body.slice(0, 200)}`);
  }

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

export async function scrapeTopic(topic: TopicConfig): Promise<ScrapeResult> {
  console.log(`[Scraper] Топик "${topic.id}" — ${topic.groupUrls.length} групп`);

  const allPosts: FbPost[] = [];
  const scrapedGroups: string[] = [];

  for (let i = 0; i < topic.groupUrls.length; i++) {
    const groupUrl = topic.groupUrls[i];
    if (i > 0) await new Promise(r => setTimeout(r, 2000));
    try {
      console.log(`[Scraper] Запрос группы [${i+1}/${topic.groupUrls.length}]: ${groupUrl}`);
      const posts = await fetchGroupPosts(groupUrl);

      const relevant = posts.filter(p =>
        p.text.length > 10 &&
        topic.keywords.some(kw => p.text.toLowerCase().includes(kw.toLowerCase()))
      );

      console.log(`[Scraper] ${groupUrl}: ${posts.length} постов, ${relevant.length} релевантных`);
      allPosts.push(...relevant);
      scrapedGroups.push(groupUrl);
    } catch (err) {
      console.error(`[Scraper] Ошибка для ${groupUrl}:`, err);
    }
  }

  // Дедупликация по id
  const unique = allPosts.filter(
    (p, i, arr) => arr.findIndex(x => x.id === p.id) === i
  );

  return {
    topicId:         topic.id,
    posts:           unique.slice(0, MAX_POSTS_PER_GROUP),
    scrapedAt:       new Date().toISOString(),
    groupsScraped:   scrapedGroups.length,
    totalPostsFound: unique.length,
  };
}
