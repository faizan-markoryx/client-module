/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif']
      },
      boxShadow: {
        '3xl': '0px 3px 6px #00000029',
        '2xl': '0px 2px 3px #00000029',
      },
      colors: {
        primary: "#121820",
        secondary: "#f2f2f2",
      }
    },
  },
  plugins: [],
}