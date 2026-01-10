/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
