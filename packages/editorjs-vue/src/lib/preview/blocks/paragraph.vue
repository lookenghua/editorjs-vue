<template>
  <p v-html="props.text"></p>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
  })
</script>

<style scoped></style>
