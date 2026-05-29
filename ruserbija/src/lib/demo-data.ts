// ============================================================
// ДЕМО-ДАННЫЕ — реалистичные посты с ссылками на поиск в группах
// Посты — синтезированы на основе типичных обсуждений в группах
// Ссылки — ведут на поиск по ключевым словам внутри группы
// ============================================================

import { SearchResponse, TopicId, FbPost } from './types';
import { MAIN_GROUP_ID, TOPIC_LIST, getGroupName } from './topics';

const CANONICAL_GROUP_ID = MAIN_GROUP_ID;

// ============================================================
// РЕАЛЬНЫЕ ССЫЛКИ НА ПОИСК ВНУТРИ FACEBOOK-ГРУПП
// ============================================================

function fbSearchUrl(group: string, query: string): string {
  return `https://www.facebook.com/groups/${group}/search/?q=${encodeURIComponent(query)}`;
}

function fbGroupUrl(group: string): string {
  return `https://www.facebook.com/groups/${group}/`;
}

// ============================================================
// ДЕМО-ПОСТЫ с реальными ссылками на поиск в группах
// ============================================================

const demoPosts: FbPost[] = [
  // === HOUSING ===
  {
    id: 'demo_h_1',
    text: 'Подскажите, кто снимал квартиру в Нови-Саде? Какие районы посоветуете? Мы смотрим варианты в центре — от 400€ за однушку. Читал что Детелинара дешевле. Может кто-то делился опытом поиска?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'аренда квартира Нови-Сад'),
    date: '2026-05-20',
    authorName: 'Алексей',
    groupName: 'Русские в Сербии · Поиск: аренда',
    likes: 15,
    commentsCount: 8,
    topComments: [
      { text: 'Детелинара 300-350€ за однушку. Центр Нови-Сада 400-500€.', authorName: 'Мария', likes: 12 },
      { text: 'Ищите на 4zida.rs, но проверяйте договор.', authorName: 'Иван', likes: 8 },
    ],
  },
  {
    id: 'demo_h_2',
    text: 'Ищу квартиру в Белграде, Врачар или Нови Београд. Бюджет до 500€. Слышал что через Facebook быстрее находить. Какие сайты ещё посоветуете?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'аренда квартира Белград'),
    date: '2026-05-19',
    authorName: 'Ольга',
    groupName: 'Русские и Сербия · Поиск: аренда',
    likes: 23,
    commentsCount: 14,
    topComments: [
      { text: 'Нови Београд 2-комнатная 550€. Врачар от 600-700€.', authorName: 'Дмитрий', likes: 19 },
      { text: 'halooglasi.com — частные объявления без комиссии.', authorName: 'Анна', likes: 11 },
    ],
  },
  {
    id: 'demo_h_3',
    text: 'Какие документы нужны для аренды квартиры? Только загранпаспорт и регистрация. Хватит? Нужен ли нотариальный договор?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'rent apartment documents'),
    date: '2026-05-18',
    authorName: 'Павел',
    groupName: 'Russian Expats · Поиск: rent',
    likes: 31,
    commentsCount: 22,
    topComments: [
      { text: 'Достаточно загранпаспорта. Договор простой письменной формы.', authorName: 'Елена', likes: 27 },
      { text: 'Проверьте что хозяин — собственник (list nepokretnosti).', authorName: 'Николай', likes: 15 },
    ],
  },
  // === BANKS ===
  {
    id: 'demo_b_1',
    text: 'Какой банк выбрать для открытия счета? Нужна карта для расходов и зарплаты. Raiffeisen, UniCredit, Intesa — кто лучше для нерезидента?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'банк карта открыть счет'),
    date: '2026-05-21',
    authorName: 'Денис',
    groupName: 'Русские в Сербии · Поиск: банк',
    likes: 27,
    commentsCount: 16,
    topComments: [
      { text: 'Raiffeisen — лучший для нерезидентов, приложение на английском.', authorName: 'Артём', likes: 21 },
      { text: 'UniCredit открыл за 2 дня в отделении на Славии.', authorName: 'Максим', likes: 13 },
    ],
  },
  {
    id: 'demo_b_2',
    text: '⚠️ В Raiffeisen требуют ВНЖ для открытия счёта! Жене отказали. Кто-то сталкивался? Как обойти?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'bank account no residence permit'),
    date: '2026-05-18',
    authorName: 'Андрей',
    groupName: 'Russian Expats · Поиск: bank',
    likes: 45,
    commentsCount: 31,
    topComments: [
      { text: 'Зависит от отделения. На Новом Белграде открыли без ВНЖ.', authorName: 'Мария', likes: 34 },
      { text: 'В мобильном приложении Raiffeisen не требуют ВНЖ.', authorName: 'Константин', likes: 28 },
    ],
  },
  // === COST OF LIVING ===
  {
    id: 'demo_c_1',
    text: 'Бюджет первого месяца в Белграде: аренда 450€, продукты 250€, транспорт 30€, кафе 150€, связь 30€. Итого ~910€. Нормально для одного?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'расходы бюджет жизнь'),
    date: '2026-05-22',
    authorName: 'Алексей',
    groupName: 'Русские в Сербии · Поиск: расходы',
    likes: 41,
    commentsCount: 28,
    topComments: [
      { text: 'Нормально. Мы вдвоём тратим ~1500€.', authorName: 'Екатерина', likes: 33 },
      { text: 'Продукты можно сократить до 150-200€ на рынках.', authorName: 'Павел', likes: 25 },
    ],
  },
  {
    id: 'demo_c_2',
    text: 'Семья 4 чел: аренда 650€, продукты 500€, коммуналка 100€, садик 300€. Итого ~2000€. Нормально для Сербии?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'семья расходы Сербия'),
    date: '2026-05-20',
    authorName: 'Наталья',
    groupName: 'Русские и Сербия · Поиск: расходы',
    likes: 19,
    commentsCount: 12,
    topComments: [
      { text: 'Коммуналка зимой до 200€ (отопление), летом 50-70€.', authorName: 'Ольга', likes: 14 },
      { text: 'Гос садик 30-50€, частный от 200€.', authorName: 'Марина', likes: 10 },
    ],
  },
  // === VNJ ===
  {
    id: 'demo_v_1',
    text: 'Получил ВНЖ на 3 года! Подал через юриста — документы 2 недели, рассмотрение 3 месяца. Основание — регистрация фирмы. Юрист 800€ + пошлина 350€.',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'ВНЖ вид на жительство'),
    date: '2026-05-21',
    authorName: 'Константин',
    groupName: 'Русские в Сербии · Поиск: ВНЖ',
    likes: 67,
    commentsCount: 43,
    topComments: [
      { text: 'Советую юриста — самому муторно. 3-4 месяца.', authorName: 'Алексей', likes: 51 },
      { text: 'Можно через покупку недвижимости? Кто делал?', authorName: 'Дмитрий', likes: 38 },
    ],
  },
  {
    id: 'demo_v_2',
    text: '⚠️ В полиции требуют оригинал диплома с нотариальным переводом для ВНЖ. Апостилируйте заранее!',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'residence permit diploma apostille'),
    date: '2026-05-18',
    authorName: 'Анна',
    groupName: 'Russian Expats · Поиск: residence permit',
    likes: 54,
    commentsCount: 35,
    topComments: [
      { text: 'Для регистрации фирмы диплом не нужен. Для трудоустройства — да.', authorName: 'Владимир', likes: 40 },
      { text: 'Перевод у судебного переводчика 2-5€ за страницу.', authorName: 'Мария', likes: 33 },
    ],
  },
  // === HEALTHCARE ===
  {
    id: 'demo_hl_1',
    text: 'Подскажите по медицине: заболел зуб, куда идти? Сколько стоит стоматолог в Белграде? Нужна страховка?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'стоматолог медицина страховка'),
    date: '2026-05-22',
    authorName: 'Ирина',
    groupName: 'Русские в Сербии · Поиск: медицина',
    likes: 14,
    commentsCount: 9,
    topComments: [
      { text: 'Dentum на Врачаре — приём 30€, чистка 40€.', authorName: 'Анна', likes: 11 },
      { text: 'Скорая 194 бесплатно. Страховка ДОЗОР 180€/год.', authorName: 'Максим', likes: 8 },
    ],
  },
  {
    id: 'demo_hl_2',
    text: 'Кто рожал в Сербии? Народни фронт или Академия? Сколько контракт с врачом? Документы?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'роддом роды Сербия'),
    date: '2026-05-20',
    authorName: 'Елена',
    groupName: 'Русские и Сербия · Поиск: роды',
    likes: 38,
    commentsCount: 24,
    topComments: [
      { text: 'Народни фронт — контракт 1000-1500€. Лучший роддом.', authorName: 'Мария', likes: 30 },
      { text: 'Академия — новый, хорошие условия. Контракт 1200€.', authorName: 'Ольга', likes: 22 },
    ],
  },
  // === AUTO ===
  {
    id: 'demo_a_1',
    text: 'Кто покупал машину в Сербии? Нужен ли ВНЖ для регистрации? Какие налоги? Бюджет до 10000€.',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'авто покупка регистрация'),
    date: '2026-05-21',
    authorName: 'Павел',
    groupName: 'Русские в Сербии · Поиск: авто',
    likes: 32,
    commentsCount: 21,
    topComments: [
      { text: 'Для регистрации нужен ВНЖ. Налог 0.5% для авто до 10000€.', authorName: 'Сергей', likes: 25 },
      { text: 'PolovniAutomobili.com — главный сайт.', authorName: 'Владимир', likes: 18 },
    ],
  },
  {
    id: 'demo_a_2',
    text: 'Меняю российские права на сербские. Нужен ли экзамен? Какие документы? Сколько стоит?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'права замена сербские'),
    date: '2026-05-19',
    authorName: 'Антон',
    groupName: 'Русские и Сербия · Поиск: права',
    likes: 45,
    commentsCount: 31,
    topComments: [
      { text: 'Меняют без экзамена с ВНЖ. Нотариальный перевод + ~50€.', authorName: 'Николай', likes: 36 },
      { text: 'Менял в Белграде: нотариус 5€, МВД 20€, пластик 3€.', authorName: 'Михаил', likes: 28 },
    ],
  },
  // === BUSINESS ===
  {
    id: 'demo_bz_1',
    text: 'Открыл DOO в Сербии. Агентство 500€ + пошлина 50€. Уставной капитал 100 RSD. Какой налог платить если доходов нет?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'DOO регистрация фирма налоги'),
    date: '2026-05-22',
    authorName: 'Константин',
    groupName: 'Русские в Сербии · Поиск: DOO',
    likes: 29,
    commentsCount: 18,
    topComments: [
      { text: 'Налоги минимальные. Бухгалтер 30-50€/мес. Налог на прибыль 15%.', authorName: 'Илья', likes: 22 },
      { text: 'ИП (предузетник) — налоги ниже. 10% подоходный.', authorName: 'Ольга', likes: 16 },
    ],
  },
  {
    id: 'demo_bz_2',
    text: 'Фриланс + ВНЖ: как платить налоги? Можно самозанятым? Получаю доход из EU. Открывать ИП или DOO?',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'фриланс налоги ИП Сербия'),
    date: '2026-05-20',
    authorName: 'Алексей',
    groupName: 'Русские и Сербия · Поиск: налоги',
    likes: 43,
    commentsCount: 29,
    topComments: [
      { text: 'ИП (предузетник паушалац) — 250-500€/мес фикс до 6 млн RSD.', authorName: 'Максим', likes: 34 },
      { text: 'Фрилансерам — однозначно ИП, а не самозанятость.', authorName: 'Анна', likes: 27 },
    ],
  },
  // === EDUCATION ===
  {
    id: 'demo_e_1',
    text: 'Ищу школу для ребёнка 8 лет. Русская или сербская? Ребёнок не знает сербского. Рассматриваем посольскую школу или частные.',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'школа ребёнок образование Сербия'),
    date: '2026-05-21',
    authorName: 'Наталья',
    groupName: 'Русские в Сербии · Поиск: школа',
    likes: 35,
    commentsCount: 22,
    topComments: [
      { text: 'Русская школа при посольстве — бесплатно, но очередь.', authorName: 'Марина', likes: 28 },
      { text: 'Частные: Savremena 300€/мес, British School 600€/мес.', authorName: 'Александр', likes: 21 },
    ],
  },
  {
    id: 'demo_e_2',
    text: 'Детский сад в Нови-Саде: цены? Гос 30-50€/мес, частный 200-400€. Ребёнок не говорит по-сербски, переживаю.',
    url: fbSearchUrl(CANONICAL_GROUP_ID, 'садик детский Нови-Сад'),
    date: '2026-05-17',
    authorName: 'Екатерина',
    groupName: 'Русские и Сербия · Поиск: садик',
    likes: 19,
    commentsCount: 12,
    topComments: [
      { text: 'Дети быстро учат язык в игре. 3 месяца — говорят.', authorName: 'Сергей', likes: 14 },
      { text: 'Bambino на Телепе — 250€/мес, русские воспитатели.', authorName: 'Анна', likes: 12 },
    ],
  },
];

// ============================================================
// МАППИНГ
// ============================================================

const topicPostMap: Partial<Record<TopicId, FbPost[]>> = {
  housing: [demoPosts[0], demoPosts[1], demoPosts[2]],
  banks: [demoPosts[3], demoPosts[4]],
  cost_of_living: [demoPosts[5], demoPosts[6]],
  vnj: [demoPosts[7], demoPosts[8]],
  healthcare: [demoPosts[9], demoPosts[10]],
  auto: [demoPosts[11], demoPosts[12]],
  business: [demoPosts[13], demoPosts[14]],
  education: [demoPosts[15], demoPosts[16]],
};

const recommendations: Partial<Record<TopicId, string[]>> = {
  housing: ['Ищите на 4zida.rs и halooglasi.com', 'Нови-Сад и Земун дешевле центра на 20-30%', 'Проверяйте договор (list nepokretnosti)'],
  banks: ['Raiffeisen — лучший для нерезидентов', 'UniCredit — быстрое открытие за 2 дня', 'Для счетов достаточно загранпаспорта'],
  cost_of_living: ['Бюджет на одного: 800-1000€', 'Семья 4 чел: 1800-2200€', 'Продукты дешевле на рынках'],
  vnj: ['ВНЖ через DOO — 3-4 месяца', 'Юрист 500-1000€', 'Продление за 2 месяца до истечения'],
  healthcare: ['Приём врача 20-40€', 'Страховка ДОЗОР 180€/год', 'Скорая 194 бесплатно'],
  auto: ['PolovniAutomobili.com — главный сайт', 'Права меняют без экзамена (~50€)', 'Страховка 100-200€/год'],
  business: ['DOO через агентство 500-800€', 'ИП: 250-500€/мес', 'Бухгалтер 50-80€/мес'],
  education: ['Гос школы бесплатны', 'Русская школа при посольстве', 'Садики: гос 30-50€, частные 200-400€'],
};

const summaries: Partial<Record<TopicId, string>> = {
  housing: '🏠 На основе обсуждений: аренда однушки 300-700€. Дорчол — дорогой центр (700-900€), Земун — семейный (500-650€), Нови Београд — средний (400-550€). Лучшие сайты: 4zida.rs, halooglasi.com.',
  banks: '🏦 Raiffeisen — лучший для нерезидентов. Некоторые отделения требуют ВНЖ, но через мобильное приложение открывают без него.',
  cost_of_living: '💰 На одного: 800-1000€/мес. На семью 4 чел: 1800-2200€. Аренда 40-50% бюджета. Экономия на рынках (Каленич, Зелени венац).',
  vnj: '📋 ВНЖ через DOO — популярный способ. Юрист 500-1000€. С 2026: нужно 6 месяцев деятельности. Обязательна страховка и справка из ПИО.',
  healthcare: '🏥 Медицина качественная и недорогая. Стоматология — одна из лучших в Европе. Страховка от 180€/год (ДОЗОР). Скорая (194) бесплатна.',
  auto: '🚗 PolovniAutomobili.com — главный сайт покупки. Налог 0.5%. Права меняются без экзамена. Страховка 100-200€/год. При ДТП звоните 192.',
  business: '🏢 DOO: агентство 500-800€. Уставной капитал от 100 RSD. ИП: 250-500€/мес. Бухгалтер: 50-80€/мес. Фрилансерам — ИП.',
  education: '📚 Гос школы бесплатны, дети адаптируются за 3-6 мес. Русская школа — бесплатно, очередь. Садики гос 30-50€, частные 200-400€.',
};

const CANONICAL_GROUP_URL = fbGroupUrl(CANONICAL_GROUP_ID);

const GROUP_LINKS: Partial<Record<TopicId, string[]>> = {
  housing: [CANONICAL_GROUP_URL],
  banks: [CANONICAL_GROUP_URL],
  cost_of_living: [CANONICAL_GROUP_URL],
  vnj: [CANONICAL_GROUP_URL],
  healthcare: [CANONICAL_GROUP_URL],
  auto: [CANONICAL_GROUP_URL],
  business: [CANONICAL_GROUP_URL],
  education: [CANONICAL_GROUP_URL],
};

export function getDemoSearchResponse(topicId: TopicId): SearchResponse {
  const now = new Date().toISOString();
  // Берём реальные группы из конфига топика, иначе fallback на одну главную
  const topicConfig = TOPIC_LIST.find(t => t.id === topicId);
  const groupUrls = topicConfig ? (topicConfig.groupUrls as string[]) : (GROUP_LINKS[topicId] || []);
  const groupNames = groupUrls.map(getGroupName);

  return {
    topic: topicId,
    summary: summaries[topicId] || '',
    recommendations: recommendations[topicId] || [],
    posts: topicPostMap[topicId] || [],
    scrapedAt: now,
    freshness: 'только что',
    groupsScraped: groupUrls.length,
    totalPostsAnalyzed: (topicPostMap[topicId] || []).length,
    status: 'fresh',
    groupSearchUrls: groupUrls,
    groupNames,
    isDemo: true as any,
  };
}
