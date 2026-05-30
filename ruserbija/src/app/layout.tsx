import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import PorosenokPeek from "@/components/PorosenokPeek";

const BASE_URL = "https://svalil.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Svalil.com — портал для эмигрантов в Сербии",
    template: "%s | Svalil.com",
  },
  description:
    "Всё для эмигранта в Сербии: AI-анализ Facebook-групп, статьи, пошаговые гайды. Жильё, банки, ВНЖ, USDT, стоимость жизни — мгновенные ответы.",
  keywords: [
    "Сербия", "эмигранты", "ВНЖ", "жильё", "банк", "USDT", "ПМЖ",
    "русские в Сербии", "переезд в Сербию", "Svalil", "портал эмигрантов",
  ],
  authors: [{ name: "Svalil.com", url: BASE_URL }],
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Svalil.com — портал для эмигрантов в Сербии",
    description:
      "Всё для эмигранта в Сербии: жильё, банки, ВНЖ, обмен USDT, расходы. AI-анализ реальных обсуждений + статьи и гайды.",
    type: "website",
    locale: "ru_RS",
    siteName: "Svalil.com",
    url: BASE_URL,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Svalil.com — портал для эмигрантов в Сербии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Svalil.com — портал для эмигрантов в Сербии",
    description:
      "Всё для эмигранта в Сербии: жильё, банки, ВНЖ, обмен USDT, расходы. AI-анализ реальных обсуждений + статьи и гайды.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full">
        <Header />
        {children}
        <PorosenokPeek />
        {/* JSON-LD Schema.org для организации */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Svalil.com",
              url: BASE_URL,
              description:
                "Портал для эмигрантов в Сербии: справочник, статьи, гайды, AI-анализ Facebook-групп.",
              inLanguage: "ru",
              image: `${BASE_URL}/logo.png`,
            }),
          }}
        />
      </body>
    </html>
  );
}
