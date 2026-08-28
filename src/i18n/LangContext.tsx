import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type TranslationKey } from "./translations";
import type { Lang } from "../types";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((prev) => (prev === "fr" ? "en" : "fr")),
      t: (key) => translations[lang][key],
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
