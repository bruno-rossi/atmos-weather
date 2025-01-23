import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        capri: "var(--capri)",
        freshAir: "var(--fresh-air)",
        blueSapphire: "var(--blue-sapphire)",
        white: "var(--white)",
        black: "var(--black)",
        cadet: "var(--cadet)"
      },
    },
  },
  plugins: [],
} satisfies Config;
