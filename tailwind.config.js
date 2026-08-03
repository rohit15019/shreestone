/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F4E0A5',
          DEFAULT: '#D4AF37',
          amber: '#C59B27',
          dark: '#997312'
        },
        charcoal: {
          700: '#3A3D40',
          800: '#2A2D30',
          900: '#1A1C1E',
          950: '#111214'
        },
        marble: {
          light: '#F8F9FA',
          vein: '#E2E8F0',
          dark: '#E9ECEF'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(212, 175, 55, 0.15)',
        'luxury-hover': '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [],
}
