// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined', rel: 'stylesheet' }],
    }
  },
  runtimeConfig: {
    public: {
      NUXT_API_BASE: process.env.NUXT_API_BASE,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix', // 設定是否在路由上加上對應 locale 前綴，預設是 'prefix_except_default'
    langDir: 'locales', // i8n 對應語言文件的存放目錄，範例是在根目錄下的 locales 資料夾
    locales: [ // 值為陣列，陣列內可以放字串或是物件
      {
        code: 'en', // 必填，代表對應的 locale 語言編碼
        iso: 'en-US', // 選填，但使用 SEO 為必填，定義在 IETF's BCP47,
        file: 'en.json' // 對應的檔案名稱
      },
      {
        code: 'zh',
        iso: 'zh-TW', 
        file: 'zh.json'
      }
    ],
    defaultLocale: 'en', //預設語系
    detectBrowserLanguage: { // 值為 boolean 或是物件，啟用偵測使用者瀏覽器目前語系
      useCookie: true, // true 代表會將使用者目前語系以 cookie 形式存在瀏覽器中
      cookieKey: 'i18n_redirected', // 存瀏覽器的 cookies key 名稱設定，預設是 'i18n_redirected'
      redirectOn: 'root' // 基於哪種路由路徑進行 i18n 轉址，若為了 seo 建議放 root 代表只在根目錄位址做判斷
    }
  },
  css: ['~/assets/scss/index.scss'],
  tailwindcss: { // 自訂的 tailwindcss 設定設置位置
    cssPath: '~/assets/scss/tailwind.scss', // 這是自訂的 tailwind 引入路徑
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.NUXT_API_BASE,
          changeOrigin: true
        }
      }
    }
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
})
