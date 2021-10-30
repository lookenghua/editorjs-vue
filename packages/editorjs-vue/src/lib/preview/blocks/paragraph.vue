<template>
  <p v-html="props.text"></p>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'ParagraphBlock' })
</script>
<script setup lang="ts">
  const props = withDefaults(defineProps<{ text: string }>(), { text: '' })
</script>

<style scoped></style>
