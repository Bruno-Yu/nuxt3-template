/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(12, 130, 254)', // 自訂主題色
        lightPrimary:  'rgb(246, 250, 253)', // login input 背景色
        secondary: 'rgb(241, 241, 245)',
      },
    },
  },
  plugins: [],
};
