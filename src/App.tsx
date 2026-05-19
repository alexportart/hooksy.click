import { useState } from "react";
import { Logo } from "./components/Logo";
import { LangSwitch } from "./components/LangSwitch";
import { SocialIcon } from "./components/SocialIcon";
import { ViralScore } from "./components/ViralScore";
import { ShareSheet } from "./components/ShareSheet";
import { Sparkle } from "./components/Doodles";
import { PLATFORMS, type PlatformId } from "./config/platforms";
import { FOLLOW_LINKS } from "./config/follow";
import { t, platformLabel, type Lang } from "./i18n";

export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const [platformId, setPlatformId] = useState<PlatformId>("twitter");
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState("");
  const [viralScore, setViralScore] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [modelUsed, setModelUsed] = useState("");
  const [useEmojis, setUseEmojis] = useState(false);

  const copy = t(lang);

  const heroImages: Record<Lang, string> = {
    ru: "/images/ru.png",
    en: "/images/en.png",
    es: "/images/es.png",
  };
  const platform = PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];
  const charCount = generated.length;

  const handleCopy = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setViralScore(null);
    setModelUsed("");

    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          lang,
          platform: platform.id,
          max_chars: platform.maxChars,
          use_emojis: useEmojis,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setGenerated(data.error || copy.genError);
      } else {
        let text = data.text || "";
        if (data.hashtags_string) text += `\n\n${data.hashtags_string}`;
        setGenerated(text);
        if (data.virality?.score) {
          setViralScore(Math.min(99, Math.max(1, data.virality.score)));
        }
        if (data.model) {
          setModelUsed(data.model);
        }
      }
    } catch {
      setGenerated(copy.serverError);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-hooksy-lavender/40 to-white">
      <header className="border-b-2 border-hooksy-lavender bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <LangSwitch lang={lang} onChange={setLang} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-4 sm:px-8 space-y-4">

        {/* Hero block — with border frame */}
        <section className="rounded-2xl border-2 border-hooksy-purple/30 bg-gradient-to-b from-white to-hooksy-lavender/30 p-4 text-center shadow-lg shadow-hooksy-purple/5 sm:p-5">
          <img
            src={heroImages[lang]}
            alt=""
            className="mx-auto mb-3 w-full max-w-md object-contain drop-shadow-soft sm:max-w-lg"
            width={480}
            height={220}
            loading="eager"
            decoding="async"
          />
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {copy.heroTitle}{" "}
            <span className="gradient-text">{copy.heroAccent}</span>
          </h1>
          <p className="mt-1 text-sm text-hooksy-navy/70 sm:text-base">{copy.heroSub}</p>
        </section>

        {/* Generator block */}
        <section
          id="generator"
          className="rounded-2xl border-2 border-hooksy-purple/30 bg-white p-4 shadow-lg shadow-hooksy-purple/10 sm:p-6"
        >
          <label className="block text-sm font-bold text-hooksy-navy/80">{copy.platform}</label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatformId(p.id)}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold transition sm:gap-1.5 sm:px-2.5 ${
                  platformId === p.id
                    ? "bg-hooksy-purple text-white shadow-soft"
                    : "bg-hooksy-lavender/60 text-hooksy-navy/70 hover:bg-hooksy-lavender"
                }`}
              >
                <SocialIcon id={p.id} size={14} />
                <span>{platformLabel(lang, p.id)}</span>
              </button>
            ))}
          </div>

          <label className="mt-3 block text-sm font-bold text-hooksy-navy/80">{copy.topic}</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={copy.topicPlaceholder}
            rows={2}
            className="mt-1.5 w-full resize-none rounded-xl border-2 border-hooksy-lavender bg-hooksy-lavender/30 px-3 py-2 text-sm font-medium outline-none transition placeholder:text-hooksy-navy/40 focus:border-hooksy-purple focus:bg-white sm:text-base"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useEmojis}
                  onChange={(e) => setUseEmojis(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-hooksy-lavender text-hooksy-purple focus:ring-hooksy-purple accent-hooksy-purple"
                />
                <span className="text-xs font-semibold text-hooksy-navy/80 sm:text-sm">{copy.useEmojis}</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating || !topic.trim()}
              className="flex items-center justify-center gap-2 rounded-full bg-hooksy-purple px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02] hover:shadow-glow disabled:opacity-50 sm:px-6 sm:text-base"
            >
            {generating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {copy.generating}
              </>
            ) : (
              <>
                <Sparkle className="text-hooksy-yellow" />
                {copy.generate}
              </>
            )}
          </button>
          </div>

          {generated && (
            <div className="mt-4 rounded-xl border-2 border-dashed border-hooksy-purple/30 bg-hooksy-lavender/40 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase text-hooksy-purple">
                  {copy.yourHook} · {platformLabel(lang, platform.id)}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {modelUsed && (
                    <span className="text-xs font-medium text-hooksy-navy/50">
                      AI: {modelUsed}
                    </span>
                  )}
                  <span className="text-xs font-medium text-hooksy-navy/50">
                    {charCount} / {platform.maxChars} {copy.chars}
                  </span>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed sm:text-base">{generated}</p>

              {viralScore !== null && (
                <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-white/80 p-3 sm:flex-row sm:justify-center">
                  <p className="text-sm font-bold text-hooksy-purple">{copy.viral}</p>
                  <ViralScore score={viralScore} />
                  <p className="text-xs font-semibold text-hooksy-navy/70 sm:text-sm">
                    {viralScore >= 85 ? copy.viralHigh : copy.viralMid}
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full bg-hooksy-navy px-3 py-1.5 text-xs font-bold text-white transition hover:scale-105 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {copied ? copy.copied : copy.copy}
                </button>
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-hooksy-purple/40 bg-hooksy-lavender/60 px-3 py-1.5 text-xs font-bold text-hooksy-purple transition hover:border-hooksy-purple hover:bg-hooksy-lavender sm:px-4 sm:py-2 sm:text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A5.97 5.97 0 0 0 16 6.5C14.34 6.5 13 5.16 13 3.5S14.34.5 16 .5s3 1.34 3 3c0 .24-.04.47-.09.7l7.05 4.11c.54-.5 1.25-.81 2.04-.81 1.66 0 3 1.34 3 3s-1.34 3-3 3c-.79 0-1.5-.31-2.04-.81l-7.12 4.16c.05.21.08.43.08.65 0 1.61-1.31 2.92-2.92 2.92S12.92 18.61 12.92 17s1.31-2.92 2.92-2.92c.79 0 1.5.31 2.04.81l7.12-4.16c-.05-.21-.08-.43-.08-.65 0-1.61-1.31-2.92-2.92-2.92z" />
                  </svg>
                  {copy.share}
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="rounded-full border-2 border-hooksy-navy/15 px-3 py-1.5 text-xs font-bold disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {copy.again}
                </button>
              </div>
            </div>
          )}
        </section>

        <ShareSheet
          open={shareOpen}
          text={generated}
          lang={lang}
          title={copy.shareTitle}
          closeLabel={copy.close}
          onClose={() => setShareOpen(false)}
        />

        {/* About block */}
        <section id="about" className="rounded-2xl border-2 border-hooksy-pink/20 bg-gradient-to-b from-white to-hooksy-lavender/20 p-4 shadow-lg shadow-hooksy-pink/5 sm:p-6">
          <div className="mb-3 inline-flex rounded-full bg-hooksy-lavender px-3 py-1 text-xs font-bold text-hooksy-purple sm:text-sm">
            ℹ️ {copy.aboutBadge}
          </div>
          <h2 className="text-xl font-extrabold sm:text-2xl">{copy.aboutTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-hooksy-navy/70 sm:text-base">{copy.aboutBody}</p>
          <p className="mt-4 text-xs font-bold text-hooksy-navy/80 sm:text-sm">{copy.aboutFollow}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                { id: "threads" as const, href: FOLLOW_LINKS.threads, label: copy.followThreads },
              ] as const
            ).map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-hooksy-lavender bg-hooksy-lavender/40 px-3 py-2 text-xs font-semibold text-hooksy-navy transition hover:border-hooksy-purple hover:text-hooksy-purple sm:px-4 sm:text-sm"
              >
                <SocialIcon id={link.id} size={16} className="text-hooksy-purple" />
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <p className="pb-4 text-center text-xs text-hooksy-navy/50">
          Hooksy.click © {new Date().getFullYear()}
        </p>
      </main>
    </div>
  );
}