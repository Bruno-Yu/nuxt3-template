/**
 * 全域 loading
 * 使用方式 index.vue
 *
 * const { $loading, $loadingCloseAll } = useNuxtApp()
 *
 * $toast({message: '搜尋中', duration: 2000, icon: Search}) // 有放大鏡icon的toast，顯示2秒後會自動關閉
 *
 * setTimeout(() => { // 3秒後關閉所有toast
 *  $toastCloseAll()
 * }, 3000);
 *
 */

import { h, render } from 'vue'
import CustomLoading from '~/components/CustomLoading.vue'

export default defineNuxtPlugin((nuxtApp) => {

  let instances = []

  function Loading(options) {
    const container = document.createDocumentFragment()
    const vm = h(CustomLoading, {
      ...options,
      onClose() {
        close(vm)
      },
      onDestroy() {
        render(null, container)
      }
    })
    render(vm, container)
    document.body.appendChild(container)
    instances.push(vm)
  }
  function close() {
    if(instances.length){
      instances.forEach((item, index)=> {
        item.component.exposed.close()
      })
    }
    instances = []
  }


  return {
    provide: {
      loading: () => {
        Loading({
          customClass: 'global-loading',
          message: 'loading...',
        })
      },
      loadingCloseAll: () => {
        close()
      }
    }
  }
})
