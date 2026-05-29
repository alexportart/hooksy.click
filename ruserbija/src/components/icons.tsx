// Монохромные иконки для разделов сайта — стиль #2E5CAA / #0D1B4C

export const Icons: Record<string, React.ReactNode> = {
  // Категории
  "📖": <IconBook />,       // Предисловие
  "👤": <IconUser />,       // Личное
  "🏠": <IconHome />,       // ВНЖ
  "🏦": <IconBank />,       // Банки
  "💼": <IconBriefcase />,  // Бизнес
  "🚗": <IconCar />,        // Автомобиль
  "🏥": <IconHealth />,     // Медицина
  "🛡️": <IconShield />,     // ПМЖ

  // Entry иконки
  "🧳": <IconLuggage />,
  "💬": <IconChat />,
  "🛩": <IconPlane />,
  "📚": <IconBooks />,
  "📡": <IconWifi />,
  "🚌": <IconBus />,
  "🏡": <IconHouse />,
  "📇": <IconCard />,
  "🧮": <IconCalc />,
  "🚙": <IconCarFront />,
  "🗣️": <IconTranslate />,
  "🧓": <IconOld />,
  "🕹️": <IconSeal />,
  "👮": <IconPolice />,
  "🏪": <IconShop />,
  "🏨": <IconHotel />,
  "🔑": <IconKey />,
  "🍽️": <IconFood />,
  "💰": <IconMoney />,
  "🌍": <IconGlobe />,
  "🗨️": <IconLang />,
  "🏫": <IconSchool />,
  "🩹": <IconMed />,
  "🇷🇸": <IconRs />,
  "📝": <IconNote />,
  "🚚": <IconTruck />,
  "🎓": <IconGrad />,
  "🎒": <IconBackpack />,
  "🪪": <IconId />,
  "📜": <IconScroll />,
  "💱": <IconExchange />,
  "🟡": <IconDot />,
  "🔵": <IconDot />,
  "🔴": <IconDot />,
  "🟢": <IconDot />,
  "🔷": <IconDot />,
  "📲": <IconPhone />,
  "🟠": <IconDot />,
  "🟣": <IconDot />,
  "🏛": <IconBuilding />,
  "🏗": <IconCrane />,
  "💸": <IconCash />,
  "🏭": <IconFactory />,
  "📑": <IconPaper />,
  "🧾": <IconReceipt />,
  "🔏": <IconSignature />,
  "🌈": <IconRainbow />,
  "♻️": <IconLeaf />,
  "☠️": <IconSkull />,
  "💳": <IconCreditCard />,
  "🏎️": <IconSpeed />,

  // Гайды
  "📋": <IconGuide />,
  "✈️": <IconPlane />,
};

// --- SVG иконки (24x24, stroke 1.5, цвет задаётся через className/currentColor) ---

function IconBook() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17"/></svg>;
}

function IconUser() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>;
}

function IconHome() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
}

function IconBank() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>;
}

function IconBriefcase() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v.01"/></svg>;
}

function IconCar() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18h6"/><path d="M4 18h2"/><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M2 13h20v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>;
}

function IconHealth() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>;
}

function IconShield() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}

function IconLuggage() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V2"/><path d="M15 4V2"/><path d="M9 9h6"/><path d="M12 9v6"/></svg>;
}

function IconChat() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

function IconPlane() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.5-.7-1.3-.4-1.8.3-.5.9-.6 1.4-.3L12 7l5-5c1-1 2.5-1 3.5.5.5.5.5 1.5 0 2.5L15 11l2.5 4.5c.3.5.2 1.1-.3 1.4-.5.3-1.3.1-1.8-.4z"/></svg>;
}

function IconBooks() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="6" height="20" rx="1"/><rect x="14" y="2" width="6" height="20" rx="1"/><path d="M10 2h4"/></svg>;
}

function IconWifi() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>;
}

function IconBus() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 20v2"/><path d="M18 20v2"/><path d="M6 7h4"/><path d="M14 7h4"/><path d="M6 12h12"/></svg>;
}

function IconHouse() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M10 21V12h4v9"/></svg>;
}

function IconCard() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>;
}

function IconCalc() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 11h8"/><path d="M8 16h4"/></svg>;
}

function IconCarFront() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4"/><path d="M5 12l1.5-4.5A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1.5L19 12"/><path d="M2 14h20v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>;
}

function IconTranslate() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/><path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/></svg>;
}

function IconOld() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M5 14c-1.4 0-2.5.9-3 2.1L1 19h22l-1-2.9c-.5-1.2-1.6-2.1-3-2.1Z"/></svg>;
}

function IconSeal() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg>;
}

function IconPolice() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7Z"/><path d="M12 7v4"/><path d="M12 15h.01"/></svg>;
}

function IconShop() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}

function IconHotel() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M10 7v5"/><path d="M14 7v5"/><path d="M6 12h12"/><path d="M8 17h8"/></svg>;
}

function IconKey() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="6"/><path d="M13 7 20 0l4 4-3 3-2-2-4 4Z"/><path d="M20 4h0"/></svg>;
}

function IconFood() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7 3 11 6 13.5"/><path d="M12 2v19"/><path d="M16 22H8"/></svg>;
}

function IconMoney() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14 8h-2.5A1.5 1.5 0 0 0 10 9.5c0 .8.7 1.5 1.5 1.5h1a1.5 1.5 0 0 1 0 3H10"/><path d="M12 6v1.5"/><path d="M12 16.5V18"/></svg>;
}

function IconGlobe() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

function IconLang() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 4 3 3"/><path d="m9 4 3 3"/><path d="M4 9h4"/><path d="M13 7h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8"/><path d="M10 13h7"/><path d="M10 17h5"/></svg>;
}

function IconSchool() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5l2-2"/><path d="M12 13v9"/><path d="M9 22h6"/></svg>;
}

function IconMed() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}

function IconRs() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><path d="M2 15h20"/><path d="M6 3v18"/></svg>;
}

function IconNote() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h3"/></svg>;
}

function IconTruck() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}

function IconGrad() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9v8l3-2 3 2Z"/><path d="M10 12h4"/><path d="M10 16h4"/></svg>;
}

function IconBackpack() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 15V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v10"/><path d="M7 10V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7"/><path d="M3 15h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M10 19h4"/></svg>;
}

function IconId() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9h6"/><path d="M10 13h4"/><circle cx="7" cy="11" r="1"/><path d="M7 15h.01"/></svg>;
}

function IconScroll() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5v15A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5Z"/></svg>;
}

function IconExchange() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>;
}

function IconDot() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/></svg>;
}

function IconPhone() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>;
}

function IconBuilding() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h2"/><path d="M9 10h2"/><path d="M13 6h2"/><path d="M13 10h2"/><path d="M9 14h2"/><path d="M13 14h2"/><path d="M9 18h2"/><path d="M13 18h2"/></svg>;
}

function IconCrane() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13v7"/><path d="M18 13v7"/><path d="M3 4h18"/><path d="M5 4v9h14V4"/><path d="M9 20h6"/></svg>;
}

function IconCash() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}

function IconFactory() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5"/><path d="M15 2v6"/><path d="M8 2v6"/></svg>;
}

function IconPaper() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><polyline points="14 2 14 8 20 8"/><path d="M10 13h4"/><path d="M10 17h2"/></svg>;
}

function IconReceipt() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/></svg>;
}

function IconSignature() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14h-4l-1.5-4.5A2 2 0 0 0 12.6 8h-.2a2 2 0 0 0-1.9 1.5L9 14H4"/><path d="m12 12 4 8"/><path d="m15 12-4 8"/></svg>;
}

function IconRainbow() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg>;
}

function IconLeaf() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.8 17 3 17 3s-.7 7.2-6.3 10.9"/><path d="M15.2 20.3A7 7 0 0 1 9 11c-.5-.5-.9-.9-1.4-1.3"/></svg>;
}

function IconSkull() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M3 12a9 9 0 1 1 18 0v3H3Z"/><path d="M6 18v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/></svg>;
}

function IconCreditCard() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
}

function IconSpeed() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>;
}

function IconGuide() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>;
}