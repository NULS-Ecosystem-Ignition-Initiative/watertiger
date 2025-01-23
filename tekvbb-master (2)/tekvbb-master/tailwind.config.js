module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["OpenSans", "sans-serif"],
      },
      colors: {
        tekGreen: "#013447",
        tekBgTo: "#001929",
        tekBgFrom: "#03657d",
        tekDark: "#111827",
      },
    },
  },
  plugins: [],
};
