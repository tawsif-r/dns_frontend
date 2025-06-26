/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blueGrayStart: '#2c3e50',
        blueGrayEnd: '#4ca1af',
      },
    },
  },
  plugins: [],
}

