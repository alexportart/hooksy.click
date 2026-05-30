"use client";

import Link from "next/link";
import { Guide } from "@/lib/types";
import { isNew } from "@/lib/freshness";
import NewBadge from "@/components/NewBadge";

const DIFFICULTY_LABELS = { easy: "Легко", medium: "Средне", hard: "Сложно" };
const DIFFICULTY_COLORS = {
  easy: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)", text: "#34d399" },
  medium: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.25)", text: "#fbbf24" },
  hard: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)", text: "#f87171" },
};

export default function GuideCard({ guide }: { guide: Guide }) {
  const diff = DIFFICULTY_COLORS[guide.difficulty as keyof typeof DIFFICULTY_COLORS] ?? DIFFICULTY_COLORS.medium;

  return (
    <Link href={`/guides/${guide.slug}`} style={{ textDecoration: "none" }}>
      <article style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "24px",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          {isNew(guide.publishedAt) && <NewBadge />}
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
            background: diff.bg, border: `1px solid ${diff.border}`, color: diff.text,
            letterSpacing: "0.04em",
          }}>
            {DIFFICULTY_LABELS[guide.difficulty]}
          </span>
          <span style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 99,
            background: "var(--surface2)", border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}>
            {(guide as any).timeRequired ?? (guide as any).estimatedTime ?? "—"}
          </span>
        </div>

        <h3 style={{
          fontSize: "1rem", fontWeight: 700, color: "var(--text)",
          lineHeight: 1.4, marginBottom: 10,
        }}>
          {guide.title}
        </h3>

        <p style={{
          fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6,
          marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {guide.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#06b6d4" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 12, color: "#06b6d4" }}>
            {guide.steps.length} шагов
          </span>
        </div>
      </article>
    </Link>
  );
}
