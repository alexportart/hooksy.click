"use client";

import { useState } from "react";

// Кнопки "сохрани, чтобы не потерять" — отправка материала себе в соцсети/мессенджеры
// (по сути share-ссылки, поданные как личное сохранение-закладка).

export default function SaveLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const openShare = (build: (url: string, text: string) => string) => {
    const url = getUrl();
    const text = title;
    window.open(build(encodeURIComponent(url), encodeURIComponent(text)), "_blank", "noopener,noreferrer,width=620,height=520");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const btn = (bg: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 36, height: 36, flexShrink: 0,
    color: "#fff", background: bg,
    border: "none", borderRadius: 9,
    cursor: "pointer", transition: "opacity 0.15s",
  });
  const hov = {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "0.85"),
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "1"),
  };

  return (
    <div style={{
      marginTop: 36, padding: "14px 16px",
      background: "#F8F9FC", border: "1.5px solid rgba(13,27,76,0.08)",
      borderRadius: 14,
      display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
    }}>
      <div style={{ flex: "1 1 auto", minWidth: 160 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1B4C" }}>
          🔖 Сохраните, чтобы не потерять
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>
          Отправьте себе в мессенджер или соцсеть.
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {/* Telegram */}
        <button title="В Telegram" aria-label="Сохранить в Telegram"
          onClick={() => openShare((u, t) => `https://t.me/share/url?url=${u}&text=${t}`)}
          style={btn("#0088cc")} {...hov}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </button>

        {/* VK */}
        <button title="В VK" aria-label="Сохранить в VK"
          onClick={() => openShare((u, t) => `https://vk.com/share.php?url=${u}&title=${t}`)}
          style={btn("#0077FF")} {...hov}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c-7.18 0-11.39-4.967-11.567-13.224h3.61c.122 6.060 2.84 8.640 4.95 9.160V5.770h3.420v5.220c2.070-.224 4.250-2.620 4.984-5.220h3.40c-.55 3.190-2.92 5.585-4.60 6.570 1.68.799 4.38 2.890 5.41 6.654h-3.74c-.80-2.51-2.78-4.45-5.45-4.71v4.71h-.41z"/></svg>
        </button>

        {/* Facebook */}
        <button title="В Facebook" aria-label="Сохранить в Facebook"
          onClick={() => openShare((u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`)}
          style={btn("#1877f2")} {...hov}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </button>

        {/* Скопировать ссылку */}
        <button title={copied ? "Скопировано" : "Скопировать ссылку"} aria-label="Скопировать ссылку"
          onClick={copyLink}
          style={btn(copied ? "#059669" : "#475569")} {...hov}>
          {copied ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
