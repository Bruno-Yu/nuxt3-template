<script setup lang="ts">
// You might choose this based on an API call or logged-in status
// const layout = "custom";
useHead({
  htmlAttrs: {
    lang: currentLanguageCode.value,
    translate: 'no',
  },
})
</script>

<template>
  <div id="app_wrapper" class="relative container max-w-screen-sm mx-auto">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>