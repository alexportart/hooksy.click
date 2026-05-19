import type { Lang } from "../i18n";
import { LANGS } from "../i18n";

const FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  ru: "🇷🇺",
  es: "🇪🇸",
};

type LangSwitchProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export function LangSwitch({ lang, onChange }: LangSwitchProps) {
  return (
    <div className="flex justify-end gap-2" role="group" aria-label="Language">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={`rounded-full px-3 py-1.5 text-lg transition ${
            lang === code
              ? "bg-hooksy-purple text-white shadow-soft"
              : "bg-hooksy-lavender/60 hover:bg-hooksy-lavender"
          }`}
          aria-pressed={lang === code}
          aria-label={code}
        >
          {FLAGS[code]}
        </button>
      ))}
    </div>
  );
}
