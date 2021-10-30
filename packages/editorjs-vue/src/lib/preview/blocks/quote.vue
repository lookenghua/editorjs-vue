<template>
  <blockquote>
    <p v-html="props.text"></p>
    <p v-html="props.caption"></p>
  </blockquote>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'QuoteBlock' })
</script>
<script setup lang="ts">
  const props = withDefaults(defineProps<{ text: string; caption: string; alignment: string }>(), {
    text: '',
    caption: '',
    alignment: 'left',
  })
</script>

<style scoped></style>
