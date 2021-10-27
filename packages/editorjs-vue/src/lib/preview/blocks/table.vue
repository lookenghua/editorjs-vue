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

<script setup lang="ts">
  import { computed, PropType } from 'vue'

  const props = defineProps({
    withHeadings: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Array as PropType<string[][]>,
      default: () => [],
    },
  })
  const headerList = computed(() =>
    props.withHeadings ? props.content?.filter((it, i) => i === 0) : []
  )
  const bodyList = computed(() =>
    props.withHeadings ? props.content?.filter((it, i) => i > 0) : props.content
  )
</script>

<style scoped></style>
