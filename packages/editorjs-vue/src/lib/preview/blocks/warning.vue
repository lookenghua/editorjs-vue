<template>
  <div :style="styles.warning">
    <h4 :style="styles.title">{{ props.title }}</h4>
    <div>{{ props.message }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'WarningBlock' })
</script>
<script setup lang="ts">
  import { CSSProperties } from 'vue'

  const props = withDefaults(defineProps<{ title: string; message: string }>(), {
    title: '',
    message: '',
  })
  const styles: Record<string, CSSProperties> = {
    warning: {
      padding: '16px',
      margin: '20px 0',
      border: '1px solid #eee',
      borderLeftWidth: '5px',
      borderRadius: '3px',
      borderLeftColor: '#d9534f',
    },
    title: {
      color: '#d9534f',
      marginBottom: '5px',
      marginTop: '0',
      fontSize: '18px',
    },
  }
</script>

<style scoped></style>
