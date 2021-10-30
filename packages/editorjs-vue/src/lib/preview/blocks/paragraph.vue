<template>
  <p v-html="props.text"></p>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ text: string }>(), { text: '' })
</script>

<style scoped></style>
