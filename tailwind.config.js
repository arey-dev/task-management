/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      "light": {
        "primary": "#635FC7",
        "primary-variant-1": "#635FC71A",
        "primary-variant-2": "#635FC740",
        "surface": "#FFFFFF",
        "background": "#F4F7FD",
        "danger": "#EA5555",
        "lines": "#E4EBFA",
        "on-primary": "#FFFFFF",
        "on-background": "#828FA3",
        "on-surface": "#000112",
        "on-danger": "FFFFFF",
      },
      "dark": {
        "primary": "#635FC7",
        "primary-variant-1": "#635FC71A",
        "primary-variant-2": "#635FC740",
        "surface": "#2B2C37",
        "background": "#20212C",
        "danger": "#EA5555",
        "on-primary": "#FFFFFF",
        "on-background": "#828FA3",
        "on-surface": "#FFFFFF",
        "on-danger": "FFFFFF",
      },
      "hover": {
        primary: "#A8A4FF",
        danger: "#FF9898",
      },
      "neutral-1": "#828FA340",
      "neutral-2": "#828FA33F",
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
  plugins: [],
};
