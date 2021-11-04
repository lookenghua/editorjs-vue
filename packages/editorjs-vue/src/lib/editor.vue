<template>
  <div class="editor-area">
    <Toolbar @method="handleMethod" />
    <div class="body">
      <div class="editor-body">
        <Scroll>
          <div ref="editorRef" class="editor"></div>
        </Scroll>
      </div>
      <div class="editor-preview">
        <VHTMLPreview :data="editorData" />
      </div>
    </div>
    <div class="footer">
      <span>字数:0 &emsp;行数:1</span>
      <div style="display: flex; align-items: center">
        <input type="checkbox" class="checkbox" />
        <span class="text1">同步滚动</span>
        &emsp;
        <span class="text2">回到顶部</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'Editor' })
</script>
<script setup lang="ts">
  import './config/tools/attaches.scss'
  import { createApp, onMounted, watch } from 'vue'
  import { EditorData, uploadAttachesFunc, UploadImagesFunc } from './type'
  import AttachesTool from '@editorjs/attaches'
  import Checklist from '@editorjs/checklist'
  import Code from 'editorjs-code'
  import Delimiter from '@editorjs/delimiter'
  import EditorJS, { OutputData } from '@editorjs/editorjs'
  import FootnotesTune from '@editorjs/footnotes'
  import Header from '@editorjs/header'
  import i18nConf from './config/i18n'
  import ImageTool from '@editorjs/image'
  import InlineCode from '@editorjs/inline-code'
  import NestedList from '@editorjs/nested-list'
  import Paragraph from '@editorjs/paragraph'
  import Quote from '@editorjs/quote'
  import Scroll from './components/Scroll.vue'
  import Table from '@editorjs/table'
  import Toolbar from './components/Toolbar.vue'
  import Underline from '@editorjs/underline'
  import VHTMLPreview from './preview/VHTMLPreview.vue'
  import Warning from '@editorjs/warning'

  const props = withDefaults(
    defineProps<{
      data: EditorData
      uploadAttaches: uploadAttachesFunc
      uploadImages: UploadImagesFunc
    }>(),
    {
      data: () => ({ time: 0, version: '2.22.2', blocks: [] }),
    }
  )

  const emit = defineEmits(['change'])

  defineExpose({
    getOuterHTML,
  })

  let editorRef = $ref<HTMLElement | null>(null)
  let editor: EditorJS
  let editorData = $ref<OutputData>({ version: '2.22.2', time: new Date().getTime(), blocks: [] })

  watch(
    () => editorData,
    (val) => {
      emit('change', val)
    },
    { deep: true, immediate: true }
  )

  // 保存数据
  function saveData() {
    editor.save().then((data) => {
      console.log(JSON.stringify(data), data)
      editorData = data
    })
  }

  // 获取渲染后的html
  function getOuterHTML(): string {
    const div = document.createElement('div')
    const app = createApp(VHTMLPreview, { data: editorData })
    return app.mount(div).$el.outerHTML
  }

  // 点击工具栏
  function handleMethod({ methodType, method }: { methodType: MethodType; method: string }) {
    const count = editorData.blocks.length | 0
    const currentBlockIndex = editor?.blocks.getCurrentBlockIndex()
    const insertIndex = currentBlockIndex < 0 ? (count > 0 ? count : 0) : currentBlockIndex
    if (methodType === 'insert') {
      if (method === 'quote') {
        // 引用
        editor?.blocks.insert('quote', { text: '', caption: '' }, null, insertIndex, true)
      } else if (method === 'separator') {
        // 分割线
        editor?.blocks.insert('delimiter', {}, null, insertIndex, false)
      } else if (method === 'code') {
        // 代码
        editor?.blocks.insert('code', { code: '', language: 'javascript' }, null, insertIndex, true)
      } else if (method === 'image') {
        // 图片
        editor?.blocks.insert('image', {}, null, insertIndex, true)
      } else if (method === 'attachment') {
        // 附件
        editor?.blocks.insert('attaches', {}, null, insertIndex, true)
      } else if (method === 'unordered-list') {
        // 无序列表
        editor?.blocks.insert('list', { style: 'unordered', items: [] }, null, insertIndex, true)
      } else if (method === 'ordered-list') {
        // 有序列表
        editor?.blocks.insert('list', { style: 'ordered', items: [] }, null, insertIndex, true)
      } else if (method === 'todo') {
        // 待办
        editor?.blocks.insert(
          'checklist',
          { items: [{ text: '', checked: '' }] },
          null,
          insertIndex,
          true
        )
      } else if (method === 'table') {
        // 表格
        editor?.blocks.insert('table', { items: [] }, null, insertIndex, true)
      } else if (method.startsWith('heading')) {
        const level = parseInt(method.replace('heading', ''), 8)
        editor?.blocks.insert('header', { text: '请输入标题', level }, null, insertIndex, true)
      }
      const blocks = editorRef?.querySelectorAll('.ce-block')!
      blocks[insertIndex - 1].scrollIntoView()
    }
  }

  onMounted(() => {
    editorData = props.data
    editor = new EditorJS({
      holder: editorRef!,
      placeholder: '开始写作吧!',
      tools: {
        // 标题
        header: {
          class: Header,
          tunes: ['footnotes'],
        },
        // 段落
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: '请输入文字',
          },
          tunes: ['footnotes'],
        },
        // 警告
        warning: {
          class: Warning,
          inlineToolbar: true,
          config: {
            titlePlaceholder: '标题',
            messagePlaceholder: '消息',
          },
        },
        // 表格
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        // 分隔符
        delimiter: Delimiter,
        // 行内代码块
        inlineCode: {
          class: InlineCode,
        },
        // 下划线
        underline: Underline,
        // 标注
        footnotes: {
          class: FootnotesTune,
        },
        // 待办
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        // 列表
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
        // 引用
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        // 附件
        attaches: {
          class: AttachesTool,
          config: {
            buttonText: '选择文件上传',
            errorMessage: '文件上传失败',
            uploader: {
              async uploadByFile(file: File) {
                setTimeout(() => {
                  saveData()
                }, 300)
                return props.uploadAttaches(file)
              },
            },
          },
        },
        // 图片
        image: {
          class: ImageTool,
          config: {
            captionPlaceholder: '图片描述',
            uploader: {
              uploadByFile(file: File) {
                return props.uploadImages('file', file)
              },
              uploadByUrl(url: string) {
                return props.uploadImages('url', url)
              },
            },
          },
        },
        // 代码
        code: Code,
      },
      data: props.data,
      i18n: i18nConf,
      onReady: () => {
        saveData()
      },
      onChange: () => {
        saveData()
      },
    })
  })
</script>

<style scoped lang="scss">
  .editor-area {
    border: 1px solid #ccc;
    box-sizing: border-box;

    .body {
      display: flex;
      height: 600px;

      .editor-body {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        padding: 20px 16px;
        box-sizing: border-box;
        background-color: #fafbfc;
      }
      .editor-preview {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        border-left: 1px solid #ccc;
        padding: 20px 16px;
        box-sizing: border-box;
      }
    }

    .footer {
      border-top: 1px solid #e1e4e8;
      padding: 5px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input[type='checkbox'] {
        margin: 0;
      }
      .text1 {
        cursor: pointer;
        margin-left: 5px;
      }
      .text2 {
        cursor: pointer;
      }
    }
  }
</style>
