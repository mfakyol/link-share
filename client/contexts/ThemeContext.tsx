import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";

const themeMatchMediaDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : undefined;

export type Theme = "dark" | "light" | "auto";

type ProviderProps = {
  children: ReactNode;
};

type ThemeContextType = [Theme, (theme: Theme) => void, Theme[]];

const themes: Theme[] = ["auto", "dark", "light"];

const defaultTheme = "auto";
const defaultThemeDispatch: Dispatch<SetStateAction<Theme>> = () => {};

const ThemeContext = createContext<ThemeContextType>([defaultTheme, defaultThemeDispatch, themes]);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: ProviderProps) {
  const [theme, setThemeDispatch] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as Theme;
    if (localTheme) setThemeDispatch(localTheme);
  }, []);

  useEffect(() => {
    if (theme !== "auto") return;

    const changeThemeEvent = (event: MediaQueryListEvent) => {
      const selectedTheme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("theme", selectedTheme);
    };

    themeMatchMediaDark?.addEventListener("change", changeThemeEvent);

    return () => {
      themeMatchMediaDark?.removeEventListener("change", changeThemeEvent);
    };
  }, [theme]);

  const setTheme = useCallback((theme: Theme) => {
    setThemeDispatch(theme);
    let newTheme = theme;
    if (theme === "auto") {
      if (themeMatchMediaDark?.matches) newTheme = "dark";
      else newTheme = "light";
    }

    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("theme", newTheme);
  }, []);

  return <ThemeContext.Provider value={[theme, setTheme, themes]}>{children}</ThemeContext.Provider>;
}
