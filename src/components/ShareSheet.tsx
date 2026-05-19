import { useEffect } from "react";
import { SocialIcon } from "./SocialIcon";
import { SHARE_TARGETS, shareToNetwork, type ShareTarget } from "../lib/share";
import { platformLabel, t, type Lang } from "../i18n";

type ShareSheetProps = {
  open: boolean;
  text: string;
  lang: Lang;
  title: string;
  closeLabel: string;
  onClose: () => void;
};

function ShareGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A5.97 5.97 0 0 0 16 6.5C14.34 6.5 13 5.16 13 3.5S14.34.5 16 .5s3 1.34 3 3c0 .24-.04.47-.09.7l7.05 4.11c.54-.5 1.25-.81 2.04-.81 1.66 0 3 1.34 3 3s-1.34 3-3 3c-.79 0-1.5-.31-2.04-.81l-7.12 4.16c.05.21.08.43.08.65 0 1.61-1.31 2.92-2.92 2.92S12.92 18.61 12.92 17s1.31-2.92 2.92-2.92c.79 0 1.5.31 2.04.81l7.12-4.16c-.05-.21-.08-.43-.08-.65 0-1.61-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

export function ShareSheet({ open, text, lang, title, closeLabel, onClose }: ShareSheetProps) {
  const copy = t(lang);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleShare = async (target: ShareTarget) => {
    await shareToNetwork(target, text);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-hooksy-navy/40 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[1.5rem] border border-hooksy-lavender bg-white p-5 shadow-card sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3
            id="share-sheet-title"
            className="flex items-center gap-2 text-lg font-extrabold text-hooksy-navy"
          >
            <ShareGlyph className="text-hooksy-purple" />
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-hooksy-lavender/80 text-hooksy-navy/70 transition hover:bg-hooksy-lavender hover:text-hooksy-navy"
            aria-label={closeLabel}
          >
            <span className="text-xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <p className="mb-3 text-center text-sm font-bold text-hooksy-purple leading-relaxed bg-hooksy-lavender/60 rounded-xl px-3 py-2 border border-hooksy-purple/20">{copy.shareHint}</p>

        <div className="grid grid-cols-4 gap-3">
          {SHARE_TARGETS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleShare(id)}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-hooksy-lavender/80 bg-hooksy-lavender/30 p-3 transition hover:border-hooksy-purple/30 hover:bg-hooksy-lavender hover:shadow-soft"
            >
              <SocialIcon id={id} size={22} className="text-hooksy-purple" />
              <span className="text-center text-[0.65rem] font-semibold leading-tight text-hooksy-navy/70">
                {platformLabel(lang, id)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
