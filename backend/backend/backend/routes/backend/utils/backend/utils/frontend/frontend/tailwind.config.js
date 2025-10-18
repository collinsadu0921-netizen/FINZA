/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        finzaBlue: "#0C1A3D",
        finzaTeal: "#00C8A0",
        finzaGold: "#FFD54F"
      }
    }
  },
  plugins: [],
};
