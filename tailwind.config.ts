import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// On defint le type pour la config DaisyUI pour éviter l'erreur "Unexpected any"
interface DaisyConfig {
  themes?: Array<string | Record<string, Record<string, string>>>;
  darkTheme?: string;
  base?: boolean;
  styled?: boolean;
  utils?: boolean;
  prefix?: string;
  logs?: boolean;
  themeRoot?: string;
}

// On étend le type de base
type CustomConfig = Config & {
    daisyui: DaisyConfig;
}

const config: CustomConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        yupidocLight: {
          "primary": "#1e293b",
          "secondary": "#3b82f6",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "color-scheme": "light", 
        },
        yupidocDark: {
          "primary": "#3b82f6",
          "secondary": "#1e293b",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#0f172a",
          "color-scheme": "dark",
        },
      },
    ],
  },
};

export default config;