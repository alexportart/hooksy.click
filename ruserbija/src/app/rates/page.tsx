import { Metadata } from "next";
import Footer from "@/components/Footer";
import ExchangeRates from "@/components/ExchangeRates";

export const metadata: Metadata = {
  title: "Курсы валют",
  description: "Актуальные курсы валют в Сербии: USD, EUR, RUB к динару (RSD). Калькулятор обмена и ссылки на обменники.",
};

export default function RatesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <section style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", marginBottom: 8 }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0D1B4C", marginBottom: 6 }}>
            Курсы валют в Сербии
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, maxWidth: 560 }}>
            Актуальные курсы доллара, евро и рубля к сербскому динару (RSD). Нажмите на курс,
            чтобы подставить его в калькулятор обмена.
          </p>
        </div>
      </section>

      <section style={{ padding: "16px 0 0" }}>
        <ExchangeRates />
      </section>

      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}
