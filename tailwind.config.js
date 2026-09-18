/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darker: "#081b26",
          dark: "#0d2b3d",
          DEFAULT: "#1789b3",
          mid: "#1c9ec6",
          accent: "#2fb2df",
          light: "#eaf6fc",
          border: "#c9e8f4",
        },
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(8, 27, 38, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
