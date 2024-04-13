<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '~/store/user';

const userStore = useUserStore()

onMounted(async () => {

})
</script>

<template>
  <NuxtLayout>
    <div class="h-screen flex flex-col">
      <h1 class="text-title">Nuxt template 專案模板</h1>
    </div>
  </NuxtLayout>
</template>
