export default defineNuxtPlugin((nuxtApp) => {
  // 定義只能輸入 number 的 directive
  nuxtApp.vueApp.directive('number', { // 定義 Vue 指令
    updated(el, bind, vnode) {
      el.addEventListener('input', (event) => {
        const value = event.target.value
        if(!(Number(value) >= 0)) {
          event.target.value = value.replace(/\D/g, '')
        }
      })
    }
  })
})
