"use client";

import Link from "next/link";
import { NODES, NodeType, RoadmapLink } from "@/lib/roadmap";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const CW = 1480, CH = 600;
const FORK_X = 562; // vertical bar x

// Lane center Y-values (all cards in a lane share this center)
const VY = 96;   // visa-run
const MY = 340;  // main VNZh
const AY = 532;  // already VNZh

// Node layout [left, top, width, height]
// top = laneCenter - height/2  →  guarantees horizontal alignment within lane
const L: Record<string, [number, number, number, number]> = {
  start:          [20,   MY - 42,  140, 84],
  prep:           [172,  MY - 98,  196, 196],
  entry:          [392,  MY - 54,  152, 108],
  visarun:        [578,  VY - 66,  160, 132],
  visarun_return: [778,  VY - 42,  160, 84],
  visarun_risk:   [978,  VY - 74,  164, 148],
  vnzhbases:      [578,  MY - 130, 300, 260],
  vnzh_obtained:  [918,  MY - 68,  160, 136],
  pmzh:           [1118, MY - 54,  150, 108],
  citizenship:    [1308, MY - 53,  150, 106],
  already_vnzh:   [578,  AY - 42,  160, 84],
};

// Preparation checklist items (shown inside the "prep" card)
const PREP_STEPS = [
  "Сбор информации",
  "Документы",
  "Авиабилеты",
  "Багаж",
];

// helpers
const rx = (id: string) => L[id][0] + L[id][2]; // right edge
const lcY = (id: string) => L[id][1] + L[id][3] / 2; // center Y

// ── Types ─────────────────────────────────────────────────────────────────────
const TSTYLE: Record<NodeType, { border: string; bg: string; dot: string }> = {
  start:    { border: "#2E5CAA", bg: "rgba(46,92,170,0.07)",   dot: "#2E5CAA" },
  decision: { border: "#7C3AED", bg: "rgba(124,58,237,0.07)", dot: "#7C3AED" },
  action:   { border: "#0EA5E9", bg: "rgba(14,165,233,0.07)", dot: "#0EA5E9" },
  status:   { border: "#059669", bg: "rgba(5,150,105,0.07)",  dot: "#059669" },
  warning:  { border: "#D97706", bg: "rgba(217,119,6,0.08)",  dot: "#D97706" },
  end:      { border: "#2E5CAA", bg: "rgba(46,92,170,0.09)",  dot: "#2E5CAA" },
};
const KC: Record<string, string> = {
  guide: "#7C3AED", article: "#0EA5E9", topic: "#059669",
};

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ id, w, h }: { id: string; w: number; h: number }) {
  const node = NODES[id];
  const s = TSTYLE[node.type];
  return (
    <div style={{
      width: w, height: h, boxSizing: "border-box",
      border: `1.5px solid ${s.border}`, background: s.bg,
      borderRadius: 10, padding: "7px 9px",
      display: "flex", flexDirection: "column", gap: 3,
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 5, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0, marginTop: 3 }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: "#1A202C", lineHeight: 1.25, wordBreak: "break-word", overflowWrap: "anywhere" }}>
          {node.title}
        </span>
      </div>
      {node.subtitle && (
        <div style={{ fontSize: 10, color: "#5A6A7E", lineHeight: 1.3, paddingLeft: 12, wordBreak: "break-word", overflowWrap: "anywhere" }}>
          {node.subtitle}
        </div>
      )}
      {node.note && (
        <div style={{
          fontSize: 9.5, color: "#92400E",
          background: "rgba(217,119,6,0.1)", borderRadius: 5, padding: "2px 6px",
          lineHeight: 1.3, wordBreak: "break-word", overflowWrap: "anywhere",
        }}>
          {node.note}
        </div>
      )}
      {node.links && node.links.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 12 }}>
          {node.links.map((l: RoadmapLink) => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 9.5, fontWeight: 600, lineHeight: 1.3,
              color: KC[l.kind] ?? "#2E5CAA",
              background: `${KC[l.kind] ?? "#2E5CAA"}15`,
              border: `1px solid ${KC[l.kind] ?? "#2E5CAA"}30`,
              borderRadius: 4, padding: "1px 5px", textDecoration: "none",
              wordBreak: "break-word", overflowWrap: "anywhere",
              display: "inline-block",
            }}>
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Prep checklist card ───────────────────────────────────────────────────────
function PrepCard({ w, h }: { w: number; h: number }) {
  const node = NODES.prep;
  const c = "#0EA5E9";
  return (
    <div style={{
      width: w, height: h, boxSizing: "border-box",
      border: `1.5px solid ${c}`, background: "rgba(14,165,233,0.06)",
      borderRadius: 10, padding: "7px 9px",
      display: "flex", flexDirection: "column", gap: 4, overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: "#1A202C" }}>{node.title}</span>
        <span style={{ fontSize: 10, color: "#5A6A7E" }}>· {node.subtitle}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingLeft: 2 }}>
        {PREP_STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
              background: `${c}18`, border: `1px solid ${c}40`, color: c,
              fontSize: 8.5, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{i + 1}</span>
            <span style={{ fontSize: 10.5, color: "#374151", fontWeight: 500 }}>{step}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: "auto" }}>
        {node.links?.map((l: RoadmapLink) => (
          <Link key={l.href} href={l.href} style={{
            fontSize: 9, fontWeight: 600,
            color: KC[l.kind] ?? c, background: `${KC[l.kind] ?? c}15`,
            border: `1px solid ${KC[l.kind] ?? c}30`,
            borderRadius: 4, padding: "1px 5px", textDecoration: "none",
            lineHeight: 1.3, overflowWrap: "anywhere",
          }}>
            {l.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── VNZh bases (large multi-cell card) ───────────────────────────────────────
const VNZ_BASES = [
  { actionId: "ip",     label: "ИП",        color: "#7C3AED" },
  { actionId: "doo",    label: "ООО",       color: "#0EA5E9" },
  { actionId: "work",   label: "Работа",    color: "#059669" },
  { actionId: "realty", label: "Недвижим.", color: "#D97706" },
  { actionId: "family", label: "Семья",     color: "#E53935" },
  { actionId: "study",  label: "Учёба",     color: "#2E5CAA" },
];

function VnzhBases({ w, h }: { w: number; h: number }) {
  return (
    <div style={{
      width: w, height: h, boxSizing: "border-box",
      border: "1.5px solid rgba(124,58,237,0.3)",
      background: "rgba(124,58,237,0.04)",
      borderRadius: 10, padding: "7px 9px",
      display: "flex", flexDirection: "column", gap: 5,
      overflow: "hidden",
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#7C3AED", letterSpacing: "0.04em", flexShrink: 0 }}>
        ВНЖ — выберите основание
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, flex: 1, minHeight: 0 }}>
        {VNZ_BASES.map(b => {
          const action = NODES[b.actionId];
          const status = NODES[b.actionId + "_vnzh"];
          const links = [...(action.links ?? []), ...(status?.links ?? [])].slice(0, 2);
          return (
            <div key={b.actionId} style={{
              background: "#fff", border: `1px solid ${b.color}25`,
              borderRadius: 6, padding: "4px 6px",
              display: "flex", flexDirection: "column", gap: 2, overflow: "hidden",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#1A202C", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {b.label}
                </span>
              </div>
              {links.map((l: RoadmapLink) => (
                <Link key={l.href} href={l.href} style={{
                  fontSize: 9, fontWeight: 600, color: b.color,
                  background: `${b.color}12`, border: `1px solid ${b.color}25`,
                  borderRadius: 3, padding: "1px 4px", textDecoration: "none",
                  display: "block", marginLeft: 9, lineHeight: 1.3,
                  wordBreak: "break-word", overflowWrap: "anywhere",
                }}>
                  {l.label} →
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Lane label pill ───────────────────────────────────────────────────────────
function LanePill({ text, color, x, y }: { text: string; color: string; x: number; y: number }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      color, background: `${color}12`, border: `1px solid ${color}30`,
      borderRadius: 99, padding: "2px 8px", whiteSpace: "nowrap",
    }}>
      {text}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function RoadmapTree() {
  const sGrey   = "rgba(100,116,139,0.55)";
  const sOrange = "rgba(217,119,6,0.7)";
  const sPurple = "rgba(124,58,237,0.7)";
  const sGreen  = "rgba(5,150,105,0.7)";

  // Marker defs for arrowheads
  const markers: [string, string][] = [
    ["am-grey",   sGrey],
    ["am-orange", sOrange],
    ["am-purple", sPurple],
    ["am-green",  sGreen],
  ];

  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as never }}>
      <div style={{ position: "relative", width: CW, height: CH }}>

        {/* ── SVG connectors ── */}
        <svg width={CW} height={CH}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
          <defs>
            {markers.map(([id, fill]) => (
              <marker key={id} id={id} markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <polygon points="0 0, 7 2.5, 0 5" fill={fill} />
              </marker>
            ))}
          </defs>

          {/* Russia → Подготовка */}
          <line x1={rx("start")} y1={MY} x2={L.prep[0]} y2={MY}
            stroke={sGrey} strokeWidth="1.5" markerEnd="url(#am-grey)" />

          {/* Подготовка → Въезд */}
          <line x1={rx("prep")} y1={MY} x2={L.entry[0]} y2={MY}
            stroke={sGrey} strokeWidth="1.5" markerEnd="url(#am-grey)" />

          {/* Entry → fork */}
          <line x1={rx("entry")} y1={MY} x2={FORK_X} y2={MY}
            stroke={sGrey} strokeWidth="1.5" />

          {/* Fork vertical bar */}
          <line x1={FORK_X} y1={VY} x2={FORK_X} y2={AY}
            stroke="rgba(100,116,139,0.35)" strokeWidth="1.5" />

          {/* Fork → visa-run */}
          <line x1={FORK_X} y1={VY} x2={L.visarun[0]} y2={VY}
            stroke={sOrange} strokeWidth="1.5" markerEnd="url(#am-orange)" />

          {/* Fork → VNZh bases */}
          <line x1={FORK_X} y1={MY} x2={L.vnzhbases[0]} y2={MY}
            stroke={sPurple} strokeWidth="1.5" markerEnd="url(#am-purple)" />

          {/* Fork → already VNZh */}
          <line x1={FORK_X} y1={AY} x2={L.already_vnzh[0]} y2={AY}
            stroke={sGreen} strokeWidth="1.5" markerEnd="url(#am-green)" />

          {/* Visa-run chain */}
          <line x1={rx("visarun")} y1={VY} x2={L.visarun_return[0]} y2={VY}
            stroke={sOrange} strokeWidth="1.5" markerEnd="url(#am-orange)" />
          <line x1={rx("visarun_return")} y1={VY} x2={L.visarun_risk[0]} y2={VY}
            stroke={sOrange} strokeWidth="1.5" markerEnd="url(#am-orange)" />

          {/* VNZh chain */}
          <line x1={rx("vnzhbases")} y1={MY} x2={L.vnzh_obtained[0]} y2={MY}
            stroke={sPurple} strokeWidth="1.5" markerEnd="url(#am-purple)" />
          <line x1={rx("vnzh_obtained")} y1={MY} x2={L.pmzh[0]} y2={MY}
            stroke={sGreen} strokeWidth="1.5" markerEnd="url(#am-green)" />
          <line x1={rx("pmzh")} y1={MY} x2={L.citizenship[0]} y2={MY}
            stroke={sGrey} strokeWidth="1.5" markerEnd="url(#am-grey)" />
        </svg>

        {/* ── Node cards (absolute) ── */}
        {(["start", "entry", "visarun", "visarun_return", "visarun_risk",
           "vnzh_obtained", "pmzh", "citizenship", "already_vnzh"] as const).map(id => {
          const [x, y, w, h] = L[id];
          return (
            <div key={id} style={{ position: "absolute", left: x, top: y }}>
              <Card id={id} w={w} h={h} />
            </div>
          );
        })}

        {/* Подготовка */}
        <div style={{ position: "absolute", left: L.prep[0], top: L.prep[1] }}>
          <PrepCard w={L.prep[2]} h={L.prep[3]} />
        </div>

        {/* VNZh bases */}
        <div style={{ position: "absolute", left: L.vnzhbases[0], top: L.vnzhbases[1] }}>
          <VnzhBases w={L.vnzhbases[2]} h={L.vnzhbases[3]} />
        </div>

        {/* Italic note after "already VNZh" */}
        <div style={{
          position: "absolute",
          left: rx("already_vnzh") + 14,
          top: AY - 9,
          fontSize: 10, color: "#94A3B8", fontStyle: "italic", whiteSpace: "nowrap",
        }}>
          → тот же путь к ПМЖ и Гражданству
        </div>

        {/* Lane label pills */}
        <LanePill text="До 90 дней"    color="#D97706" x={FORK_X - 76} y={VY - 11} />
        <LanePill text="Уже есть ВНЖ"  color="#059669" x={FORK_X - 98} y={AY - 11} />

      </div>
    </div>
  );
}
