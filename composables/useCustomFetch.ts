import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { useUserStore } from '~/store/user'

const apiPrefix = '/api'
//  method ex: GET, POST, PUT, DELETE
// needLoading: true(預設) 開啟 loading, false 關閉 loading
export default <T>(method: string, url: string, payload: object | null, needToken: boolean, contentType: null | string = null, needLoading = true) => {
  const { $toast, $loadingToast, $toastCloseAll, $loading, $loadingCloseAll } = useNuxtApp()
  const userStore = useUserStore()
  const router = useRouter()
  const { userInfo } = storeToRefs(userStore)
  const runtimeConfig = useRuntimeConfig()
  const optionsConfig = {
    baseUrl: `${runtimeConfig.public.NUXT_API_BASE}`,
    headers: { authorization: '', 'Accept-Language': `${currentLanguageIso.value}` },
    method,
    server: false,
    body: payload, // 物件
  }
  if (contentType === 'application/x-www-form-urlencoded') {
    optionsConfig.headers['content-type'] = 'application/x-www-form-urlencoded'
    optionsConfig.body = new URLSearchParams(Object.entries(payload)).toString()
  }
  if (contentType === 'multipart/form-data') {
    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
      formData.set(key, value)
    })
    optionsConfig.body = formData
  }

  if (needToken && userInfo.value?.token)
    optionsConfig.headers.authorization = `Bearer ${userInfo.value.token}`
  return useFetch<T>(`${runtimeConfig.public.NUXT_API_BASE}${apiPrefix}${url}`, {
    ...(optionsConfig as UseFetchOptions),
    onRequest({ request, options }) {
      if (needLoading) {
        $loading()
      }
    },
    onRequestError({ request, options, error }) {
      if(needLoading) {
        $loadingCloseAll()
        $toast({ message: 'unknown error', duration: 3000, icon: CircleCloseFilled })
      }
    },
    onResponse({ request, response, options }) {
      if (needLoading){
        setTimeout(() => {
          $loadingCloseAll()
        }, 600)
      }

      if (response.status === 200) {
        const { _data } = response
        _data.status = response.status
      }
    },
    onResponseError({ request, response, options }) {
    },
  })
}
