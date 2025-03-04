/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  'antd',
  '@ant-design/icons',
  'rc-util', // Добавляем rc-util, чтобы Next.js его транспилировал
  'rc-pagination',
  'rc-picker',
  'rc-tree',
  'rc-table',
  'rc-input',
]);

module.exports = withTM({
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // Отключаем модули, которые есть только в Node.js
      net: false,
      tls: false,
    };
    return config;
  },
});
