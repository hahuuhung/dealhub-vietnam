"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { vi } from "./dictionaries/vi";
import { en } from "./dictionaries/en";

type Language = "vi" | "en";
type Dictionary = typeof vi;

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    const saved = localStorage.getItem("dh_lang") as Language;
    if (saved === "en" || saved === "vi") setLangState(saved);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("dh_lang", newLang);
  };

  const t = lang === "vi" ? vi : en;

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
