"use client";

import Link from "next/link";
import { ExternalLink, Users, Clock, BookOpen, FileText, ChevronRight, MessageSquareText, Link2 } from "lucide-react";
import { SearchResponse } from "@/lib/types";

const RC_STYLES = `
  .rc-section { background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 1px 8px rgba(13,27,76,0.06); }
  .rc-section-header { display:flex;align-items:center;gap:10px;padding:16px 22px;border-bottom:1.5px solid rgba(13,27,76,0.07); }
  .rc-section-body { padding:20px 22px; }
  .rc-label { font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase; }
  .rc-source-link { display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:12px;background:#fff;border:1.5px solid rgba(13,27,76,0.09);text-decoration:none;transition:border-color 0.15s,box-shadow 0.15s,transform 0.15s;cursor:pointer; }
  .rc-source-link:hover { border-color:rgba(46,92,170,0.3);box-shadow:0 3px 12px rgba(46,92,170,0.08);transform:translateY(-1px); }
  .rc-read-link { display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:#fff;border:1.5px solid rgba(124,58,237,0.15);text-decoration:none;transition:border-color 0.15s,box-shadow 0.15s,transform 0.15s; }
  .rc-read-link:hover { border-color:rgba(124,58,237,0.4);box-shadow:0 3px 14px rgba(124,58,237,0.1);transform:translateY(-1px); }
  .rc-group-link { display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:10px;background:rgba(39,174,96,0.05);border:1.5px solid rgba(39,174,96,0.15);color:#1a7a3e;text-decoration:none;font-size:13px;font-weight:600;transition:all 0.15s; }
  .rc-group-link:hover { background:rgba(39,174,96,0.1);border-color:rgba(39,174,96,0.3); }
`;

function SectionHeader({ icon, label, color, bg, borderColor }: {
  icon: React.ReactNode; label: string; color: string; bg: string; borderColor: string;
}) {
  return (
    <div className="rc-section-header" style={{ background: bg, borderBottomColor: borderColor }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: "rgba(255,255,255,0.7)", border: `1.5px solid ${borderColor}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <span className="rc-label" style={{ color }}>{label}</span>
    </div>
  );
}

export default function ResultCard({ data }: { data: SearchResponse }) {
  const {
    summary, recommendations, sourcePosts, scrapedAt, freshness,
    groupsScraped, totalPostsAnalyzed, groupSearchUrls, groupNames, relatedLinks,
  } = data;

  const hasSummary    = summary && summary.length > 30;
  const hasSourcePosts = sourcePosts && sourcePosts.length > 0;

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
      <style>{RC_STYLES}</style>

      {/* ── Мета-строка ──────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
        background: "#fff", border: "1.5px solid rgba(13,27,76,0.08)",
        borderRadius: 12, padding: "10px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27AE60", display: "inline-block", boxShadow: "0 0 6px rgba(39,174,96,0.5)" }} />
          <Clock size={12} color="#94A3B8" strokeWidth={1.75} />
          <span style={{ fontSize: 12, color: "#6B7280" }}>обновлено {freshness}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4A5568", fontWeight: 500 }}>
          <Users size={12} strokeWidth={1.75} color="#94A3B8" />
          <span>{groupsScraped} групп · {totalPostsAnalyzed} источников</span>
        </div>
      </div>

      {/* ── Сводка ───────────────────────────────────────────────── */}
      {hasSummary && (
        <div className="rc-section" style={{ border: "1.5px solid rgba(46,92,170,0.15)" }}>
          <SectionHeader
            icon={<MessageSquareText size={14} color="#2E5CAA" strokeWidth={1.75} />}
            label="Сводка на основе обсуждений"
            color="#1E4080"
            bg="rgba(46,92,170,0.05)"
            borderColor="rgba(46,92,170,0.15)"
          />
          <div className="rc-section-body">
            <p style={{ fontSize: 15, color: "#1F2937", lineHeight: 1.9, whiteSpace: "pre-line", margin: 0 }}>
              {summary}
            </p>
          </div>
        </div>
      )}

      {/* ── Рекомендации ─────────────────────────────────────────── */}
      {recommendations && recommendations.length > 0 && (
        <div className="rc-section" style={{ border: "1.5px solid rgba(229,57,53,0.15)" }}>
          <SectionHeader
            icon={<span style={{ fontSize: 13 }}>💡</span>}
            label="Рекомендации"
            color="#B91C1C"
            bg="rgba(229,57,53,0.04)"
            borderColor="rgba(229,57,53,0.15)"
          />
          <div className="rc-section-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recommendations.map((rec, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24, borderRadius: 7,
                    background: "rgba(46,92,170,0.08)", border: "1.5px solid rgba(46,92,170,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: "#2E5CAA",
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: "#1F2937", lineHeight: 1.65, paddingTop: 3 }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Источники — посты из Facebook ────────────────────────── */}
      {hasSourcePosts && (
        <div className="rc-section" style={{ border: "1.5px solid rgba(245,158,11,0.18)" }}>
          <SectionHeader
            icon={<Link2 size={14} color="#D97706" strokeWidth={1.75} />}
            label={`Источники · ${sourcePosts!.length} обсуждений`}
            color="#92400E"
            bg="rgba(245,158,11,0.05)"
            borderColor="rgba(245,158,11,0.18)"
          />
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            {sourcePosts!.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rc-source-link"
              >
                {/* Номер */}
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: 6,
                  background: "rgba(245,158,11,0.1)", border: "1.5px solid rgba(245,158,11,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, color: "#D97706",
                }}>{i + 1}</span>

                {/* Текст */}
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: "block", fontSize: 11, color: "#94A3B8", marginBottom: 3,
                    fontWeight: 500,
                  }}>
                    {post.groupName} · {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                  </span>
                  <span style={{
                    display: "block", fontSize: 13.5, color: "#1F2937",
                    lineHeight: 1.5, wordBreak: "break-word",
                  }}>
                    {post.text}
                  </span>
                </span>

                {/* Иконка */}
                <ExternalLink size={13} color="#94A3B8" strokeWidth={1.75} style={{ flexShrink: 0, marginTop: 2 }} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Читать по теме ────────────────────────────────────────── */}
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="rc-section" style={{ border: "1.5px solid rgba(124,58,237,0.15)" }}>
          <SectionHeader
            icon={<BookOpen size={14} color="#7C3AED" strokeWidth={1.75} />}
            label="Читать по теме на сайте"
            color="#6D28D9"
            bg="rgba(124,58,237,0.04)"
            borderColor="rgba(124,58,237,0.15)"
          />
          <div className="rc-section-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {relatedLinks.map((link) => (
                <Link
                  key={`${link.type}-${link.slug}`}
                  href={`/${link.type === "guide" ? "guides" : "articles"}/${link.slug}`}
                  className="rc-read-link"
                >
                  <span style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: 9,
                    background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(124,58,237,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {link.type === "guide"
                      ? <BookOpen size={15} color="#7C3AED" strokeWidth={1.75} />
                      : <FileText size={15} color="#7C3AED" strokeWidth={1.75} />}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7C3AED", marginBottom: 2 }}>
                      {link.type === "guide" ? "Гайд" : "Статья"}
                    </span>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#0D1B4C", lineHeight: 1.4 }}>
                      {link.title}
                    </span>
                  </span>
                  <ChevronRight size={16} color="#94A3B8" strokeWidth={2} style={{ flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Спросить в группе ────────────────────────────────────── */}
      {groupSearchUrls && groupSearchUrls.length > 0 && (
        <div className="rc-section" style={{ border: "1.5px solid rgba(39,174,96,0.15)" }}>
          <SectionHeader
            icon={<Link2 size={14} color="#27AE60" strokeWidth={1.75} />}
            label="Не нашли ответ? Спросите в группе"
            color="#1a7a3e"
            bg="rgba(39,174,96,0.04)"
            borderColor="rgba(39,174,96,0.15)"
          />
          <div className="rc-section-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {groupSearchUrls.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="rc-group-link">
                  <span>{groupNames?.[i] || "Facebook группа"}</span>
                  <ExternalLink size={12} strokeWidth={2} style={{ opacity: 0.45 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <p style={{ textAlign: "center", fontSize: 11, color: "#CBD5E0", paddingTop: 2 }}>
        Обновлено: {new Date(scrapedAt).toLocaleString("ru-RU")}
      </p>
    </div>
  );
}
