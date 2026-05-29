"use client";

import { useState } from "react";
import { HandbookEntry } from "@/lib/handbook";
import { Icons } from "@/components/icons";

/** Рендер облегчённого markdown: абзацы + списки "- " */
function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const lines = block.split("\n");
    const isList = lines.every(l => l.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={i} style={{ margin: "10px 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 }}>
          {lines.map((l, j) => (
            <li key={j} style={{ fontSize: 14.5, color: "#2D3748", lineHeight: 1.7 }}>
              {l.replace(/^-\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} style={{ fontSize: 14.5, color: "#1F2937", lineHeight: 1.85, margin: "0 0 12px" }}>
        {block}
      </p>
    );
  });
}

export default function CategoryView({ entries }: { entries: HandbookEntry[] }) {
  const [open, setOpen] = useState<string | null>(entries[0]?.slug ?? null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {entries.map(entry => {
        const isOpen = open === entry.slug;
        return (
          <div
            key={entry.slug}
            style={{
              background: "#fff",
              border: `1.5px solid ${isOpen ? "#2E5CAA" : "rgba(13,27,76,0.1)"}`,
              borderRadius: 14, overflow: "hidden",
              boxShadow: isOpen ? "0 4px 18px rgba(46,92,170,0.1)" : "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : entry.slug)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 14,
                padding: "16px 20px", background: "transparent", border: "none",
                cursor: "pointer", textAlign: "left", fontFamily: "'Rubik', sans-serif",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", color: "#2E5CAA", flexShrink: 0 }}>{Icons[entry.emoji] || entry.emoji}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0D1B4C" }}>{entry.title}</span>
                  {entry.fromPosts && (
                    <span style={{
                      fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                      color: "#1a7a3e", background: "rgba(39,174,96,0.1)",
                      border: "1px solid rgba(39,174,96,0.25)", borderRadius: 99, padding: "2px 7px",
                    }}>
                      из обсуждений
                    </span>
                  )}
                </span>
                <span style={{ display: "block", fontSize: 13, color: "#6B7280", marginTop: 3, lineHeight: 1.4 }}>
                  {entry.summary}
                </span>
              </span>
              <span style={{
                flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                background: isOpen ? "#2E5CAA" : "rgba(46,92,170,0.08)",
                color: isOpen ? "#fff" : "#2E5CAA",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700,
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s, background 0.2s",
              }}>+</span>
            </button>

            {isOpen && (
              <div style={{
                padding: "4px 20px 20px 58px",
                borderTop: "1px solid rgba(13,27,76,0.06)",
              }}>
                <div style={{ paddingTop: 14 }}>
                  {renderContent(entry.content)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
