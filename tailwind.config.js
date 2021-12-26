const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        shopit_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        shopit_orange: "#fc7a69",
      },
      fontFamily: {
        Poppins: "'Poppins', 'Verdana', monospace",
      },
    },
    screens: {
      xs: { min: "320px", max: "640px" },
      md853: { min: "769px", max: "853px" },
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
