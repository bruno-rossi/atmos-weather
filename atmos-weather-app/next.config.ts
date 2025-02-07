import type { NextConfig } from "next";
const createNextIntlPlugin = require('next-intl/plugin');
/** @type {import('next').NextConfig} */
 
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
};

module.exports = withNextIntl(nextConfig);
export default nextConfig;