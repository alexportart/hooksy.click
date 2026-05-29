import Link from "next/link";
import { HANDBOOK_CATEGORIES } from "@/lib/handbook";
import Footer from "@/components/Footer";

const PAGE_STYLES = `
  .cat-card { background:#fff;border:1.5px solid rgba(13,27,76,0.1);border-radius:16px;padding:20px;cursor:pointer;transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s;display:flex;flex-direction:column;gap:8px;height:100%;text-decoration:none; }
  .cat-card:hover { border-color:#2E5CAA;transform:translateY(-2px);box-shadow:0 6px 20px rgba(46,92,170,0.12); }
  .article-card { background:#fff;border:1.5px solid rgba(13,27,76,0.08);border-radius:16px;padding:20px 22px;transition:border-color 0.2s,box-shadow 0.2s;height:100%; }
  .article-card:hover { border-color:#2E5CAA;box-shadow:0 4px 16px rgba(46,92,170,0.1); }
  .guide-card { background:#fff;border:1.5px solid rgba(13,27,76,0.08);border-radius:16px;overflow:hidden;transition:border-color 0.2s,box-shadow 0.2s; }
  .guide-card:hover { border-color:rgba(46,92,170,0.35);box-shadow:0 4px 16px rgba(46,92,170,0.1); }
  .see-all-link { display:inline-flex;align-items:center;gap:4px;font-size:13px;color:#2E5CAA;text-decoration:none;font-weight:600;padding:6px 14px;border-radius:8px;border:1.5px solid rgba(46,92,170,0.2);background:rgba(46,92,170,0.04);transition:background 0.15s,border-color 0.15s; }
  .see-all-link:hover { background:rgba(46,92,170,0.09);border-color:rgba(46,92,170,0.4); }
  .sec-label { display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#2E5CAA;background:rgba(46,92,170,0.07);border:1.5px solid rgba(46,92,170,0.15);border-radius:99px;padding:4px 12px;margin-bottom:12px; }
`;

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{PAGE_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        textAlign: "center", padding: "80px 24px 64px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F3F5F9 100%)",
        borderBottom: "1px solid rgba(13,27,76,0.07)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(46,92,170,0.08)", border: "1.5px solid rgba(46,92,170,0.18)",
          borderRadius: 99, padding: "6px 16px", marginBottom: 28,
          fontSize: 12, color: "#2E5CAA", fontWeight: 600, letterSpacing: "0.04em",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#E53935", animation: "pulse-dot 2s infinite", display: "inline-block",
          }} />
          Портал для эмигрантов · Сербия 🇷🇸
        </div>

        <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
          <img
            src="/logo.png"
            alt="Svalil.com — портал для эмигрантов в Сербии"
            style={{ height: "clamp(80px, 14vw, 130px)", width: "auto" }}
          />
        </div>

        <p style={{
          fontSize: "1.05rem", color: "#2D3748",
          maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 500,
        }}>
          Пошаговый справочник эмигранта в Сербии: ВНЖ и ПМЖ, бизнес и ИП, банки, авто,
          медицина, документы и быт — на основе реального опыта.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 48 }}>
          <span style={{ width: 32, height: 4, borderRadius: 2, background: "#0D1B4C" }} />
          <span style={{ width: 32, height: 4, borderRadius: 2, background: "#2E5CAA" }} />
          <span style={{ width: 32, height: 4, borderRadius: 2, background: "#E53935" }} />
        </div>
      </section>

      {/* ── СПРАВОЧНИК ───────────────────────────────────────── */}
      <section style={{ padding: "52px 24px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <div className="sec-label">📖 Справочник</div>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0D1B4C", lineHeight: 1.25 }}>
              Всё о жизни в Сербии по шагам
            </h2>
            <p style={{ fontSize: 13.5, color: "#6B7280", marginTop: 5, lineHeight: 1.5 }}>
              Выберите раздел — внутри пошаговые инструкции и ответы на частые вопросы
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {HANDBOOK_CATEGORIES.map(cat => (
              <Link key={cat.slug} href={`/topics/${cat.slug}`} className="cat-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{cat.emoji}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0D1B4C", margin: 0 }}>{cat.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55, margin: 0, flex: 1 }}>
                  {cat.description}
                </p>
                <span style={{ fontSize: 12, color: "#2E5CAA", fontWeight: 600 }}>{cat.count} тем →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ArticlesPreview />
      <GuidesPreview />
      <Footer />
    </div>
  );
}

const CAT_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  "Жильё":   { color:"#7C3AED", bg:"rgba(124,58,237,0.07)", border:"rgba(124,58,237,0.18)" },
  "Банки":   { color:"#2E5CAA", bg:"rgba(46,92,170,0.07)",  border:"rgba(46,92,170,0.18)"  },
  "Расходы": { color:"#D97706", bg:"rgba(217,119,6,0.07)",  border:"rgba(217,119,6,0.18)"  },
  "ВНЖ":     { color:"#059669", bg:"rgba(5,150,105,0.07)",  border:"rgba(5,150,105,0.18)"  },
};
const catStyle = (c: string) => CAT_COLORS[c] ?? { color:"#2E5CAA", bg:"rgba(46,92,170,0.07)", border:"rgba(46,92,170,0.18)" };

function ArticlesPreview() {
  const articles = [
    { slug: "kak-snyat-kvartiru-v-belgrade",  title: "Как снять квартиру в Белграде",     desc: "Районы, цены, что проверить в договоре", category: "Жильё",  time: 8 },
    { slug: "banki-serbii-dlya-emigrantov",    title: "Банки Сербии для эмигрантов",       desc: "Где открыть счёт, какие документы нужны", category: "Банки",  time: 7 },
    { slug: "stoimost-zhizni-v-serbii",        title: "Стоимость жизни в Сербии 2026",     desc: "Реальные цифры эмигрантов",               category: "Расходы",time: 6 },
  ];

  return (
    <section style={{ padding: "52px 24px 0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
          <div>
            <div className="sec-label" style={{ color:"#7C3AED", background:"rgba(124,58,237,0.07)", border:"1.5px solid rgba(124,58,237,0.15)" }}>📰 Статьи</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0D1B4C", lineHeight: 1.25 }}>Полезные статьи</h2>
          </div>
          <Link href="/articles" className="see-all-link">Все статьи →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
          {articles.map(a => {
            const cs = catStyle(a.category);
            return (
              <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none", display: "flex" }}>
                <div className="article-card" style={{ display:"flex", flexDirection:"column", width:"100%" }}>
                  <div style={{ height: 4, borderRadius: "4px 4px 0 0", background: cs.color, margin: "-20px -22px 16px", opacity: 0.7 }} />
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, color: cs.color,
                    background: cs.bg, border: `1.5px solid ${cs.border}`,
                    padding: "3px 10px", borderRadius: 99, marginBottom: 12,
                    display: "inline-block", letterSpacing: "0.05em", textTransform: "uppercase",
                    alignSelf: "flex-start",
                  }}>{a.category}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0D1B4C", marginBottom: 8, lineHeight: 1.45, flex: 1 }}>
                    {a.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 14, lineHeight: 1.6 }}>{a.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
                    <span style={{ fontSize: 11.5, color: "#94A3B8" }}>📖 {a.time} мин чтения</span>
                    <span style={{ fontSize: 12, color: cs.color, fontWeight: 600 }}>Читать →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GuidesPreview() {
  const guides = [
    { slug: "kak-poluchit-vnzh-v-serbii",    title: "Как получить ВНЖ в Сербии",      steps: 6, diff: "Средне", time: "1–3 месяца", icon: "📋" },
    { slug: "otkrytie-scheta-v-banke-serbii", title: "Открыть счёт в банке Сербии",    steps: 7, diff: "Легко",  time: "1–5 дней",   icon: "🏦" },
    { slug: "pereezd-v-serbii",               title: "Переезд в Сербию: первые шаги",  steps: 6, diff: "Средне", time: "2–4 недели",  icon: "✈️" },
    { slug: "registraciya-ip-v-serbii",       title: "Регистрация ИП в Сербии",        steps: 6, diff: "Средне", time: "3–7 дней",    icon: "💼" },
  ];

  const diffCfg = (d: string) => d === "Легко"
    ? { color:"#059669", bg:"rgba(5,150,105,0.08)", border:"rgba(5,150,105,0.2)" }
    : { color:"#D97706", bg:"rgba(217,119,6,0.08)", border:"rgba(217,119,6,0.2)" };

  return (
    <section style={{ padding: "52px 24px 72px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
          <div>
            <div className="sec-label" style={{ color:"#E53935", background:"rgba(229,57,53,0.07)", border:"1.5px solid rgba(229,57,53,0.15)" }}>📖 Гайды</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0D1B4C", lineHeight: 1.25 }}>Пошаговые инструкции</h2>
          </div>
          <Link href="/guides" className="see-all-link">Все гайды →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {guides.map(g => {
            const dc = diffCfg(g.diff);
            return (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: "none" }}>
                <div className="guide-card">
                  <div style={{
                    background: "linear-gradient(135deg, #0D1B4C 0%, #2E5CAA 100%)",
                    padding: "18px 20px 14px",
                  }}>
                    <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 10 }}>{g.icon}</div>
                    <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: 0 }}>
                      {g.title}
                    </h3>
                  </div>
                  <div style={{ padding: "14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap: 8 }}>
                    <div style={{ display:"flex", gap: 6 }}>
                      <span style={{
                        fontSize: 10.5, fontWeight: 700, color: dc.color,
                        background: dc.bg, border: `1.5px solid ${dc.border}`,
                        padding: "2px 8px", borderRadius: 99,
                      }}>{g.diff}</span>
                      <span style={{
                        fontSize: 10.5, color: "#6B7280",
                        background: "#F3F5F9", border: "1px solid rgba(13,27,76,0.1)",
                        padding: "2px 8px", borderRadius: 99,
                      }}>{g.time}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#94A3B8", whiteSpace:"nowrap" }}>{g.steps} шагов</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
