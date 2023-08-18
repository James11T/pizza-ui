/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        raleway: ['"Raleway"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        confirm: "#8cda59",
        edit: "#a5b4fc",
        remove: "#fda4af",
        muted: "#a8a29e",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
