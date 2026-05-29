// ============================================================
// POST /api/search — основной эндпоинт поиска
// Принимает { topic: "housing" }
// Возвращает SearchResponse с AI-сводкой, постами, рекомендациями
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { SearchRequest, TopicId, RelatedLink } from '@/lib/types';
import { getTopic, getGroupName } from '@/lib/topics';
import { loadFileTopicResponse } from '@/lib/file-data';
import { getArticlesByCategory } from '@/lib/articles';
import { getGuidesByCategory } from '@/lib/guides';

/** Собирает релевантные внутренние ссылки (статьи + гайды) по теме */
function getRelatedLinks(topic: TopicId): RelatedLink[] {
  const links: RelatedLink[] = [];
  for (const g of getGuidesByCategory(topic).slice(0, 2)) {
    links.push({ type: 'guide', slug: g.slug, title: g.title, description: g.description });
  }
  for (const a of getArticlesByCategory(topic).slice(0, 2)) {
    links.push({ type: 'article', slug: a.slug, title: a.title, description: a.description });
  }
  return links.slice(0, 3);
}

/** Валидные ID топиков */
export const VALID_TOPICS: TopicId[] = [
  'housing', 'banks', 'cost_of_living', 'vnj',
  'healthcare', 'auto', 'business', 'education',
  'transport', 'taxes', 'language', 'sim', 'moving',
  'coworking', 'pets', 'notary', 'food', 'remote_work',
];

/**
 * POST /api/search
 * Тело: { topic: "housing" }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Парсим запрос
    const body: SearchRequest = await request.json();
    const { topic } = body;

    if (!topic || !VALID_TOPICS.includes(topic)) {
      return NextResponse.json(
        {
          error: 'Неверный запрос',
          message: `Укажите topic из списка: ${VALID_TOPICS.join(', ')}`,
          validTopics: VALID_TOPICS,
        },
        { status: 400 }
      );
    }

    const topicConfig = getTopic(topic);
    if (!topicConfig) {
      return NextResponse.json(
        { error: 'Топик не найден', message: `Неизвестный топик: ${topic}` },
        { status: 404 }
      );
    }

    console.log(`[API] Запрос топика: "${topic}"`);

    // Релевантные внутренние ссылки (статьи/гайды) по теме
    const relatedLinks = getRelatedLinks(topic);

    // Читаем данные из JSON-файла (может быть null если тема ещё не собрана)
    const fileResponse = loadFileTopicResponse(topic);

    const now = new Date().toISOString();
    const scrapedAt = fileResponse?.scrapedAt ?? now;
    const groupsScraped = fileResponse?.groupsScraped ?? 0;
    // Всегда берём актуальные группы из конфига топика
    const groupSearchUrls = topicConfig.groupUrls as string[];
    const groupNames = groupSearchUrls.map(getGroupName);

    const hasSummary = (fileResponse?.summary?.length ?? 0) > 30;
    const hasSource  = ((fileResponse as any)?.sourcePosts?.length ?? 0) > 0;

    // Если есть сводка или источники — отдаём сразу без AI
    if (hasSummary || hasSource) {
      console.log(`[API] Данные из кэша для "${topic}"`);
      return NextResponse.json({ ...fileResponse, groupSearchUrls, groupNames, relatedLinks });
    }

    // Нет данных — пробуем AI из общих знаний (импорт только здесь)
    console.log(`[API] Нет данных, AI-ответ из знаний для "${topic}"...`);
    try {
      const { generateKnowledgeResponse } = await import('@/lib/summarizer');
      const aiResponse = await generateKnowledgeResponse(topic, scrapedAt, groupsScraped);
      return NextResponse.json({ ...aiResponse, groupSearchUrls, groupNames, relatedLinks });
    } catch (err) {
      console.error('[API] Ошибка AI из знаний:', err);
    }

    if (!fileResponse) {
      return NextResponse.json({
        topic, summary: `Данные по теме «${topicConfig.label}» пока собираются.`,
        recommendations: [], posts: [], scrapedAt: now,
        freshness: 'только что', groupsScraped: 0, totalPostsAnalyzed: 0, status: 'fresh',
        relatedLinks,
      });
    }

    console.log(`[API] Данные из JSON для "${topic}".`);
    return NextResponse.json({ ...fileResponse, relatedLinks });
  } catch (err) {
    console.error('[API] Критическая ошибка:', err);
    return NextResponse.json(
      {
        error: 'Внутренняя ошибка сервера',
        message: err instanceof Error ? err.message : 'Неизвестная ошибка',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search?topic=housing
 * Альтернативный способ запроса через GET-параметры
 */
export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic') as TopicId | null;

  if (!topic || !VALID_TOPICS.includes(topic)) {
    return NextResponse.json(
      {
        error: 'Неверный запрос',
        message: 'Укажите ?topic=housing (или banks, cost_of_living, vnj)',
        validTopics: VALID_TOPICS,
      },
      { status: 400 }
    );
  }

  // Перенаправляем в ту же логику что и POST
  return POST(
    new NextRequest(request.url, {
      method: 'POST',
      body: JSON.stringify({ topic }),
    })
  );
}


