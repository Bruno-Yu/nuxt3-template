<script setup>
import { onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en';
const lang = ref('en')
// 取得 config 資料

onMounted(async () => {
})

useHead({
  title: 'nuxt3-starter',
  meta: [
    { name: 'nuxt3-starter', content: 'nuxt3-starter' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
  ],
})
</script>
<template>
  <div class="relative container max-w-screen-sm mx-auto">
    <el-config-provider :locale="lang === 'en' ? en : zhCn">
      <!-- 路由組件呈現位置 -->
      <slot />
    </el-config-provider>
  </div>
</template>
<!-- <style lang="scss" scoped>
.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none; //  可以關閉 ipad 在 ios11 之後，可以對連結做 drag and drop 的操作
  -webkit-touch-callout: none; //  可以關閉長按跳出"拷貝"等功能選單
}
</style> -->