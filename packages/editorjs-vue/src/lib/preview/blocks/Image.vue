<template>
  <img :src="props.info.data.file.url" :alt="props.info.data.caption" :style="style" />
</template>

<script setup lang="ts">
  import { computed, CSSProperties } from 'vue'
  import { ImageBlock } from '../../type'

  const props = defineProps<{ info: ImageBlock }>()
  const style = computed<CSSProperties>(() => {
    return {
      maxWidth: '100%',
      border: props.info.data.withBorder ? '1px solid #ccc' : 'none',
      width: props.info.data.stretched ? '100%' : 'auto',
      backgroundColor: props.info.data.withBackground ? '#fff' : 'transparent',
    }
  })
</script>

<style scoped></style>
