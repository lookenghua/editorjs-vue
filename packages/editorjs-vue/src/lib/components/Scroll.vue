<template>
  <div class="outer-container">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
  .outer-container {
    width: 100%;
    height: 100%;
  }

  .outer-container {
    overflow: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
