/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables toggling dark mode via 'class'
  theme: {
    extend: {
      colors: {
        peach: "#FFDAB9",
        "peach-dark": "#FFB366",
        "peach-light": "#FFE4B5",
        cream: "#FFFDD0",
        "cream-dark": "#FFF8A3",
        "cream-light": "#FFFEF0",
        turquoise: "#40E0D0",
        gold: "#FFD700",
        sunset: "#FF4500",
        pink: "#FF69B4",
        // Dark mode colors
        darkBg: "#1F1F1F",
        darkPanel: "#2C2C2C",
        darkBorder: "#4B4B4B",
        darkText: "#E5E5E5",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
