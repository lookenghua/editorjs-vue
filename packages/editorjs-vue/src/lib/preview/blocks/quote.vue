<template>
  <blockquote>
    <p v-html="props.text"></p>
    <p v-html="props.caption"></p>
  </blockquote>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ text: string; caption: string; alignment: string }>(), {
    text: '',
    caption: '',
    alignment: 'left',
  })
</script>

<style scoped></style>
