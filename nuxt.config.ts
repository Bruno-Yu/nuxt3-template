// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined', rel: 'stylesheet' }],
      htmlAttrs: {
        lang: 'en',
        translate: 'no',
      },
    }
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
  },
  css: ['~/assets/scss/index.scss'],
  tailwindcss: { // 自訂的 tailwindcss 設定設置位置
    cssPath: '~/assets/scss/tailwind.scss', // 這是自訂的 tailwind 引入路徑
  },
  ssr: false,
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
