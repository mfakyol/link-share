import { langOptions } from "@/config";
import { useRouter } from "next/router";
import translations from "@/constants/translations";
import { ReactNode, createContext, useCallback, useContext } from "react";

type T = (key: string) => string;

type ProviderProps = {
  children: ReactNode;
};

type TranslationContextType = [T, LangOpiton[]];

let defaultLang: Lang = "en";

if (typeof window !== "undefined") {
  const langLocal = localStorage.getItem("lang");
  if (langLocal && langOptions.some((l) => l.id === langLocal)) {
    defaultLang = langLocal as Lang;
  }
}

const TranslationContext = createContext<TranslationContextType>([(key: string) => "", langOptions]);

export function useTranslation() {
  return useContext(TranslationContext);
}

export default function TranslationContextProvider({ children }: ProviderProps) {
  const { locale } = useRouter();

  const t = useCallback(
    (key: string) => {
      return translations[locale as Lang][key] || key;
    },
    [locale]
  );

  return <TranslationContext.Provider value={[t, langOptions]}>{children}</TranslationContext.Provider>;
}
