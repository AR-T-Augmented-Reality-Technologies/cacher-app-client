/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#7cdbf5',
        'custom-blue-hover': '#92e1f7',
        'custom-orange': '#ffb253',
      }
    },
  },
  plugins: [],
}
