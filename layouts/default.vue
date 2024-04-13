<script setup>

</script>

<template>
  <div class="relative container max-w-screen-sm mx-auto">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
// .unselectable {
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   -webkit-user-drag: none; //  可以關閉 ipad 在 ios11 之後，可以對連結做 drag and drop 的操作
//   -webkit-touch-callout: none; // 可以關閉長按跳出"拷貝"等功能選單
// }
</style>
