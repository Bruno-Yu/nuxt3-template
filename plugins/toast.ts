/**
 * 全域 toast
 * 使用方式 index.vue
 *
 * const { $toast, $toastCloseAll } = useNuxtApp()
 * import { Search } from '@element-plus/icons-vue' // 需引用element-plus的icon
 *
 * $toast({message: '搜尋中', duration: 2000, icon: Search}) // 有放大鏡icon的toast，顯示2秒後會自動關閉
 *
 * setTimeout(() => { // 3秒後關閉所有toast
 *  $toastCloseAll()
 * }, 3000);
 *
 */

import { ElMessage } from 'element-plus'
import { h } from 'vue'

interface MessageInterFace {
  message?: string // 訊息
  icon?: string // icon(icon名稱)
  duration?: number // 顯示時間，單位為毫秒。 設為 0 則不會自動關閉
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // 一般訊息用的toast
      toast: (messageParams: MessageInterFace) => {
        ElMessage({
          icon: () => {
            return h(
              'div',
              { class: 'el-icon' },
              [h(messageParams.icon)]
            )
          },
          customClass: 'global-toast',
          message: messageParams.message,
          duration: messageParams.duration,
        })
      },
      // 關閉所有toast
      toastCloseAll: () => {
        ElMessage.closeAll()
      }
    }
  }
})
