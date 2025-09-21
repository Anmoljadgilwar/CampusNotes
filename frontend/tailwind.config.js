/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  dark: "class", // Enable dark mode with class strategy
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
