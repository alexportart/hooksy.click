import Footer from "@/components/Footer";
import RoadmapTree from "@/components/RoadmapTree/RoadmapTree";

export const metadata = {
  title: "Карта пути эмигранта в Сербию | Svalil.com",
  description:
    "Визуальная карта всех путей легализации в Сербии: виза-ран, ВНЖ по ИП, ООО, работе, браку, недвижимости, учёбе — и путь к ПМЖ и гражданству.",
};

export default function RoadmapPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HERO */}
      <section style={{
        textAlign: "center", padding: "64px 24px 40px",
        background: "linear-gradient(180deg,#FFFFFF 0%,#F3F5F9 100%)",
        borderBottom: "1px solid rgba(13,27,76,0.07)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(46,92,170,0.08)", border: "1.5px solid rgba(46,92,170,0.18)",
          borderRadius: 99, padding: "5px 16px", marginBottom: 20,
          fontSize: 12, color: "#2E5CAA", fontWeight: 600, letterSpacing: "0.04em",
        }}>
          🗺 Карта пути эмигранта
        </div>

        <h1 style={{
          fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800,
          color: "#0D1B4C", margin: "0 0 12px", lineHeight: 1.2,
        }}>
          Путь из России в Сербию
        </h1>

        <p style={{
          fontSize: "1rem", color: "#4A5568", maxWidth: 560, margin: "0 auto 32px",
          lineHeight: 1.7, fontWeight: 500,
        }}>
          Все варианты легализации: виза-ран, ВНЖ по разным основаниям, ПМЖ и гражданство.
          Кликайте по ссылкам внутри карточек, чтобы перейти к подробным гайдам.
        </p>
      </section>

      {/* MAP */}
      <section style={{ flex: 1, padding: "40px 24px 48px", background: "#F3F5F9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RoadmapTree />
        </div>
      </section>

      <Footer />
    </div>
  );
}
