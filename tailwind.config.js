/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'pinky': '#FFC0C0',
      'white': '#FFFFFF',
      'black': '#000000',
      'gray': {
        100: '#f3f4f6',
        200: '#e5e7eb',
        400: '#9ca3af',
        900: '#111827'
      }
    }
  },
  plugins: [],
}