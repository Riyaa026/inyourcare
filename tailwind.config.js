/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        secondary: '#134E4A',
        accent: '#2DD4BF',
      }
    },
  },
  plugins: [],
} 