<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
