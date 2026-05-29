import { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import Footer from "@/components/Footer";
import ArticlesClient from "./ArticlesClient";

export const metadata: Metadata = {
  title: "Статьи",
  description: "Полезные статьи для русскоязычных эмигрантов в Сербии: жильё, банки, ВНЖ, медицина и другие темы.",
};

export default function ArticlesPage() {
  const articles = getArticles();
  return (
    <div style={{ minHeight: "100vh" }}>
      <ArticlesClient articles={articles} />
      <Footer />
    </div>
  );
}
