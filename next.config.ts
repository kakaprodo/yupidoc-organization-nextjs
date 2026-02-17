import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


// Par défaut, cela cherche le fichier dans './src/i18n.ts'
const wuthNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default wuthNextIntl(nextConfig);
