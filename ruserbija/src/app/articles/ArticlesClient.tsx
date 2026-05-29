"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

const CATEGORY_LABELS: Record<string, string> = {
  housing: "Жильё",
  banks: "Банки",
  cost_of_living: "Стоимость жизни",
  vnj: "ВНЖ",
  healthcare: "Медицина",
  auto: "Авто",
  business: "Бизнес",
  education: "Образование",
  transport: "Транспорт",
  taxes: "Налоги",
  language: "Язык",
  sim: "Связь",
  moving: "Переезд",
  coworking: "Коворкинг",
  pets: "Питомцы",
  notary: "Нотариус",
  food: "Еда",
  remote_work: "Удалёнка",
};

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map(a => a.category).filter(Boolean)));
    return cats.sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b, "ru"));
  }, [articles]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return articles.filter(a => {
      const matchCat = !activeCategory || a.category === activeCategory;
      const matchSearch = !q || a.title.toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [articles, search, activeCategory]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800,
          letterSpacing: "-0.02em", marginBottom: 12,
          background: "linear-gradient(135deg, #e8eaf0 40%, #6366f1 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Статьи
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Подробные материалы о жизни в Сербии для эмигрантов
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Поиск по статьям..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "10px 16px",
            fontSize: 15, color: "var(--text)", outline: "none",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 99,
            background: !activeCategory ? "rgba(99,102,241,0.15)" : "var(--surface)",
            border: `1px solid ${!activeCategory ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
            color: !activeCategory ? "#818cf8" : "var(--text-muted)",
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            style={{
              fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 99,
              background: activeCategory === cat ? "rgba(99,102,241,0.15)" : "var(--surface)",
              border: `1px solid ${activeCategory === cat ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
              color: activeCategory === cat ? "#818cf8" : "var(--text-muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Ничего не найдено.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map(a => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}
    </div>
  );
}
