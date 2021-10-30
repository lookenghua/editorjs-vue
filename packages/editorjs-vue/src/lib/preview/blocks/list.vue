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
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'ListBlock' })
</script>
<script setup lang="ts">
  import { ListItem } from '../../type'
  import List from '../blocks/list.vue'

  const props = withDefaults(defineProps<{ style: string; data: ListItem[] }>(), {
    style: 'ordered',
    data: () => [],
  })
</script>

<style scoped></style>
