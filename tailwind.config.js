/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      black: "#000112",
      "dark-grey": "#2B2C37",
      "light-grey": "#F4F7FD",
      "line-dark": "#3E3F4E",
      "line-Light": "#E4EBFA",
      "purple-main": "#635FC7",
      "purple-hover": "#A8A4FF",
      "medium-grey": "#828FA3",
      red: "#EA5555",
      "red-hover": "#FF9898",
      "very-dark-grey": "#20212C",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        "heading-sm": [
          "0.75rem",
          {
            lineHeight: "0.938rem",
            letterSpacing: "0.15rem",
            fontWeight: "700",
          },
        ],
        "heading-md": [
          "0.938rem",
          {
            lineHeight: "1.188rem",
            fontWeight: "700",
          },
        ],
        "heading-lg": [
          "1.125rem",
          {
            lineHeight: "1.438rem",
            fontWeight: "700",
          },
        ],
        "heading-xl": [
          "1.5rem",
          {
            lineHeight: "1.875rem",
            fontWeight: "700",
          },
        ],
        "body-md": [
          "0.75rem",
          {
            lineHeight: "0.9375rem",
            fontWeight: "700",
          },
        ],
        "body-lg": [
          "0.8125rem",
          {
            lineHeight: "1.4375rem",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/container-queries"),
  ],
};
