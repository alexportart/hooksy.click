import { ExternalLink, MessageCircleQuestion } from "lucide-react";
import { FB_GROUP_NAMES } from "@/lib/topics";

const GROUPS = Object.entries(FB_GROUP_NAMES).map(([url, name]) => ({ url, name }));

/**
 * Блок «Не нашли ответ? Спросите в группе» — ссылки на Facebook-сообщества,
 * где можно задать вопрос живому сообществу эмигрантов.
 */
export default function AskInGroups() {
  return (
    <section style={{
      background: "#fff", borderRadius: 18, overflow: "hidden",
      border: "1.5px solid rgba(39,174,96,0.18)", boxShadow: "0 1px 8px rgba(13,27,76,0.06)",
    }}>
      {/* Заголовок */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "16px 22px", background: "rgba(39,174,96,0.05)",
        borderBottom: "1.5px solid rgba(39,174,96,0.15)",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(39,174,96,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <MessageCircleQuestion size={15} color="#27AE60" strokeWidth={1.75} />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.09em",
          textTransform: "uppercase", color: "#1a7a3e",
        }}>
          Не нашли ответ? Спросите в группе
        </span>
      </div>

      {/* Тело */}
      <div style={{ padding: "18px 22px" }}>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 16px" }}>
          Если по вашему вопросу не нашлось точного ответа — задайте его напрямую в одной из
          Facebook-групп ниже. Там живое сообщество эмигрантов, и, как правило, отвечают быстро.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {GROUPS.map(g => (
            <a
              key={g.url}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="aig-link"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10,
                background: "rgba(39,174,96,0.05)", border: "1.5px solid rgba(39,174,96,0.15)",
                color: "#1a7a3e", textDecoration: "none", fontSize: 13, fontWeight: 600,
                transition: "background 0.15s, border-color 0.15s",
              }}
            >
              <span>{g.name}</span>
              <ExternalLink size={12} strokeWidth={2} style={{ opacity: 0.45, flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .aig-link:hover { background:rgba(39,174,96,0.1) !important; border-color:rgba(39,174,96,0.3) !important; }
      `}</style>
    </section>
  );
}
