import { storeToRefs } from 'pinia'
import { useUserStore } from '~/store/user'
//  若無登入轉換任何路由，都會回到登入頁面
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  if (userInfo.value?.token && to.path === '/login') {
    if (to.path === from.path)
      return navigateTo('/')
    else
      return navigateTo({ path: from.path })
  }
})
