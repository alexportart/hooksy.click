export type NodeType = 'start' | 'decision' | 'action' | 'status' | 'warning' | 'end'

export type RoadmapLink = {
  label: string
  href: string
  kind: 'article' | 'guide' | 'topic'
}

export type RoadmapNode = {
  id: string
  title: string
  subtitle?: string
  type: NodeType
  note?: string
  links?: RoadmapLink[]
}

// ─── NODE DEFINITIONS ──────────────────────────────────────────────────────

export const NODES: Record<string, RoadmapNode> = {
  start: {
    id: 'start',
    title: 'Россия',
    subtitle: 'Точка отправления',
    type: 'start',
  },
  prep: {
    id: 'prep',
    title: 'Подготовка',
    subtitle: 'До вылета',
    type: 'action',
    links: [
      { label: 'Чеклист подготовки', href: '/guides/podgotovka-k-pereezdu-v-serbiju', kind: 'guide' },
      { label: 'Авиабилеты дешевле', href: '/articles/kak-kupit-deshevye-aviabilety-v-serbiju', kind: 'article' },
    ],
  },
  entry: {
    id: 'entry',
    title: 'Въезд в Сербию',
    subtitle: 'Безвизовый режим · 90 дней из 180',
    type: 'action',
    links: [
      { label: 'Гайд по переезду', href: '/guides/pereezd-v-serbii', kind: 'guide' },
    ],
  },
  decision: {
    id: 'decision',
    title: 'Что дальше?',
    subtitle: 'Выберите путь',
    type: 'decision',
  },

  // ─── ВЕТКА 1: ВИЗА-РАН ───────────────────────────────────────────────────
  visarun: {
    id: 'visarun',
    title: 'Виза-ран',
    subtitle: 'Выезд до истечения 90 дней',
    type: 'action',
    note: 'Босния и Герцеговина — самый популярный вариант (безвизовый для РФ)',
  },
  visarun_return: {
    id: 'visarun_return',
    title: 'Возвращение в Сербию',
    subtitle: 'Новый отсчёт 90 дней',
    type: 'action',
  },
  visarun_risk: {
    id: 'visarun_risk',
    title: 'Риск отказа',
    subtitle: 'После 2–3 виза-ранов пограничники могут отказать во въезде',
    type: 'warning',
    note: 'Без ВНЖ или рабочей визы жить в Сербии постоянно невозможно',
  },

  // ─── ВЕТКА 2: ВНЖ ────────────────────────────────────────────────────────
  vnzh_decision: {
    id: 'vnzh_decision',
    title: 'ВНЖ — выбор основания',
    subtitle: 'Боравак (Boravak)',
    type: 'decision',
    links: [
      { label: 'Всё о ВНЖ', href: '/guides/kak-poluchit-vnzh-v-serbii', kind: 'guide' },
    ],
  },

  // ИП
  ip: {
    id: 'ip',
    title: 'ИП (Preduzetnik)',
    subtitle: 'Индивидуальный предприниматель',
    type: 'action',
    links: [
      { label: 'Регистрация ИП', href: '/guides/registraciya-ip-v-serbii', kind: 'guide' },
    ],
  },
  ip_vnzh: {
    id: 'ip_vnzh',
    title: 'ВНЖ по бизнесу',
    subtitle: 'На основании ИП',
    type: 'status',
    links: [
      { label: 'Налоги для ИП', href: '/articles/nalogi-v-serbii-dlya-emigrantov', kind: 'article' },
      { label: 'Открыть счёт', href: '/guides/otkrytie-scheta-v-banke-serbii', kind: 'guide' },
    ],
  },

  // ООО
  doo: {
    id: 'doo',
    title: 'ООО (d.o.o.)',
    subtitle: 'Юридическое лицо',
    type: 'action',
    links: [
      { label: 'ВНЖ через ООО', href: '/guides/poluchenie-vnzh-cherez-doo', kind: 'guide' },
    ],
  },
  doo_vnzh: {
    id: 'doo_vnzh',
    title: 'ВНЖ директора',
    subtitle: 'На основании ООО',
    type: 'status',
    links: [
      { label: 'Удалённая работа из Сербии', href: '/articles/udalennaya-rabota-iz-serbii', kind: 'article' },
    ],
  },

  // Работа по найму
  work: {
    id: 'work',
    title: 'Работа по найму',
    subtitle: 'Виза D + разрешение на работу',
    type: 'action',
    links: [
      { label: 'Поиск работы в Сербии', href: '/guides/kak-nayti-rabotu-v-serbii', kind: 'guide' },
      { label: 'Работа в Сербии', href: '/articles/rabota-v-serbii-dlya-russkikh', kind: 'article' },
    ],
  },
  work_vnzh: {
    id: 'work_vnzh',
    title: 'ВНЖ по работе',
    subtitle: 'На основании трудового договора',
    type: 'status',
  },

  // Недвижимость
  realty: {
    id: 'realty',
    title: 'Недвижимость',
    subtitle: 'Покупка квартиры / дома',
    type: 'action',
    note: 'Иностранцы могут покупать недвижимость в Сербии',
  },
  realty_vnzh: {
    id: 'realty_vnzh',
    title: 'ВНЖ владельца',
    subtitle: 'На основании недвижимости',
    type: 'status',
    links: [
      { label: 'Аренда или покупка', href: '/articles/kak-snyat-kvartiru-v-belgrade', kind: 'article' },
    ],
  },

  // Семья / брак
  family: {
    id: 'family',
    title: 'Семья / брак',
    subtitle: 'Воссоединение с гражданином Сербии',
    type: 'action',
    links: [
      { label: 'ВНЖ через брак', href: '/guides/kak-poluchit-vnzh-cherez-brak', kind: 'guide' },
    ],
  },
  family_vnzh: {
    id: 'family_vnzh',
    title: 'ВНЖ по воссоединению',
    subtitle: 'На основании брака / семьи',
    type: 'status',
  },

  // Обучение
  study: {
    id: 'study',
    title: 'Обучение',
    subtitle: 'Поступление в вуз Сербии',
    type: 'action',
    links: [
      { label: 'Образование в Сербии', href: '/articles/obrazovanie-v-serbii-shkoly-vuzy', kind: 'article' },
    ],
  },
  study_vnzh: {
    id: 'study_vnzh',
    title: 'Студенческий ВНЖ',
    subtitle: 'На основании учёбы',
    type: 'status',
  },

  // ─── ПОСЛЕ ПОЛУЧЕНИЯ ВНЖ ─────────────────────────────────────────────────
  vnzh_obtained: {
    id: 'vnzh_obtained',
    title: 'ВНЖ получен',
    subtitle: 'Временный вид на жительство · 1 год, продлевается',
    type: 'status',
    links: [
      { label: 'Банки для эмигрантов', href: '/articles/banki-serbii-dlya-emigrantov', kind: 'article' },
      { label: 'Открыть счёт', href: '/guides/otkrytie-scheta-v-banke-serbii', kind: 'guide' },
      { label: 'SIM-карта', href: '/guides/poluchenie-sim-karty-v-serbii', kind: 'guide' },
    ],
  },
  vnzh_renewal: {
    id: 'vnzh_renewal',
    title: 'Продление ВНЖ',
    subtitle: 'Ежегодно, то же основание',
    type: 'action',
  },

  // ─── ВЕТКА 3: УЖЕ ЕСТЬ ВНЖ ──────────────────────────────────────────────
  already_vnzh: {
    id: 'already_vnzh',
    title: 'Уже есть ВНЖ',
    subtitle: 'Продолжаем путь к ПМЖ',
    type: 'status',
  },

  pmzh: {
    id: 'pmzh',
    title: 'ПМЖ',
    subtitle: '5 лет непрерывного проживания с ВНЖ',
    type: 'end',
    note: 'Стальни боравак (Stalni boravak)',
  },
  citizenship: {
    id: 'citizenship',
    title: 'Гражданство',
    subtitle: '3 года после ПМЖ + экзамен по языку',
    type: 'end',
    links: [
      { label: 'Сербский язык', href: '/articles/serbskiy-yazyk-kak-i-gde-uchit', kind: 'article' },
    ],
  },
}
