import type { Config } from "tailwindcss";

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
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      textColor: {
        'd-darkgray': '#8a8f98',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
