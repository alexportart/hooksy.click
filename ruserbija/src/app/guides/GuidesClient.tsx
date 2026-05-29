"use client";

import { useState, useMemo } from "react";
import { Guide } from "@/lib/types";
import GuideCard from "@/components/GuideCard";

const DIFFICULTY_OPTIONS = [
  { value: null, label: "Все", activeBg: "rgba(99,102,241,0.15)", activeBorder: "rgba(99,102,241,0.4)", activeColor: "#818cf8" },
  { value: "easy", label: "Легко", activeBg: "rgba(16,185,129,0.12)", activeBorder: "rgba(16,185,129,0.4)", activeColor: "#34d399" },
  { value: "medium", label: "Средне", activeBg: "rgba(251,191,36,0.12)", activeBorder: "rgba(251,191,36,0.4)", activeColor: "#fbbf24" },
  { value: "hard", label: "Сложно", activeBg: "rgba(239,68,68,0.12)", activeBorder: "rgba(239,68,68,0.4)", activeColor: "#f87171" },
] as const;

export default function GuidesClient({ guides }: { guides: Guide[] }) {
  const [search, setSearch] = useState("");
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return guides.filter(g => {
      const matchDiff = !activeDifficulty || g.difficulty === activeDifficulty;
      const matchSearch = !q || g.title.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q);
      return matchDiff && matchSearch;
    });
  }, [guides, search, activeDifficulty]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800,
          letterSpacing: "-0.02em", marginBottom: 12,
          background: "linear-gradient(135deg, #e8eaf0 40%, #06b6d4 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Пошаговые гайды
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Понятные инструкции по самым важным вопросам жизни в Сербии
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Поиск по гайдам..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "10px 16px",
            fontSize: 15, color: "var(--text)", outline: "none",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Difficulty filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {DIFFICULTY_OPTIONS.map(opt => {
          const isActive = activeDifficulty === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => setActiveDifficulty(isActive ? null : (opt.value as string | null))}
              style={{
                fontSize: 12, fontWeight: 600, padding: "5px 16px", borderRadius: 99,
                background: isActive ? opt.activeBg : "var(--surface)",
                border: `1px solid ${isActive ? opt.activeBorder : "var(--border)"}`,
                color: isActive ? opt.activeColor : "var(--text-muted)",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Ничего не найдено.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map(g => <GuideCard key={g.slug} guide={g} />)}
        </div>
      )}
    </div>
  );
}
