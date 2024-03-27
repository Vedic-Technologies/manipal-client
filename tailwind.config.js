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
    }
    
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}