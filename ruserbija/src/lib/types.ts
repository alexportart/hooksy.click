// ============================================================
// Типы данных для AI-помощника эмигранта в Сербии
// ============================================================

/** 18 топиков, которые может запросить пользователь */
export type TopicId =
  | 'housing' | 'banks' | 'cost_of_living' | 'vnj'
  | 'healthcare' | 'auto' | 'business' | 'education'
  | 'transport' | 'taxes' | 'language' | 'sim' | 'moving'
  | 'coworking' | 'pets' | 'notary' | 'food' | 'remote_work';

/** Конфигурация одного топика: URL групп и ключевые слова для поиска */
export interface TopicConfig {
  id: TopicId;
  label: string;          // «Где снять жильё»
  emoji: string;          // 🏠
  groupUrls: string[];    // URL Facebook-групп
  keywords: string[];     // ключевые слова для фильтрации постов
  searchQuery: string;    // поисковый запрос для Facebook
}

/** Один пост из Facebook-группы */
export interface FbPost {
  id: string;             // уникальный идентификатор (из URL)
  text: string;           // текст поста (обрезанный до 500 символов)
  fullText?: string;      // полный текст (опционально)
  url: string;            // прямая ссылка на пост
  date: string;           // ISO-дата
  authorName: string;     // имя автора
  groupName: string;      // название группы
  likes: number;
  commentsCount: number;
  topComments: FbComment[];
}

/** Комментарий */
export interface FbComment {
  text: string;
  authorName: string;
  likes: number;
}

/** Результат скрапинга для одного топика (сырой) */
export interface ScrapeResult {
  topicId: TopicId;
  posts: FbPost[];
  scrapedAt: string;      // ISO
  groupsScraped: number;
  totalPostsFound: number;
}

/** Пост-источник для сводки */
export interface SourcePost {
  text: string;       // первые 120 символов
  url: string;        // ссылка на оригинал в Facebook
  groupName: string;
  date: string;
}

/** Финальный ответ API пользователю */
export interface SearchResponse {
  topic: TopicId;
  summary: string;            // AI-сводка своими словами
  recommendations: string[];  // 3–5 рекомендаций
  posts: FbPost[];            // полезные посты (устаревшее, оставлено для совместимости)
  sourcePosts?: SourcePost[]; // посты-источники сводки
  scrapedAt: string;
  freshness: string;          // «2 часа назад»
  groupsScraped: number;
  totalPostsAnalyzed: number;
  status: 'fresh' | 'cached' | 'refreshing';
  groupSearchUrls?: string[]; // реальные ссылки на поиск по группам
  groupNames?: string[];      // названия групп для отображения
  isDemo?: boolean;
  relatedLinks?: RelatedLink[];
}

/** Внутренняя ссылка на статью или гайд по теме */
export interface RelatedLink {
  type: 'article' | 'guide';
  slug: string;
  title: string;
  description?: string;
}

/** Запрос от фронтенда */
export interface SearchRequest {
  topic: TopicId;
}

/** Статья для SEO-контента */
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: TopicId;
  content: string;   // Markdown
  publishedAt: string;
  readTime: number;
  tags: string[];
}

/** Пошаговый гайд */
export interface GuideStep {
  title: string;
  content?: string;
  description?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  steps: GuideStep[];
  category: TopicId;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: string;
  tags: string[];
}