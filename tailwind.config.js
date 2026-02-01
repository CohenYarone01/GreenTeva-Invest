/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: '#0e2a25', // FOND PRINCIPAL : Un vert sapin profond (plus lumineux que le noir)
          900: '#164038', // SECTIONS : Un vert forêt visible
          800: '#235c50', // ACCENTS : Vert émeraude sombre
          700: '#2f7a68', // HOVER : Vert feuille
        },
        gold: {
          400: '#d4af37', // Or classique
          500: '#c5a028',
          900: '#4a3b0f', 
        },
        white: '#f4f4f4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}