import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getArticle, getArticles } from "@/lib/articles";
import { Article } from "@/lib/types";
import Footer from "@/components/Footer";
import NewBadgeClient from "@/components/NewBadgeClient";
import SaveLinks from "@/components/SaveLinks";

function RelatedArticles({ current }: { current: Article }) {
  const related = getArticles()
    .filter(a => a.slug !== current.slug && a.category === current.category)
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div style={{ marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(13,27,76,0.1)" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0D1B4C", marginBottom: 16 }}>
        Читайте также
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {related.map(a => (
          <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", border: "1.5px solid rgba(13,27,76,0.1)",
              borderRadius: 12, padding: "14px 18px",
              transition: "border-color 0.15s",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0D1B4C", marginBottom: 4 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{a.readTime} мин чтения</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getArticles().map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

function renderMarkdown(md: string): string {
  return md
    // Убираем строки-разделители таблиц вида |-----|-----|
    .replace(/^\s*\|[\s:|-]+\|\s*$/gm, '')
    // Markdown-ссылки [текст](url) → <a> (до остальных правил)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer sponsored" style="color:#2E5CAA;font-weight:600;text-decoration:underline">$1</a>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.05rem;font-weight:700;color:#0D1B4C;margin:24px 0 10px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.25rem;font-weight:700;color:#0D1B4C;margin:32px 0 12px">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0D1B4C;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#2D3748">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#EEF1F6;padding:2px 8px;border-radius:4px;font-size:0.9em;color:#2E5CAA;font-family:monospace">$1</code>')
    .replace(/^\| (.+) \|$/gm, (_, row) => {
      const cells = row.split(' | ').map((c: string) => `<td style="padding:8px 12px;border-bottom:1px solid rgba(13,27,76,0.08);color:#2D3748">${c}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, match => `<table style="width:100%;border-collapse:collapse;margin:16px 0;background:#fff;border-radius:10px;overflow:hidden;border:1.5px solid rgba(13,27,76,0.08)">${match}</table>`)
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;color:#2D3748">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/gs, match => `<ul style="padding-left:20px;margin:12px 0">${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:6px 0;color:#2D3748">$1</li>')
    .replace(/\n\n/g, '</p><p style="margin:14px 0;color:#2D3748;line-height:1.8">')
    .replace(/^(.+)$(?!\n)/, '<p style="margin:14px 0;color:#2D3748;line-height:1.8">$1</p>');
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const date = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F3F5F9" }}>
      <article style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: 32, fontSize: 13, color: "#6B7280" }}>
          <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Главная</Link>
          <span style={{ margin: "0 8px", color: "#CBD5E0" }}>·</span>
          <Link href="/articles" style={{ color: "#6B7280", textDecoration: "none" }}>Статьи</Link>
          <span style={{ margin: "0 8px", color: "#CBD5E0" }}>·</span>
          <span style={{ color: "#94A3B8" }}>{article.title}</span>
        </nav>

        {/* Карточка статьи */}
        <div style={{
          background: "#fff", borderRadius: 20,
          border: "1.5px solid rgba(13,27,76,0.1)",
          padding: "36px 40px",
          boxShadow: "0 2px 20px rgba(13,27,76,0.06)",
        }}>
          {/* Заголовок */}
          <h1 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.1rem)", fontWeight: 800,
            letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 14,
            color: "#0D1B4C", fontFamily: "'Rubik', sans-serif",
          }}>
            {article.title}
          </h1>

          {/* Описание */}
          <p style={{ fontSize: 16, color: "#2D3748", lineHeight: 1.65, marginBottom: 24, fontWeight: 500 }}>
            {article.description}
          </p>

          {/* Мета */}
          <div style={{
            display: "flex", gap: 16, fontSize: 13, color: "#6B7280",
            marginBottom: 36, paddingBottom: 28, alignItems: "center",
            borderBottom: "1px solid rgba(13,27,76,0.08)",
          }}>
            <NewBadgeClient publishedAt={article.publishedAt} />
            <span>{date}</span>
            <span style={{ color: "#CBD5E0" }}>·</span>
            <span>{article.readTime} мин чтения</span>
          </div>

          {/* Контент */}
          <div
            style={{ fontSize: 15, lineHeight: 1.8, color: "#2D3748" }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />

          {/* Сохранить себе */}
          <SaveLinks title={article.title} />

          {/* Related */}
          <RelatedArticles current={article} />

          {/* Back */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(13,27,76,0.08)" }}>
            <Link href="/articles" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 14, color: "#2E5CAA", textDecoration: "none", fontWeight: 600,
            }}>
              ← Все статьи
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
