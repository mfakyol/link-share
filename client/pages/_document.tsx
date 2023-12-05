import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `const localTheme = localStorage.getItem("theme");const theme = window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark": "light";if(localTheme) document.documentElement.setAttribute("theme",  localTheme == "auto" ? theme : localTheme);else document.documentElement.setAttribute("theme", theme);`,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
