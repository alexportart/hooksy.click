import { Metadata } from "next";
import Link from "next/link";
import { HANDBOOK_CATEGORIES } from "@/lib/handbook";
import Footer from "@/components/Footer";
import AskInGroups from "@/components/AskInGroups";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Справочник эмигранта в Сербии",
  description: "Пошаговый справочник для эмигрантов в Сербии: ВНЖ, ПМЖ, бизнес и ИП, банки, авто, медицина, документы и быт.",
};

export default function TopicsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800,
            letterSpacing: "-0.02em", marginBottom: 12, color: "#0D1B4C",
          }}>
            Справочник эмигранта
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)" }}>
            Всё о жизни в Сербии по шагам — выберите раздел
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {HANDBOOK_CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/topics/${cat.slug}`} style={{ textDecoration: "none" }}>
              <div className="cat-card" style={{
                background: "#fff", border: "1.5px solid rgba(13,27,76,0.1)",
                borderRadius: 16, padding: "22px 22px",
                display: "flex", flexDirection: "column", gap: 10, height: "100%",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", color: "#2E5CAA" }}>{Icons[cat.emoji] || cat.emoji}</span>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0D1B4C", margin: 0 }}>
                    {cat.title}
                  </h2>
                </div>
                <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.55, margin: 0, flex: 1 }}>
                  {cat.description}
                </p>
                <span style={{ fontSize: 12, color: "#2E5CAA", fontWeight: 600 }}>
                  {cat.count} тем →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <AskInGroups />
        </div>
      </div>
      <Footer />
      <style>{`
        .cat-card:hover { border-color:#2E5CAA !important; transform:translateY(-2px); box-shadow:0 6px 20px rgba(46,92,170,0.12); }
      `}</style>
    </div>
  );
}
