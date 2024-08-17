import type { Config } from "tailwindcss";
import formsPlugin from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'd-gray': '#ececec',
        'd-lightblue': '#A5B2CF',
        'd-blue': '#003366',
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
