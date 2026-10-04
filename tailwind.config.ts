import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maroon: {
          50: "#fbeaed",
          100: "#f3c6cf",
          600: "#8a1f33",
          700: "#6e1829",
          800: "#53121f",
          900: "#390d15",
        },
        gold: {
          100: "#f6e9c6",
          400: "#d4a017",
          500: "#c08f14",
        },
      },
    },
  },
  plugins: [],
};
export default config;
