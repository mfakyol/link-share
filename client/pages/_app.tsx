import "@/styles/globals.scss";
import "@/styles/variables.scss";
import type { AppProps } from "next/app";
import { Provider } from "@/store/provider";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import TranslationContextProvider from "@/contexts/TranslationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <TranslationContextProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </TranslationContextProvider>
    </Provider>
  );
}
