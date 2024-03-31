/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-image': "url(./assets/images/login/login_back.jpg)",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
    fontFamily : {
      'roboto': ['Roboto']
    },
     boxShadow: {
      'basic': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
    },
    
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}