// tailwind.config.js
import { defineConfig } from "tailwindcss"

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sacramento: ['"Sacramento"', "cursive"], // fallback optional
        archivo: ['"Archivo Black"', "sans-serif"],
      },
    },
  },
  plugins: [],
})
