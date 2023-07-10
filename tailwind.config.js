/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      "primary": "#635FC7",
      "danger": "#EA5555",
      "on-danger": "#FFFFFF",
      "on-primary": "#FFFFFF",
      "light": {
        "secondary": "#635FC71A",
        "surface": "#FFFFFF",
        "background": "#F4F7FD",
        "lines": "#E4EBFA",
        "on-secondary": "#635FC7",
        "on-background": "#828FA3",
        "on-surface": "#000112",
      },
      "dark": {
        "secondary": "#FFFFFF",
        "surface": "#2B2C37",
        "background": "#20212C",
        "lines": "3E3F4E",
        "on-secondary": "#635FC7",
        "on-background": "#828FA3",
        "on-surface": "#FFFFFF",
      },
      "hover": {
        primary: "#A8A4FF",
        secondary: "#635FC740",
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
