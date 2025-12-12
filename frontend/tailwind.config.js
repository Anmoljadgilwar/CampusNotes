export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // dark: "class", // Enable dark mode with class strategy
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
