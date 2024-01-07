/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
      },
      boxShadow: {
        def: "0px 0px 1rem rgba(0, 0, 0, 0.5)",
      },
      colors: {
        dark: "#050505",
      },
    },
  },
  plugins: [],
};
