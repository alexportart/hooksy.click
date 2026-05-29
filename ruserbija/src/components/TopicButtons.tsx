"use client";

import {
  Home, Landmark, ArrowLeftRight, Wallet, FileText, HeartPulse,
  Car, Briefcase, GraduationCap, Bus, ReceiptText, Languages,
  Smartphone, PackageOpen, Monitor, PawPrint, Stamp,
  UtensilsCrossed, Globe, LucideProps,
} from "lucide-react";
import { TopicId } from "@/lib/types";
import { TOPIC_LIST } from "@/lib/topics";

const ICONS: Record<string, React.FC<LucideProps>> = {
  Home, Landmark, ArrowLeftRight, Wallet, FileText, HeartPulse,
  Car, Briefcase, GraduationCap, Bus, ReceiptText, Languages,
  Smartphone, PackageOpen, Monitor, PawPrint, Stamp,
  UtensilsCrossed, Globe,
};

interface Props {
  onSelect: (topic: TopicId) => void;
  loading: boolean;
  selectedTopic?: TopicId;
}

const BTN_CSS = `
  .topic-btn { display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:14px 16px;border-radius:14px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:left;position:relative;overflow:hidden;font-family:'Rubik',sans-serif; }
  .topic-btn-idle { border:1.5px solid rgba(13,27,76,0.1);background:#fff;color:#4A5568; }
  .topic-btn-idle:hover { border-color:#2E5CAA;color:#0D1B4C;box-shadow:0 4px 12px rgba(46,92,170,0.1); }
  .topic-btn-active { border:1.5px solid #2E5CAA;background:rgba(46,92,170,0.08);color:#0D1B4C;box-shadow:0 4px 16px rgba(46,92,170,0.15); }
`;

export default function TopicButtons({ onSelect, loading, selectedTopic }: Props) {
  return (
    <div style={{
      maxWidth: 860, margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
      gap: 10,
    }}>
      <style>{BTN_CSS}</style>

      {TOPIC_LIST.map((topic) => {
        const active = selectedTopic === topic.id;
        const Icon = ICONS[topic.emoji];

        return (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            disabled={loading}
            className={`topic-btn ${active ? "topic-btn-active" : "topic-btn-idle"}`}
            style={{ opacity: loading && !active ? 0.45 : 1 }}
          >
            {/* Иконка */}
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: active ? "rgba(46,92,170,0.15)" : "rgba(13,27,76,0.05)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {Icon && (
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  color={active ? "#2E5CAA" : "#6B7280"}
                />
              )}
            </div>

            {/* Название */}
            <span style={{ lineHeight: 1.3 }}>{topic.label}</span>

            {/* Индикатор загрузки */}
            {active && loading && (
              <span style={{
                position: "absolute", top: 10, right: 10,
                width: 6, height: 6, borderRadius: "50%",
                background: "#2E5CAA",
                animation: "pulse-dot 1s infinite",
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
