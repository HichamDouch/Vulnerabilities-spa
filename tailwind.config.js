/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'bg-color': "#16161A",
        'primary' : "#3B3B3B",
        "secondary" : "#4E4E4E",
        'primary-btn-color' : "#7F5AF0",
        'primary-text-color' : "#7F5AF0",
        'star-color' : '#FF8F20',
        'active-bg-color' : '#977BEE',
        'p-color' : '#FFFFFE'
        
      },
      fontFamily: {
        'sans': ['Montserrat','Helvetica','Arial','serif'],
      },
      borderRadius: {
        'xs': '.3rem',
        'sm': '.4rem',
      },
      screens : {
        "3xl"  : "1680px"
      }
    },
  },
  plugins: [],
}
