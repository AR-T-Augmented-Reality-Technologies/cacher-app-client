/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        'tiny' : '.5rem',
      },
      colors: {
        customblue: 'var(--blue-custom)',
        'custom-blue': '#7cdbf5',
        'custom-blue-hover': '#92e1f7',
        'custom-orange': '#ffb253',
        'like-button-orange': '#ff6624',
      }
    },
  },
  plugins: [],

  
}
