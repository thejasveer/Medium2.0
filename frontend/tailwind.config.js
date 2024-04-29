/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
          blinking: {
              '0%, 100%': { color: 'rgb(148 163 184)' },
              '50%': { color: '#fff' },
          }
      },
      animation: {
        blinking: 'blinking 0.65s ease-in-out infinite',
      }
  },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

