module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        red: {
          500: "#FF3A5E",
          600: "#E82B4E",
          700: "#D01C3E",
          800: "#B80D2F",
        },
        purple: {
          500: "#7B46FF",
          600: "#6B36EF",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
