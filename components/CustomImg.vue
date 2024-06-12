<template>
  <picture >
    <source v-for="(i, idx) in sortedCompressRatesList" :key="idx" :media="`(max-width:${i.breakpoint}px)`" :srcset="`${filePath}${fileName}_${i.suffix}${fileExtension}`">
    <source :srcset="src">
    <img :src="src"  :alt="fileName"   :loading="loading"/>
  </picture>
</template>
<script setup>
import { ref, watch, toRefs,computed ,getCurrentInstance } from "vue"
import {compressRatesList, targetDir, compressDir} from "~/compress-setting"
const {src, loading} = defineProps(['src' , 'loading'])

const fileName = ref()
const filePath = ref()
const fileExtension = ref()
const instance = getCurrentInstance()
const sortedCompressRatesList = compressRatesList.sort((a, b) => a.breakpoint - b.breakpoint)
function extractAndGenerateFilenames(filePath) {
  // 使用正則匹配路徑、文件名和擴展名
  const match = filePath.match(/^(.*\/)?([^\/]+)(\.\w+)$/);
  if (match) {
    const targetPath = targetDir.split('/')[2]
    const compressPath = compressDir.split('/')[2]
    const path = match[1]?match[1].replace(`/${targetPath}`, `/${compressPath}`) : ''; // 路徑部分，如果没有，則為空字串
    const name = match[2];   // 文件名部分
    const extension = match[3];  // 擴展名部分

    return {
      name,
      path,
      extension
    };
  }
  return null; // 如果匹配失敗，返回 null
}

window && window.addEventListener("resize", () => {
})

watch(() => src, ()=> {
  const {name, path, extension} = extractAndGenerateFilenames(src)
  fileName.value = name
  filePath.value = path
  fileExtension.value = extension
}, {
  immediate: true
})

</script>
<style lang='scss' scoped>
img {
  width: 100%;
  height: 100%;
}
</style>