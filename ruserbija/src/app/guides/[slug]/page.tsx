import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getGuide, getGuides } from "@/lib/guides";
import { Guide } from "@/lib/types";
import Footer from "@/components/Footer";

function RelatedGuides({ current }: { current: Guide }) {
  const related = getGuides()
    .filter(g => g.slug !== current.slug && g.category === current.category)
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div style={{ marginTop: 48, paddingTop: 36, borderTop: "1px solid rgba(13,27,76,0.08)" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0D1B4C", marginBottom: 16 }}>
        Похожие гайды
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {related.map(g => (
          <Link key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#F3F5F9", border: "1.5px solid rgba(13,27,76,0.1)",
              borderRadius: 12, padding: "14px 18px", transition: "border-color 0.15s",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0D1B4C", marginBottom: 4 }}>{g.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{g.steps.length} шагов · {(g as any).timeRequired ?? (g as any).estimatedTime}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getGuides().map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: { title: guide.title, description: guide.description },
  };
}

const DIFFICULTY_LABELS = { easy: "Легко", medium: "Средне", hard: "Сложно" };
const DIFFICULTY_COLORS = {
  easy:   { bg: "rgba(39,174,96,0.08)",  border: "rgba(39,174,96,0.22)",  text: "#27AE60" },
  medium: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.22)", text: "#D97706" },
  hard:   { bg: "rgba(229,57,53,0.08)",  border: "rgba(229,57,53,0.22)",  text: "#E53935" },
};

function renderStepContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0D1B4C;font-weight:700">$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;color:#2D3748">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/gs, match => `<ul style="padding-left:20px;margin:10px 0">${match}</ul>`)
    .replace(/\n/g, '<br/>');
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const diff = DIFFICULTY_COLORS[guide.difficulty];

  return (
    <div style={{ minHeight: "100vh", background: "#F3F5F9" }}>
      <article style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: 32, fontSize: 13, color: "#6B7280" }}>
          <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Главная</Link>
          <span style={{ margin: "0 8px", color: "#CBD5E0" }}>·</span>
          <Link href="/guides" style={{ color: "#6B7280", textDecoration: "none" }}>Гайды</Link>
          <span style={{ margin: "0 8px", color: "#CBD5E0" }}>·</span>
          <span style={{ color: "#94A3B8" }}>{guide.title}</span>
        </nav>

        {/* Карточка гайда */}
        <div style={{
          background: "#fff", borderRadius: 20,
          border: "1.5px solid rgba(13,27,76,0.1)",
          padding: "36px 40px",
          boxShadow: "0 2px 20px rgba(13,27,76,0.06)",
        }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
              background: diff.bg, border: `1.5px solid ${diff.border}`, color: diff.text,
            }}>
              {DIFFICULTY_LABELS[guide.difficulty]}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
              background: "#F3F5F9", border: "1.5px solid rgba(13,27,76,0.12)", color: "#4A5568",
            }}>
              {guide.timeRequired}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
              background: "rgba(46,92,170,0.08)", border: "1.5px solid rgba(46,92,170,0.2)", color: "#2E5CAA",
            }}>
              {guide.steps.length} шагов
            </span>
          </div>

          {/* Заголовок */}
          <h1 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.1rem)", fontWeight: 800,
            letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 14,
            color: "#0D1B4C", fontFamily: "'Rubik', sans-serif",
          }}>
            {guide.title}
          </h1>

          {/* Описание */}
          <p style={{
            fontSize: 16, color: "#2D3748", lineHeight: 1.65,
            marginBottom: 32, paddingBottom: 28,
            borderBottom: "1px solid rgba(13,27,76,0.08)",
            fontWeight: 500,
          }}>
            {guide.description}
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {guide.steps.map((step, i) => (
              <div key={i} style={{
                background: "#F8F9FC", border: "1.5px solid rgba(13,27,76,0.08)",
                borderRadius: 14, padding: "22px", display: "flex", gap: 18,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(46,92,170,0.1)", border: "1.5px solid rgba(46,92,170,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: "#2E5CAA",
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0D1B4C", marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <div
                    style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.75 }}
                    dangerouslySetInnerHTML={{ __html: renderStepContent(step.content ?? step.description ?? "") }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Related */}
          <RelatedGuides current={guide} />

          {/* Back */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(13,27,76,0.08)" }}>
            <Link href="/guides" style={{ fontSize: 14, color: "#2E5CAA", textDecoration: "none", fontWeight: 600 }}>
              ← Все гайды
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
