import { ref, computed } from 'vue'


// 回傳目前環境的  i18n 語言-國家編碼
export const currentLanguageIso = computed(() => {
  return useNuxtApp().$i18n.locales.value.find((item)=> item.code ===useNuxtApp().$i18n.locale.value)?.iso 
})

// 回傳目前環境的 i18n 語言編碼
export const currentLanguageCode = computed(() => {
  return useNuxtApp().$i18n.locale.value 
})

