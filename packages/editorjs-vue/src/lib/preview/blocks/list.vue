<template>
  <component :is="props.style === 'ordered' ? 'ol' : 'ul'" class="nested-list">
    <li v-for="(item, i) in props.data" :key="i" class="nested-list__item">
      {{ item.content }}
      <template v-if="item.items.length > 0">
        <List :style="props.style" :data="item.items" />
      </template>
    </li>
  </component>
</template>

<script setup lang="ts">
  import { ListItem } from '../../type'
  import { PropType } from 'vue'
  import List from '../blocks/list.vue'

  const props = defineProps({
    style: {
      type: String,
      default: 'ordered',
    },
    data: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
  })
</script>

<style scoped></style>
