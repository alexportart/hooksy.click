import { TopicConfig } from './types';

// Все активные Facebook-группы для скрапинга
// Только группы, которые реально отдают посты через facebook-scraper3 API
export const FB_GROUPS = {
  SVALIL:           'https://www.facebook.com/groups/svalil/',            // Svalil.com Эмиграция в Сербию
  PONA_EHALI:       'https://www.facebook.com/groups/248944475799584/',   // Понаехали! Сербия
  RUSSKIE_V_SERBII: 'https://www.facebook.com/groups/757234704313171/',   // РУССКИЕ В СЕРБИИ
  SERBIYA_PO_RUS2:  'https://www.facebook.com/groups/104389113089129/',   // Сербия по-русски
  RUSSKIE_NOVI_SAD: 'https://www.facebook.com/groups/360418284096515/',   // Русские в Нови Саде
  HOROSLIE_LYUDI:   'https://www.facebook.com/groups/753297288882257/',   // Сербия. Хорошие люди объединяйтесь!
  BIRZHA_TRUDA:     'https://www.facebook.com/groups/363465394618125/',   // Сербия | Биржа труда
  SERBIYA_OGLASI:   'https://www.facebook.com/groups/572109304230533/',   // Сербия ОБЪЯВЛЕНИЯ
  RABOTA_SERBII:    'https://www.facebook.com/groups/188929936460482/',   // Работа в Сербии
} as const;

// Главная группа для демо-ссылок (самая крупная общая)
export const MAIN_GROUP_ID = '248944475799584';

// Человекочитаемые названия групп для отображения на сайте
export const FB_GROUP_NAMES: Record<string, string> = {
  'https://www.facebook.com/groups/svalil/': 'Svalil.com Эмиграция в Сербию',
  'https://www.facebook.com/groups/248944475799584/': 'Понаехали! Сербия',
  'https://www.facebook.com/groups/757234704313171/': 'РУССКИЕ В СЕРБИИ',
  'https://www.facebook.com/groups/104389113089129/': 'Сербия по-русски',
  'https://www.facebook.com/groups/360418284096515/': 'Русские в Нови Саде',
  'https://www.facebook.com/groups/753297288882257/': 'Сербия. Хорошие люди объединяйтесь!',
  'https://www.facebook.com/groups/363465394618125/': 'Сербия | Биржа труда',
  'https://www.facebook.com/groups/572109304230533/': 'Сербия ОБЪЯВЛЕНИЯ',
  'https://www.facebook.com/groups/188929936460482/': 'Работа в Сербии',
};

/** Возвращает название группы по URL */
export function getGroupName(url: string): string {
  return FB_GROUP_NAMES[url] || 'Facebook группа';
}

// Все рабочие группы для общих топиков
const GENERAL_GROUPS = [
  FB_GROUPS.SVALIL,
  FB_GROUPS.PONA_EHALI,
  FB_GROUPS.RUSSKIE_V_SERBII,
  FB_GROUPS.SERBIYA_PO_RUS2,
  FB_GROUPS.RUSSKIE_NOVI_SAD,
  FB_GROUPS.HOROSLIE_LYUDI,
  FB_GROUPS.SERBIYA_OGLASI,
];

// Группы для жилья и недвижимости
const HOUSING_GROUPS = [
  FB_GROUPS.SVALIL,
  FB_GROUPS.SERBIYA_OGLASI,
  FB_GROUPS.PONA_EHALI,
  FB_GROUPS.RUSSKIE_V_SERBII,
  FB_GROUPS.RUSSKIE_NOVI_SAD,
];

// Группы для работы и бизнеса
const WORK_GROUPS = [
  FB_GROUPS.SVALIL,
  FB_GROUPS.BIRZHA_TRUDA,
  FB_GROUPS.RABOTA_SERBII,
  FB_GROUPS.SERBIYA_OGLASI,
  FB_GROUPS.PONA_EHALI,
  FB_GROUPS.RUSSKIE_V_SERBII,
];

export const TOPICS: Record<string, TopicConfig> = {
  housing: {
    id: 'housing', label: 'Жильё', emoji: 'Home',
    searchQuery: 'аренда квартира дом Сербия',
    groupUrls: HOUSING_GROUPS,
    keywords: ['аренд','квартир','снять','жильё','дом','комнат','район','коммунал','посуточн'],
  },
  banks: {
    id: 'banks', label: 'Банки и карты', emoji: 'Landmark',
    searchQuery: 'банк карта счёт Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['банк','карт','счёт','raiffeisen','unicredit','intesa','nlb','перевод','swift'],
  },
  cost_of_living: {
    id: 'cost_of_living', label: 'Стоимость жизни', emoji: 'Wallet',
    searchQuery: 'расходы жизнь цены Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['цен','стоит','расход','зарплат','продукт','коммунал','транспорт','бюджет'],
  },
  vnj: {
    id: 'vnj', label: 'ВНЖ', emoji: 'FileText',
    searchQuery: 'ВНЖ вид на жительство Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['внж','вид на жительство','boravak','разрешение','документ','паспорт','виз'],
  },
  healthcare: {
    id: 'healthcare', label: 'Медицина', emoji: 'HeartPulse',
    searchQuery: 'медицина больница страховка Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['медицин','больниц','врач','страховк','стоматолог','аптек','здоровь'],
  },
  auto: {
    id: 'auto', label: 'Авто', emoji: 'Car',
    searchQuery: 'авто машина покупка Сербия',
    groupUrls: [
      FB_GROUPS.SVALIL,
      FB_GROUPS.SERBIYA_OGLASI,
      FB_GROUPS.PONA_EHALI,
      FB_GROUPS.RUSSKIE_V_SERBII,
    ],
    keywords: ['авто','машин','купить машин','права','регистрац машин','техосмотр'],
  },
  business: {
    id: 'business', label: 'Бизнес и работа', emoji: 'Briefcase',
    searchQuery: 'фирма работа бизнес Сербия',
    groupUrls: WORK_GROUPS,
    keywords: ['фирм','регистрац','налог','бухгалтер','дроп','ип','предприниматель'],
  },
  education: {
    id: 'education', label: 'Образование', emoji: 'GraduationCap',
    searchQuery: 'школа садик образование Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['школ','университет','садик','обучени','курс','диплом','нострификаци'],
  },
  transport: {
    id: 'transport', label: 'Транспорт', emoji: 'Bus',
    searchQuery: 'транспорт такси автобус Белград',
    groupUrls: GENERAL_GROUPS,
    keywords: ['автобус','такси','uber','bolt','трамвай','транспорт','проездной'],
  },
  taxes: {
    id: 'taxes', label: 'Налоги', emoji: 'ReceiptText',
    searchQuery: 'налоги эмигрант Сербия декларация',
    groupUrls: GENERAL_GROUPS,
    keywords: ['налог','декларац','налоговый резидент','poreska','pdv','tax'],
  },
  language: {
    id: 'language', label: 'Сербский язык', emoji: 'Languages',
    searchQuery: 'сербский язык курсы учить Белград',
    groupUrls: GENERAL_GROUPS,
    keywords: ['сербск','serbian','jezik','курс языка','учить язык','репетитор'],
  },
  sim: {
    id: 'sim', label: 'Мобильная связь', emoji: 'Smartphone',
    searchQuery: 'симкарта мобильная связь Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['сим','sim','мобильн','tариф','mts','telekom','yettel','роуминг','esim'],
  },
  moving: {
    id: 'moving', label: 'Перевоз вещей', emoji: 'PackageOpen',
    searchQuery: 'перевоз вещи переезд Сербия',
    groupUrls: [
      FB_GROUPS.SVALIL,
      FB_GROUPS.SERBIYA_OGLASI,
      FB_GROUPS.PONA_EHALI,
      FB_GROUPS.RUSSKIE_V_SERBII,
    ],
    keywords: ['перевоз','переезд','вещи','грузоперевозк','таможн','посылк','доставк'],
  },
  coworking: {
    id: 'coworking', label: 'Коворкинг', emoji: 'Monitor',
    searchQuery: 'коворкинг офис аренда Белград',
    groupUrls: GENERAL_GROUPS,
    keywords: ['коворкинг','coworking','офис','рабочее место','hot desk','workspace'],
  },
  pets: {
    id: 'pets', label: 'Питомцы', emoji: 'PawPrint',
    searchQuery: 'животные питомец кошка собака Сербия',
    groupUrls: [
      FB_GROUPS.SVALIL,
      FB_GROUPS.SERBIYA_OGLASI,
      FB_GROUPS.PONA_EHALI,
      FB_GROUPS.RUSSKIE_V_SERBII,
    ],
    keywords: ['животн','питомец','кошк','собак','ветеринар','вакцинац','переезд с кошк'],
  },
  notary: {
    id: 'notary', label: 'Нотариус', emoji: 'Stamp',
    searchQuery: 'нотариус апостиль документы Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['нотариус','апостил','перевод документ','легализац','заверен','доверенност'],
  },
  food: {
    id: 'food', label: 'Еда и рестораны', emoji: 'UtensilsCrossed',
    searchQuery: 'ресторан кафе еда Белград Сербия',
    groupUrls: GENERAL_GROUPS,
    keywords: ['ресторан','кафе','еда','доставк еды','glovo','wolt','рынок','продукт'],
  },
  remote_work: {
    id: 'remote_work', label: 'Удалёнка', emoji: 'Globe',
    searchQuery: 'удаленная работа фриланс IT Сербия',
    groupUrls: WORK_GROUPS,
    keywords: ['удалённ','remote','фриланс','freelance','программист','it серби'],
  },
};

export const TOPIC_LIST = Object.values(TOPICS);
export function getTopic(id: string): TopicConfig | undefined { return TOPICS[id]; }
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
