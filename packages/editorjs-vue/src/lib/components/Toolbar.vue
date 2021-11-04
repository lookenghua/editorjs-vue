<template>
  <div class="toolbar">
    <Popper placement="bottom-start">
      <div class="toolbar-icon" v-html="icons.heading"></div>
      <template #tooltip>
        <div class="heading-list">
          <div class="heading-item" @click="handleClickHeading(1)">
            <div class="icon" v-html="icons.h1"></div>
            <div class="name">一级标题</div>
          </div>
          <div class="heading-item" @click="handleClickHeading(2)">
            <div class="icon" v-html="icons.h2"></div>
            <div class="name">二级标题</div>
          </div>
          <div class="heading-item" @click="handleClickHeading(3)">
            <div class="icon" v-html="icons.h3"></div>
            <div class="name">三级标题</div>
          </div>
          <div class="heading-item" @click="handleClickHeading(4)">
            <div class="icon" v-html="icons.h4"></div>
            <div class="name">四级标题</div>
          </div>
          <div class="heading-item" @click="handleClickHeading(5)">
            <div class="icon" v-html="icons.h5"></div>
            <div class="name">五级标题</div>
          </div>
          <div class="heading-item" @click="handleClickHeading(6)">
            <div class="icon" v-html="icons.h6"></div>
            <div class="name">六级标题</div>
          </div>
        </div>
      </template>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="引用">
      <div
        class="toolbar-icon"
        @click="callMethod('insert', 'quote')"
        v-html="icons.doubleQuote"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="分割线">
      <div
        class="toolbar-icon"
        @click="callMethod('insert', 'separator')"
        v-html="icons.separator"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="代码">
      <div class="toolbar-icon" @click="callMethod('insert', 'code')" v-html="icons.code"></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="图片">
      <div class="toolbar-icon" @click="callMethod('insert', 'image')" v-html="icons.image"></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="附件">
      <div
        class="toolbar-icon"
        @click="callMethod('insert', 'attachment')"
        v-html="icons.attachment"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="无序列表">
      <div
        class="toolbar-icon"
        @click="callMethod('insert', 'unordered-list')"
        v-html="icons.listUnordered"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="有序列表">
      <div
        class="toolbar-icon"
        @click="callMethod('insert', 'ordered-list')"
        v-html="icons.listOrdered"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="待办">
      <div class="toolbar-icon" @click="callMethod('insert', 'todo')" v-html="icons.todo"></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="表格">
      <div class="toolbar-icon" @click="callMethod('insert', 'table')" v-html="icons.table"></div>
    </Popper>
    <div style="flex: 1"></div>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="目录">
      <div
        class="toolbar-icon"
        @click="callMethod('directive', 'contents')"
        v-html="icons.contents"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="帮助">
      <div class="toolbar-icon" @click="callMethod('directive', 'help')" v-html="icons.help"></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="仅编辑区">
      <div
        class="toolbar-icon"
        @click="callMethod('directive', 'only-left')"
        v-html="icons.showLeft"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="仅预览区">
      <div
        class="toolbar-icon"
        @click="callMethod('directive', 'only-right')"
        v-html="icons.showRight"
      ></div>
    </Popper>
    <Popper placement="top" :offset="[0, 8]" :close-delay="0" title="全屏">
      <div
        class="toolbar-icon"
        @click="callMethod('directive', 'fullscreen')"
        v-html="icons.fullscreen"
      ></div>
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
  import { MethodType } from '../type'
  import icons from './svg-icons'
  import Popper from './Popper.vue'

  const emit = defineEmits(['method'])

  // 点击方法
  function callMethod(methodType: MethodType, method: string) {
    emit('method', { methodType, method })
  }

  // 点击标题
  function handleClickHeading(level: number) {
    emit('method', { methodType: 'insert', method: 'heading' + level })
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
  .heading-list {
    background: white;
    padding: 5px 0;
    .heading-item {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      cursor: pointer;
      pointer-events: initial;
      &:hover {
        background: #dbdbe8;
      }
      .icon {
        margin-right: 5px;
        display: flex;
        align-items: center;
        ::v-deep(svg) {
          width: 18px;
          height: 18px;
        }
      }
      .name {
        color: #333;
        font-size: 16px;
      }
    }
  }
</style>
