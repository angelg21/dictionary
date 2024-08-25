import type { Config } from "tailwindcss";
import formsPlugin from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'd-blue': '#003366',
        'd-yellow': '#DAA520',
        'd-fondo': '#F0F0F0',
        'd-green': '#2E8B57',
        'd-red': '#DC2626',
        'd-gray': '#374151',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      textColor: {
        'd-darkgray': '#8a8f98',
      },
    },
  },
  plugins: [formsPlugin],
};
export default config;
