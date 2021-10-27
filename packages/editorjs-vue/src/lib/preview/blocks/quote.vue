<template>
  <blockquote>
    <p v-html="props.text"></p>
    <p v-html="props.caption"></p>
  </blockquote>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    alignment: {
      type: String,
      default: 'left',
    },
  })
</script>

<style scoped></style>
