<template>
  <h1 v-if="level === 1">{{ title }}</h1>
  <h2 v-else-if="level === 2">{{ title }}</h2>
  <h3 v-else-if="level === 3">{{ title }}</h3>
  <h4 v-else-if="level === 4">{{ title }}</h4>
  <h5 v-else-if="level === 5">{{ title }}</h5>
  <h6 v-else>{{ title }}</h6>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'HeaderBlock' })
</script>
<script setup lang="ts">
  import { toRefs } from 'vue'

  const props = withDefaults(defineProps<{ title: string; level: number }>(), {
    title: '',
    level: 6,
  })
  const { title, level } = toRefs(props)
</script>

<style scoped></style>
