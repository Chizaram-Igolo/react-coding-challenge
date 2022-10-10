/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        FiraSans: ["FiraSans", "sans-serif"],
        FiraSans_Medium: ["FiraSans_Medium", "sans-serif"],
        FiraSans_SemiBold: ["FiraSans_SemiBold", "sans-serif"],
        FiraSans_Bold: ["FiraSans_Bold", "sans-serif"],
        FiraSans_BoldItalic: ["FiraSans_BoldItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
