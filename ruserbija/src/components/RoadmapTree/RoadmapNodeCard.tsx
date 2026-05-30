"use client";

import Link from "next/link";
import { RoadmapNode } from "@/lib/roadmap";

const TYPE_STYLES: Record<string, { border: string; bg: string; badge: string; badgeText: string; icon: string }> = {
  start:    { border: "#2E5CAA", bg: "rgba(46,92,170,0.06)", badge: "#2E5CAA", badgeText: "#fff", icon: "✈" },
  decision: { border: "#7C3AED", bg: "rgba(124,58,237,0.06)", badge: "#7C3AED", badgeText: "#fff", icon: "⑂" },
  action:   { border: "#0EA5E9", bg: "rgba(14,165,233,0.06)", badge: "#0EA5E9", badgeText: "#fff", icon: "→" },
  status:   { border: "#059669", bg: "rgba(5,150,105,0.06)", badge: "#059669", badgeText: "#fff", icon: "✓" },
  warning:  { border: "#D97706", bg: "rgba(217,119,6,0.07)", badge: "#D97706", badgeText: "#fff", icon: "!" },
  end:      { border: "#2E5CAA", bg: "rgba(46,92,170,0.08)", badge: "#2E5CAA", badgeText: "#fff", icon: "★" },
};

const KIND_COLOR: Record<string, string> = {
  guide:   "#7C3AED",
  article: "#0EA5E9",
  topic:   "#059669",
};

export default function RoadmapNodeCard({ node }: { node: RoadmapNode }) {
  const s = TYPE_STYLES[node.type] ?? TYPE_STYLES.action;
  return (
    <div style={{
      border: `1.5px solid ${s.border}`,
      background: s.bg,
      borderRadius: 14,
      padding: "14px 16px",
      minWidth: 200,
      maxWidth: 260,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      position: "relative",
    }}>
      {/* badge */}
      <span style={{
        position: "absolute", top: -11, left: 14,
        background: s.badge, color: s.badgeText,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
        borderRadius: 99, padding: "2px 10px",
      }}>
        {s.icon}
      </span>

      <div style={{ fontWeight: 700, fontSize: 14, color: "#1A202C", lineHeight: 1.3, marginTop: 4 }}>
        {node.title}
      </div>

      {node.subtitle && (
        <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>
          {node.subtitle}
        </div>
      )}

      {node.note && (
        <div style={{
          fontSize: 11, color: "#92400E", background: "rgba(217,119,6,0.08)",
          borderRadius: 6, padding: "4px 8px", lineHeight: 1.4, marginTop: 2,
        }}>
          {node.note}
        </div>
      )}

      {node.links && node.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
          {node.links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 11, fontWeight: 600, color: KIND_COLOR[l.kind] ?? "#2E5CAA",
              background: `${KIND_COLOR[l.kind] ?? "#2E5CAA"}15`,
              border: `1px solid ${KIND_COLOR[l.kind] ?? "#2E5CAA"}30`,
              borderRadius: 6, padding: "3px 8px", textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
