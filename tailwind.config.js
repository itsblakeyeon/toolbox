/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'glass',
    'glass-strong',
    'glass-subtle',
    'glass-button',
    'glass-button-purple',
    'glass-button-green',
    'glass-button-red',
    'glass-button-gray',
    'glass-input',
  ],
}
