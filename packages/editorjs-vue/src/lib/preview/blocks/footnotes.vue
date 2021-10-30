<template>
  <ul class="footnotes" style="border-top: 1px solid #ccc">
    <li v-for="(item, i) in list" :id="item.id" :key="item.id" style="cursor: pointer"
      >{{ i + 1 }}.{{ item.content }}</li
    >
  </ul>
</template>

<script setup lang="ts">
  import { Block, Footnotes } from '../../type'
  import { watch } from 'vue'

  const props = withDefaults(defineProps<{ data: Block[] }>(), {
    data: () => [],
  })

  let list: Footnotes[] = $ref([])

  watch(
    () => props.data,
    () => {
      let tem: Footnotes[] = []
      props.data.forEach((item) => {
        if (item?.tunes?.footnotes) {
          item?.tunes?.footnotes.forEach((it) => {
            tem.push(it)
          })
        }
      })
      list = tem
    },
    { immediate: true }
  )

  console.log(list)
</script>

<style scoped></style>
