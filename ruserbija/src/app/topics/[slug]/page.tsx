import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getCategory, HANDBOOK } from "@/lib/handbook";
import Footer from "@/components/Footer";
import AskInGroups from "@/components/AskInGroups";
import CategoryView from "./CategoryView";

export async function generateStaticParams() {
  return HANDBOOK.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: `${cat.title} — Справочник эмигранта в Сербии`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 28, fontSize: 13, color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Главная</Link>
          <span style={{ margin: "0 8px" }}>·</span>
          <Link href="/topics" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Справочник</Link>
          <span style={{ margin: "0 8px" }}>·</span>
          <span style={{ color: "var(--text-dim)" }}>{cat.title}</span>
        </nav>

        {/* Заголовок */}
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 44, lineHeight: 1 }}>{cat.emoji}</span>
          <div>
            <h1 style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800,
              letterSpacing: "-0.02em", color: "#0D1B4C", margin: 0,
            }}>
              {cat.title}
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>
              {cat.description}
            </p>
          </div>
        </div>

        {/* Подтемы */}
        <CategoryView entries={cat.entries} />

        {/* Спросить в группе */}
        <div style={{ marginTop: 28 }}>
          <AskInGroups />
        </div>

        {/* Назад */}
        <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
          <Link href="/topics" style={{ fontSize: 14, color: "#2E5CAA", textDecoration: "none", fontWeight: 600 }}>
            ← Все разделы справочника
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
