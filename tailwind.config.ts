import type { Config } from "tailwindcss";
import formsPlugin from '@tailwindcss/forms';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
      },
      colors: {
        'd-blue': '#003366',
        'd-blue-light-button': '#6699CC',
        'd-yellow': '#DAA520',
        'd-yellow-light-button': '#F3DFA7',
        'd-fondo': '#F0F0F0',
        'd-gray-light': '#9CA3AF',
        'd-green': '#2E8B57',
        'd-green-dark': '#26794A',
        'd-green-light': '#379B63',
        'd-green-light-button': '#A3D3B4',
        'd-gray-text': '#6B7280',
        'd-red': '#DC2626',
        'd-red-light-button': '#F3D9D9',
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
