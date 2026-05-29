"use client";

import Link from "next/link";
import { Article } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  housing: "Жильё", banks: "Банки", cost_of_living: "Стоимость жизни",
  vnj: "ВНЖ", healthcare: "Медицина", auto: "Авто", business: "Бизнес",
  education: "Образование", transport: "Транспорт", taxes: "Налоги",
  language: "Язык", sim: "Связь", moving: "Переезд", coworking: "Коворкинг",
  pets: "Питомцы", notary: "Нотариус", food: "Еда", remote_work: "Удалёнка",
};

export default function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
      <article style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "24px",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer", display: "block",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc", letterSpacing: "0.04em",
          }}>
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>
        </div>

        <h3 style={{
          fontSize: "1rem", fontWeight: 700, color: "var(--text)",
          lineHeight: 1.4, marginBottom: 10,
        }}>
          {article.title}
        </h3>

        <p style={{
          fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6,
          marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {article.description}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{date}</span>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{article.readTime} мин чтения</span>
        </div>
      </article>
    </Link>
  );
}
