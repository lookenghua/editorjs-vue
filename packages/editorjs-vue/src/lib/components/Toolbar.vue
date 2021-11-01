<template>
  <div class="toolbar">
    <div class="toolbar-icon" v-html="icons.heading"></div>
    <Popper title="引用">
      <div class="toolbar-icon" @click="callMethod('quote')" v-html="icons.doubleQuote"></div>
    </Popper>
    <Popper title="分割线">
      <div class="toolbar-icon" @click="callMethod('separator')" v-html="icons.separator"></div>
    </Popper>
    <Popper title="代码">
      <div class="toolbar-icon" @click="callMethod('code')" v-html="icons.code"></div>
    </Popper>
    <Popper title="图片">
      <div class="toolbar-icon" @click="callMethod('image')" v-html="icons.image"></div>
    </Popper>
    <Popper title="附件">
      <div class="toolbar-icon" @click="callMethod('attachment')" v-html="icons.attachment"></div>
    </Popper>
    <Popper title="无序列表">
      <div
        class="toolbar-icon"
        @click="callMethod('unordered-list')"
        v-html="icons.listUnordered"
      ></div>
    </Popper>
    <Popper title="有序列表">
      <div
        class="toolbar-icon"
        @click="callMethod('ordered-list')"
        v-html="icons.listOrdered"
      ></div>
    </Popper>
    <Popper title="待办">
      <div class="toolbar-icon" @click="callMethod('todo')" v-html="icons.todo"></div>
    </Popper>
    <Popper title="表格">
      <div class="toolbar-icon" @click="callMethod('table')" v-html="icons.table"></div>
    </Popper>

    <div style="flex: 1"></div>
    <Popper title="目录">
      <div class="toolbar-icon" @click="callMethod('contents')" v-html="icons.contents"></div>
    </Popper>
    <Popper title="帮助">
      <div class="toolbar-icon" @click="callMethod('help')" v-html="icons.help"></div>
    </Popper>
    <Popper title="仅编辑区">
      <div class="toolbar-icon" @click="callMethod('only-left')" v-html="icons.showLeft"></div>
    </Popper>
    <Popper title="仅预览区">
      <div class="toolbar-icon" @click="callMethod('only-right')" v-html="icons.showRight"></div>
    </Popper>
    <Popper title="全屏">
      <div class="toolbar-icon" @click="callMethod('fullscreen')" v-html="icons.fullscreen"></div>
    </Popper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Toolbar',
  })
</script>
<script setup lang="ts">
  import icons from './svg-icons'
  import Popper from './Popper.vue'

  const emit = defineEmits(['method'])

  // 点击方法
  function callMethod(method: string) {
    emit('method', method)
  }
</script>

<style scoped lang="scss">
  .toolbar {
    padding: 4px 12px;
    border-bottom: 1px solid #e1e4e8;
    background-color: #fafbfc;
    display: flex;
    align-items: center;
    .toolbar-icon {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 6px;
      margin-right: 6px;
      height: 30px;
      padding: 0 3px;

      &:hover {
        background-color: #e1e4e8;
      }
      ::v-deep(svg) {
      }
    }
  }
</style>
