import { Metadata } from "next";
import { getGuides } from "@/lib/guides";
import Footer from "@/components/Footer";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Гайды",
  description: "Пошаговые инструкции для эмигрантов в Сербии: ВНЖ, открытие счёта в банке, переезд и многое другое.",
};

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <div style={{ minHeight: "100vh" }}>
      <GuidesClient guides={guides} />
      <Footer />
    </div>
  );
}
