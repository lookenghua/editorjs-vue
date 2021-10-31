<template>
  <div class="editor-area">
    <div class="editor-body">
      <div ref="editorRef" class="editor"></div>
    </div>
    <div class="editor-preview">
      <VHTMLPreview :data="editorData" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'Editor' })
</script>
<script setup lang="ts">
  import './config/tools/attaches.scss'
  import { EditorData, uploadAttachesFunc, UploadImagesFunc } from './type'
  import { onMounted, watch } from 'vue'
  import AttachesTool from '@editorjs/attaches'
  import Checklist from '@editorjs/checklist'
  import Code from 'editorjs-code'
  import Delimiter from '@editorjs/delimiter'
  import EditorJS from '@editorjs/editorjs'
  import FootnotesTune from '@editorjs/footnotes'
  import Header from '@editorjs/header'
  import i18nConf from './config/i18n'
  import ImageTool from '@editorjs/image'
  import InlineCode from '@editorjs/inline-code'
  import NestedList from '@editorjs/nested-list'
  import Paragraph from '@editorjs/paragraph'
  import Quote from '@editorjs/quote'
  import Table from '@editorjs/table'
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

  defineExpose({})

  let editorRef = $ref<HTMLElement | null>(null)
  let editor: EditorJS
  let editorData = $ref({})

  watch(
    () => editorData,
    (val) => {
      emit('change', val)
    },
    { deep: true, immediate: true }
  )

  function saveData() {
    editor.save().then((data) => {
      console.log(JSON.stringify(data))
      editorData = data
    })
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
    display: flex;
    height: 600px;
    border: 1px solid #ccc;
    box-sizing: border-box;

    .editor-body {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      padding: 20px 16px;
      box-sizing: border-box;
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
</style>
