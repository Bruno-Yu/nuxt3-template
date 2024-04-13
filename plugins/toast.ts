import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
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

      // loading toast
      loadingToast: (messageParams: MessageInterFace) => {
        ElMessage({
          icon: () => {
            return h(
              'div',
              { class: 'el-icon is-loading' },
              [h(Loading)]
            )
          },
          customClass: 'global-toast',
          message: 'loading',
          duration: messageParams?.duration,
        })
      },

      // checking toast
      checkingToast: (messageParams: MessageInterFace) => {
        ElMessage({
          icon: () => {
            return h(
              'div',
              { class: 'el-icon is-loading' },
              [h(Loading)]
            )
          },
          customClass: 'global-toast',
          message: 'checking...',
          duration: messageParams?.duration,
        })
      },

      // 關閉所有toast
      toastCloseAll: () => {
        ElMessage.closeAll()
      }
    }
  }
})
