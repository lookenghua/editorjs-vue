<template>
  <table>
    <thead v-if="props.withHeadings">
      <tr v-for="(tr, index) in headerList" :key="index">
        <td v-for="(td, i) in tr" :key="i" v-html="td"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr, index) in bodyList" :key="index">
        <td v-for="(td, i) in tr" :key="i" v-html="td"></td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'TableBlock' })
</script>
<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{ withHeadings: boolean; content: string[][] }>(), {
    withHeadings: false,
    content: () => [],
  })
  const headerList = computed(() =>
    props.withHeadings ? props.content?.filter((it, i) => i === 0) : []
  )
  const bodyList = computed(() =>
    props.withHeadings ? props.content?.filter((it, i) => i > 0) : props.content
  )
</script>

<style scoped></style>
