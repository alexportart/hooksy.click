// ============================================================
// AI-суммаризатор — анализ постов через OpenRouter API
// Использует бесплатную модель Gemini 2.5 Flash
// Принимает массив постов, возвращает структурированную сводку
// ============================================================

import { FbPost, SearchResponse, TopicId } from './types';
import { getTopic, getGroupName } from './topics';

// ============================================================
// КОНФИГУРАЦИЯ
// ============================================================

/** Максимальное количество токенов для промпта (бесплатная модель) */
const MAX_INPUT_TOKENS = 4000;

/** Максимальное количество токенов для ответа */
const MAX_OUTPUT_TOKENS = 1500;

/** Температура генерации (низкая = меньше галлюцинаций) */
const TEMPERATURE = 0.3;

/** Таймаут запроса к API (мс) */
const API_TIMEOUT = 30000;

// ============================================================
// ОСНОВНАЯ ФУНКЦИЯ
// ============================================================

/**
 * Суммаризирует посты с помощью AI.
 * Принимает сырой результат скрапинга, возвращает готовый SearchResponse.
 */
export async function summarizePosts(
  topicId: TopicId,
  posts: FbPost[],
  scrapedAt: string,
  groupsScraped: number
): Promise<SearchResponse> {
  const topic = getTopic(topicId);
  if (!topic) {
    throw new Error(`Неизвестный топик: ${topicId}`);
  }

  console.log(`[Summarizer] Анализирую ${posts.length} постов для "${topicId}"`);

  // Если постов нет — возвращаем заглушку
  if (posts.length === 0) {
    return enrichWithGroupInfo(createEmptyResponse(topicId, scrapedAt, groupsScraped, 0), topicId);
  }

  // 1. Подготавливаем промпт
  const prompt = buildPrompt(topic, posts);

  // 2. Отправляем в AI
  let aiResponse: string;
  try {
    aiResponse = await callOpenRouter(prompt);
  } catch (err) {
    console.error('[Summarizer] Ошибка AI-запроса:', err);
    // Fallback: возвращаем базовую сводку без AI
    return createFallbackResponse(topic, posts, scrapedAt, groupsScraped);
  }

  // 3. Парсим ответ AI
  try {
    const parsed = parseAIResponse(aiResponse, topic, posts, scrapedAt, groupsScraped);
    return enrichWithGroupInfo(parsed, topicId);
  } catch (err) {
    console.error('[Summarizer] Ошибка парсинга AI-ответа:', err);
    return enrichWithGroupInfo(createFallbackResponse(topic, posts, scrapedAt, groupsScraped), topicId);
  }
}

/** Добавляет groupSearchUrls и groupNames из конфига топика */
function enrichWithGroupInfo(response: SearchResponse, topicId: TopicId): SearchResponse {
  const topic = getTopic(topicId);
  if (!topic) return response;
  return {
    ...response,
    topic: topicId,
    groupSearchUrls: topic.groupUrls as string[],
    groupNames: (topic.groupUrls as string[]).map(getGroupName),
  };
}

// ============================================================
// ПОСТРОЕНИЕ ПРОМПТА
// ============================================================

/**
 * Генерирует ответ на основе общих знаний AI — когда постов нет.
 */
export async function generateKnowledgeResponse(
  topicId: TopicId,
  scrapedAt: string,
  groupsScraped: number
): Promise<SearchResponse> {
  const topic = getTopic(topicId);
  if (!topic) throw new Error(`Неизвестный топик: ${topicId}`);

  const prompt = `Ты — AI-ассистент для русскоязычных эмигрантов в Сербии.
Тема: ${topic.emoji} ${topic.label}

Дай практичный ответ для русскоязычного эмигранта в Сербии по этой теме.
Используй актуальные знания о Сербии (Белград, Нови-Сад и другие города).

Ответь строго в формате JSON (без markdown, только JSON):
{
  "summary": "2-3 абзаца — полезная практическая информация по теме для эмигранта в Сербии",
  "recommendations": ["конкретный совет 1", "конкретный совет 2", "конкретный совет 3", "конкретный совет 4", "конкретный совет 5"]
}

Правила:
- Только русский язык
- Конкретика: названия компаний, сервисов, районов, цен в RSD/EUR
- Практические советы из реального опыта жизни в Сербии`;

  let aiText: string;
  try {
    aiText = await callOpenRouter(prompt);
  } catch {
    return enrichWithGroupInfo({
      topic: topicId,
      summary: `По теме «${topic.label}» пока нет данных из Facebook-групп. Попробуйте позже или задайте вопрос напрямую в группах.`,
      recommendations: ['Вступите в Facebook-группу «Русские в Сербии»', 'Задайте вопрос напрямую в группе'],
      posts: [],
      scrapedAt,
      freshness: formatFreshness(scrapedAt),
      groupsScraped,
      totalPostsAnalyzed: 0,
      status: 'fresh',
    }, topicId);
  }

  try {
    let jsonStr = aiText.trim();
    const m = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (m) jsonStr = m[1];
    const objM = jsonStr.match(/\{[\s\S]*\}/);
    if (objM) jsonStr = objM[0];
    const parsed = JSON.parse(jsonStr);
    return enrichWithGroupInfo({
      topic: topicId,
      summary: parsed.summary || '',
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 5) : [],
      posts: [],
      scrapedAt,
      freshness: formatFreshness(scrapedAt),
      groupsScraped,
      totalPostsAnalyzed: 0,
      status: 'fresh',
    }, topicId);
  } catch {
    return enrichWithGroupInfo({
      topic: topicId,
      summary: aiText.slice(0, 1000),
      recommendations: [],
      posts: [],
      scrapedAt,
      freshness: formatFreshness(scrapedAt),
      groupsScraped,
      totalPostsAnalyzed: 0,
      status: 'fresh',
    }, topicId);
  }
}

function buildPrompt(topic: { label: string; emoji: string }, posts: FbPost[]): string {
  // Собираем тексты постов (обрезаем до лимита токенов)
  const postTexts = posts
    .slice(0, 15) // не больше 15 постов, чтобы влезть в лимит токенов
    .map(
      (p, i) =>
        `[Пост ${i + 1}] ${p.text}\n  Автор: ${p.authorName}\n  Дата: ${p.date}\n  Комментарии: ${p.topComments.map((c) => c.text).join(' | ')}`
    )
    .join('\n\n');

  const totalTextLength = postTexts.length;
  // Если слишком длинно — обрезаем
  const truncatedTexts =
    totalTextLength > MAX_INPUT_TOKENS * 4
      ? postTexts.substring(0, MAX_INPUT_TOKENS * 4) + '\n\n[Текст обрезан из-за ограничений длины]'
      : postTexts;

  return `Ты — AI-ассистент для русскоязычных эмигрантов в Сербии. Твоя задача — проанализировать посты из Facebook-групп русскоязычных эмигрантов и составить полезную сводку.

ТЕМА: ${topic.emoji} ${topic.label}

ПРОАНАЛИЗИРУЙ СЛЕДУЮЩИЕ ПОСТЫ ИЗ FACEBOOK-ГРУПП:

${truncatedTexts}

НА ОСНОВЕ ЭТИХ ПОСТОВ СОСТАВЬ ОТВЕТ В ФОРМАТЕ JSON (только JSON, без дополнительного текста):

{
  "summary": "2-3 абзаца с краткой сводкой: что обсуждают люди, какие основные проблемы/решения, общий контекст",
  "recommendations": ["рекомендация 1", "рекомендация 2", "рекомендация 3", "рекомендация 4", "рекомендация 5"],
  "mostUsefulPostIds": [0, 3, 7]
}

ПРАВИЛА:
- Пиши на русском языке
- Будь конкретным: называй сербские города, банки, процедуры
- Если в постах противоречивая информация — укажи разные точки зрения
- Не выдумывай информацию, которой нет в постах
- mostUsefulPostIds — номера самых полезных постов (0-based индексы из списка выше)
- В recommendations давай практические советы, основанные на опыте людей из постов`;
}

// ============================================================
// ВЫЗОВ OPENROUTER API
// ============================================================

async function callOpenRouter(prompt: string): Promise<string> {
  const errors: string[] = [];

  // 1. Cerebras — очень быстрый
  if (process.env.CEREBRAS_API_KEY) {
    for (const model of ['llama-3.3-70b', 'llama3.3-70b', 'llama-3.1-70b']) {
      try {
        return await callChatAPI(
          'https://api.cerebras.ai/v1/chat/completions',
          process.env.CEREBRAS_API_KEY,
          model,
          prompt
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!msg.includes('404') && !msg.includes('not_found') && !msg.includes('does not exist')) {
          errors.push(`Cerebras(${model}): ${msg}`);
          break;
        }
      }
    }
  }

  // 2. SambaNova
  if (process.env.SAMBANOVA_API_KEY) {
    for (const model of ['Meta-Llama-3.3-70B-Instruct', 'Llama-4-Scout-17B-16E-Instruct', 'Meta-Llama-3.1-8B-Instruct']) {
      try {
        return await callChatAPI(
          'https://api.sambanova.ai/v1/chat/completions',
          process.env.SAMBANOVA_API_KEY,
          model,
          prompt
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!msg.includes('410') && !msg.includes('not available') && !msg.includes('404')) {
          errors.push(`SambaNova(${model}): ${msg}`);
          break;
        }
      }
    }
  }

  // 3. OpenRouter meta-llama с retry при rate-limit
  if (process.env.OPENROUTER_API_KEY) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await callChatAPI(
          'https://openrouter.ai/api/v1/chat/completions',
          process.env.OPENROUTER_API_KEY,
          'meta-llama/llama-3.3-70b-instruct:free',
          prompt,
          { 'HTTP-Referer': 'https://ruserbija.vercel.app', 'X-Title': 'Ruserbija AI Helper' }
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes('429') && attempt < 2) {
          await new Promise(r => setTimeout(r, 4000));
          continue;
        }
        errors.push(`OpenRouter: ${msg}`);
        break;
      }
    }
  }

  throw new Error(`Все AI-провайдеры недоступны:\n${errors.join('\n')}`);
}

async function callChatAPI(
  endpoint: string,
  apiKey: string,
  model: string,
  prompt: string,
  extraHeaders: Record<string, string> = {}
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...extraHeaders,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: TEMPERATURE,
        max_tokens: MAX_OUTPUT_TOKENS,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } finally {
    clearTimeout(timeout);
  }
}

// ============================================================
// ПАРСИНГ AI-ОТВЕТА
// ============================================================

function parseAIResponse(
  aiText: string,
  topic: { label: string; emoji: string },
  posts: FbPost[],
  scrapedAt: string,
  groupsScraped: number
): SearchResponse {
  // Пытаемся извлечь JSON из ответа (AI может обернуть в markdown-код)
  let jsonStr = aiText.trim();

  // Убираем markdown-обёртку ```json ... ```
  const jsonMatch = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  // Ищем JSON-объект в тексте
  const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    jsonStr = objectMatch[0];
  }

  const parsed = JSON.parse(jsonStr);

  // Извлекаем самые полезные посты по индексам
  const usefulIds: number[] = parsed.mostUsefulPostIds || [];
  const usefulPosts = usefulIds
    .map((id: number) => posts[id])
    .filter(Boolean)
    .slice(0, 7); // не больше 7 постов

  // Если AI не выбрал полезные посты — берём первые 5
  const displayPosts = usefulPosts.length > 0 ? usefulPosts : posts.slice(0, 5);

  return {
    topic: topic.label.toLowerCase().includes('жиль')
      ? 'housing'
      : topic.label.toLowerCase().includes('банк')
        ? 'banks'
        : topic.label.toLowerCase().includes('стоит')
          ? 'cost_of_living'
          : 'vnj',
    summary: parsed.summary || 'Не удалось составить сводку. Просмотрите посты напрямую.',
    recommendations: Array.isArray(parsed.recommendations)
      ? parsed.recommendations.slice(0, 5)
      : ['Просмотрите посты напрямую по ссылкам ниже'],
    posts: displayPosts,
    scrapedAt,
    freshness: formatFreshness(scrapedAt),
    groupsScraped,
    totalPostsAnalyzed: posts.length,
    status: 'fresh',
  };
}

// ============================================================
// FALLBACK (если AI не ответил)
// ============================================================

function createFallbackResponse(
  topic: { label: string; emoji: string },
  posts: FbPost[],
  scrapedAt: string,
  groupsScraped: number
): SearchResponse {
  const topicId = topic.label.toLowerCase().includes('жиль')
    ? 'housing'
    : topic.label.toLowerCase().includes('банк')
      ? 'banks'
      : topic.label.toLowerCase().includes('стоит')
        ? 'cost_of_living'
        : 'vnj';

  return {
    topic: topicId as TopicId,
    summary: `Найдено ${posts.length} постов по теме «${topic.label}». AI-анализ временно недоступен, но вы можете просмотреть посты напрямую.`,
    recommendations: [
      'Просмотрите посты по ссылкам ниже',
      'Обратите внимание на самые обсуждаемые посты',
      'Попробуйте обновить страницу позже — AI-анализ может заработать',
    ],
    posts: posts.slice(0, 7),
    scrapedAt,
    freshness: formatFreshness(scrapedAt),
    groupsScraped,
    totalPostsAnalyzed: posts.length,
    status: 'fresh',
  };
}

function createEmptyResponse(
  topicId: TopicId,
  scrapedAt: string,
  groupsScraped: number,
  totalPostsAnalyzed: number
): SearchResponse {
  return {
    topic: topicId,
    summary: 'По вашему запросу пока недостаточно данных. Мы продолжаем собирать информацию из групп.',
    recommendations: ['Попробуйте другой запрос', 'Проверьте позже — данные обновляются каждые 6 часов'],
    posts: [],
    scrapedAt,
    freshness: formatFreshness(scrapedAt),
    groupsScraped,
    totalPostsAnalyzed,
    status: 'fresh',
  };
}

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ
// ============================================================

function formatFreshness(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'только что';
  if (diffMin < 60) return `${diffMin} мин назад`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} ч назад`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} дн назад`;
}