/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'arrowAnimation':{
          '0%,100%':{
            transform:'translateX(5px)'
          },
          '50%':{
            transform:'translate(0px)'
          }
        },
        'reciept':{
          '0%':{
            transform:'scale(2,2)',
            opacity:"20%"
          },
          '50%':{
            transform:'scale(1,1)',
            opacity:"50%"
          },
          '100%':{
            transform:'scale(0px)',
            opacity:"100%"
          }
        },
        'textFlyin':{
          from: {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        }
      },
      animation:{
        'arrowAnimation':'arrowAnimation 1.5s ease-in-out infinite',
        'reciept':'reciept 3s ease-in-out ',
        'textFlyin':'textFlyin 3s ease-in-out'
      }
    }
  },
  plugins: [],
}

