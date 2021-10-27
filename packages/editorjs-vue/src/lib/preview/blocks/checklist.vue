<template>
  <ul class="task-list">
    <li v-for="(item, i) in props.data" :key="i">
      <input type="checkbox" :checked="item.checked" disabled />{{ item.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ChecklisItem } from '../../type'
  import { PropType } from 'vue'

  const props = defineProps({
    data: {
      type: Array as PropType<ChecklisItem[]>,
      default: () => [],
    },
  })
</script>

<style scoped></style>
