import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

const TOPIC_LABELS: Record<string, string> = {
  housing:       '🏠 Жильё',
  banks:         '🏦 Банки',
  cost_of_living:'💰 Стоимость жизни',
  vnj:           '📋 ВНЖ',
  healthcare:    '🏥 Медицина',
  auto:          '🚗 Авто',
  business:      '🏢 Бизнес',
  education:     '📚 Образование',
  transport:     '🚌 Транспорт',
  taxes:         '📊 Налоги',
  language:      '🗣️ Сербский язык',
  sim:           '📱 Мобильная связь',
  moving:        '📦 Перевоз вещей',
  coworking:     '💻 Коворкинг',
  pets:          '🐾 Питомцы',
  notary:        '📝 Нотариус',
  food:          '🍽️ Еда и рестораны',
  remote_work:   '🌐 Удалённая работа',
};

export async function GET() {
  if (!fs.existsSync(CACHE_DIR)) {
    return NextResponse.json({ updatedAt: null, totalPosts: 0, topics: [] });
  }

  let latestUpdatedAt: string | null = null;
  const topics = [];

  for (const topicId of Object.keys(TOPIC_LABELS)) {
    const filePath = path.join(CACHE_DIR, `${topicId}.json`);
    if (!fs.existsSync(filePath)) continue;

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const postsCount = data.sourcePosts?.length ?? data.posts?.length ?? 0;
      const scrapedAt: string = data.scrapedAt ?? null;

      if (scrapedAt && (!latestUpdatedAt || scrapedAt > latestUpdatedAt)) {
        latestUpdatedAt = scrapedAt;
      }

      topics.push({ id: topicId, label: TOPIC_LABELS[topicId], postsCount });
    } catch {
      topics.push({ id: topicId, label: TOPIC_LABELS[topicId], postsCount: 0 });
    }
  }

  const totalPosts = topics.reduce((s, t) => s + t.postsCount, 0);

  return NextResponse.json({ updatedAt: latestUpdatedAt, totalPosts, topics });
}
