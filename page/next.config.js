/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/p",

  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3002', // Bu, diğer yerel uygulamanın adresi olmalıdır
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
