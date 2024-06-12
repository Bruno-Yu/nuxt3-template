<template>
  <transition @before-leave="onClose" @after-leave="onDestroy" name="loading-fade">
    <div v-show="visible" :class="['loading', customClass]" >
      <div class="flex items-center">
        <ElIconLoading class="animate-spin-slow w-4 h-4 mr-2"  /><span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang='ts' setup>
import {string} from 'mathjs';
import { onMounted, ref , computed } from 'vue'
const props = defineProps({
  customClass: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  onDestroy: Function,
  onClose: Function 
})
const visible = ref(false)
const close = () => {
  visible.value = false
}

defineExpose({
  close
})
onMounted(()=> {
  visible.value = true
})


</script>

<style lang="scss" scoped>
// .loading {
//   @apply fixed z-50 top-1/2 left-1/2 rounded px-4 py-2 transform -translate-x-1/2 min-w-3/10 transition-all
// }
// .loading-fade-enter-from,
// .loading-fade-leave-to {
//   @apply transform -translate-x-1/2 -translate-y-20px opacity-0
// }


</style>