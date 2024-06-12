import type { UserState } from '@/types/user'


export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => {
    return {
      userInfo: {
        name: '',
        email: null,
      },
      menuList: {},
    }
  },
  getters: {
  },
  actions: {
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
