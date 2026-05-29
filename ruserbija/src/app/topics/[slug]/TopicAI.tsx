"use client";

import { useState, useEffect } from "react";
import { SearchResponse, TopicId } from "@/lib/types";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ResultCard from "@/components/ResultCard";

export default function TopicAI({ topicId, topicLabel }: { topicId: string; topicLabel: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchAI(); }, []);

  async function fetchAI() {
    if (result) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId as TopicId }),
      });
      if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось получить данные.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "#fff", border: "1.5px solid rgba(46,92,170,0.15)",
      borderRadius: 20, padding: "28px",
      boxShadow: "0 2px 16px rgba(46,92,170,0.07)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "rgba(46,92,170,0.08)", border: "1.5px solid rgba(46,92,170,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        }}>
          🤖
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#0D1B4C" }}>AI-сводка</span>
        <span style={{ fontSize: 13, color: "#6B7280" }}>
          — реальные обсуждения эмигрантов
        </span>
      </div>

      {!loading && !result && !error && (
        <LoadingSkeleton />
      )}

      {loading && <LoadingSkeleton />}

      {!loading && error && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ color: "#E53935", marginBottom: 12, fontWeight: 500 }}>{error}</p>
          <button onClick={() => { setError(null); fetchAI(); }} style={{
            padding: "8px 20px", borderRadius: 8,
            border: "1.5px solid rgba(46,92,170,0.3)",
            background: "rgba(46,92,170,0.08)", color: "#2E5CAA",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && result && <ResultCard data={result} />}
    </div>
  );
}
