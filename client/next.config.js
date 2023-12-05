/** @type {import('next').NextConfig} */

const langs = ["en", "tr", "de"];
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: langs,
    defaultLocale: langs[0],
  },
};

module.exports = nextConfig;
