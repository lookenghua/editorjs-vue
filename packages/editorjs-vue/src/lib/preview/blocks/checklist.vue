<template>
  <ul class="task-list">
    <li v-for="(item, i) in props.data" :key="i">
      <input type="checkbox" :checked="item.checked" disabled />{{ item.text }}
    </li>
  </ul>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'ChecklistBlock' })
</script>
<script setup lang="ts">
  import { ChecklisItem } from '../../type'

  const props = withDefaults(defineProps<{ data: ChecklisItem[] }>(), { data: () => [] })
</script>

<style scoped></style>
