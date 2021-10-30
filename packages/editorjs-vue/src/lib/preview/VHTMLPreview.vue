<template>
  <div class="preview-body">
    <template v-for="(item, i) in blocks" :key="i">
      <Paragraph v-if="item.type === 'paragraph'" :id="item.id" :text="item.data.text" />
      <Attaches
        v-else-if="item.type === 'attaches'"
        :id="item.id"
        :name="item.data.title"
        :size="item.data.file.size"
        :extension="item.data.file.extension"
        :url="item.data.file.url"
      />
      <Warning
        v-else-if="item.type === 'warning'"
        :id="item.id"
        :title="item.data.title"
        :message="item.data.message"
      />
      <Table
        v-else-if="item.type === 'table'"
        :id="item.id"
        :with-headings="item.data.withHeadings"
        :content="item.data.content"
      />
      <Delimiter v-else-if="item.type === 'delimiter'" :id="item.id" />
      <Header
        v-else-if="item.type === 'header'"
        :id="item.id"
        :level="item.data.level"
        :title="item.data.text"
      />
      <Checklist v-else-if="item.type === 'checklist'" :id="item.id" :data="item.data.items" />
      <List
        v-else-if="item.type === 'list'"
        :id="item.id"
        :style="item.data.style"
        :data="item.data.items"
      />
      <Quote
        v-else-if="item.type === 'quote'"
        :id="item.id"
        :text="item.data.text"
        :caption="item.data.caption"
        :alignment="item.data.alignment"
      />
      <Image v-else-if="item.type === 'image'" :id="item.id" :info="item" />
      <Code
        v-else-if="item.type === 'code'"
        :id="item.id"
        :code="item.data.code"
        :language="item.data.language"
      />
    </template>
    <Footnotes :data="blocks" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'Viewer' })
</script>
<script setup lang="ts">
  import './style/base.scss'
  import { Block, EditorData } from '../type'
  import { computed } from 'vue'
  import Attaches from './blocks/attaches.vue'
  import Checklist from './blocks/checklist.vue'
  import Code from './blocks/code.vue'
  import Delimiter from './blocks/delimiter.vue'
  import Footnotes from './blocks/footnotes.vue'
  import Header from './blocks/header.vue'
  import Image from './blocks/Image.vue'
  import List from './blocks/list.vue'
  import Paragraph from './blocks/paragraph.vue'
  import Quote from './blocks/quote.vue'
  import Table from './blocks/table.vue'
  import Warning from './blocks/warning.vue'

  const props = withDefaults(defineProps<{ data: EditorData }>(), {})
  const blocks = computed<Block[]>(() => props.data.blocks || [])
</script>

<style scoped lang="scss">
  ::v-deep(.cdx-underline) {
  }
  ::v-deep(.inline-code) {
  }
  ::v-deep([data-tune='footnotes']) {
  }
</style>
