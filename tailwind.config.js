/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'haunted-black': '#0a0a0a',
        'pumpkin': '#ff6b35',
        'blood': '#8b0000',
        'toxic': '#39ff14',
        'ghost': '#e0e0e0',
        'portal-purple': '#9d4edd',
        'portal-orange': '#ff6d00',
      },
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'nosifer': ['Nosifer', 'cursive'],
        'fredericka': ['Fredericka the Great', 'cursive'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'drip': 'drip 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'lightning': 'lightning 0.3s ease-in-out',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0.8' },
          '43%': { opacity: '1' },
          '45.99%': { opacity: '1' },
          '46%': { opacity: '0.6' },
          '47%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drip: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255, 107, 53, 0.8), 0 0 20px rgba(255, 107, 53, 0.6)' },
          '50%': { textShadow: '0 0 20px rgba(255, 107, 53, 1), 0 0 40px rgba(255, 107, 53, 0.8)' },
        },
        lightning: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
