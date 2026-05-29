"use client";

import Link from "next/link";
import {
  Home, Landmark, Wallet, FileText, HeartPulse,
  Car, Briefcase, GraduationCap, Bus, ReceiptText, Languages,
  Smartphone, PackageOpen, Monitor, PawPrint, Stamp,
  UtensilsCrossed, Globe, Pin, LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  housing: Home, banks: Landmark, cost_of_living: Wallet,
  vnj: FileText, healthcare: HeartPulse, auto: Car, business: Briefcase,
  education: GraduationCap, transport: Bus, taxes: ReceiptText, language: Languages,
  sim: Smartphone, moving: PackageOpen, coworking: Monitor, pets: PawPrint,
  notary: Stamp, food: UtensilsCrossed, remote_work: Globe,
};

export default function TopicGrid({ topics }: { topics: { id: string; label: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
      {topics.map(topic => {
        const Icon = ICON_MAP[topic.id] ?? Pin;
        return (
          <Link key={topic.id} href={`/topics/${topic.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "18px 20px",
              display: "flex", gap: 14, alignItems: "center",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: "rgba(13,27,76,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={16} strokeWidth={1.75} color="#6B7280" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{topic.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
