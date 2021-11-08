<template>
  <div class="editor-area">
    <Toolbar ref="toolbarRef" @method="handleMethod" />
    <div class="body">
      <div v-show="state.showEditor" class="editor-body">
        <Scroll ref="leftScrollRef" @scroll="handleEditorAreaScroll">
          <div ref="editorRef" class="editor"></div>
        </Scroll>
      </div>
      <div v-show="state.showPreview" class="editor-preview">
        <Scroll ref="rightScrollRef" @scroll="handlePreviewAreaScroll">
          <VHTMLPreview ref="previewRef" :data="editorData" />
        </Scroll>
      </div>
      <Sidebar v-if="state.showContent" :data="editorData" @close="handleCloseContents" />
    </div>
    <div class="footer">
      <span>字数:0 &emsp;行数:1</span>
      <div style="display: flex; align-items: center">
        <input v-model="isSyncScroll" type="checkbox" class="checkbox" />
        <span class="text1">同步滚动</span>
        &emsp;
        <span class="text2" @click="backToTop">回到顶部</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({ name: 'Editor' })
</script>
<script setup lang="ts">
  import { createApp, onMounted, reactive, watch } from 'vue'
  import { EditorData, MethodType, uploadAttachesFunc, UploadImagesFunc } from './type'
  import { LogUtil } from './logger'
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
  import Sidebar from './components/Sidebar.vue'
  import Table from '@editorjs/table'
  import Toolbar from './components/Toolbar.vue'
  import Underline from '@editorjs/underline'
  import VHTMLPreview from './preview/VHTMLPreview.vue'
  import Warning from '@editorjs/warning'

  const props = withDefaults(
    defineProps<{
      value: EditorData
      uploadAttaches: uploadAttachesFunc
      uploadImages: UploadImagesFunc
    }>(),
    {
      value: () => ({ time: 0, version: '2.22.2', blocks: [] }),
    }
  )

  const emit = defineEmits(['update:value'])

  defineExpose({
    getOuterHTML,
  })

  let editorRef = $ref<HTMLElement | null>(null)
  let previewRef = $ref<InstanceType<typeof VHTMLPreview> | null>(null)
  let leftScrollRef = $ref<InstanceType<typeof Scroll> | null>(null)
  let rightScrollRef = $ref<InstanceType<typeof Scroll> | null>(null)
  let toolbarRef = $ref<(InstanceType<typeof Toolbar> & { hiddenContents: () => void }) | null>(
    null
  )
  let isSyncScroll = $ref(true)
  let editor: EditorJS
  let editorData = $ref<OutputData>({ version: '2.22.2', time: new Date().getTime(), blocks: [] })
  let editorMutationObserver: MutationObserver
  let previewMutationObserver: MutationObserver
  let editorChildrenHeight = $ref<number[]>([])
  let previewChildrenHeight = $ref<number[]>([])
  let isEditorScroll = false
  let isPreviewScroll = false
  let _timer1: ReturnType<typeof setTimeout>
  let _timer2: ReturnType<typeof setTimeout>
  const state = reactive({
    showContent: false,
    showEditor: true,
    showPreview: true,
  })

  watch(
    () => props.value,
    (val) => {
      editorData = val
    },
    { immediate: true }
  )

  watch(
    () => editorData,
    (val) => {
      emit('update:value', val)
    },
    { deep: true, immediate: false }
  )

  // 保存数据
  function saveData() {
    editor.save().then((data) => {
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
      blocks[insertIndex - 1]?.scrollIntoView()
    } else if (methodType === 'directive') {
      if (method === 'contents') {
        state.showContent = true
      } else if (method === 'hidden-contents') {
        state.showContent = false
      } else if (method === 'only-editor') {
        state.showEditor = true
        state.showPreview = false
      } else if (method === 'only-preview') {
        state.showEditor = false
        state.showPreview = true
      } else if (method === 'default-layout') {
        state.showEditor = true
        state.showPreview = true
      }
    }
  }

  // 监听编辑区域滚动
  function handleEditorAreaScroll(e: Event) {
    if (isSyncScroll) {
      if (isPreviewScroll) {
        isEditorScroll = false
        return
      }
      if (_timer1) {
        clearTimeout(_timer1)
      }
      isEditorScroll = true
      const el = e.target as HTMLElement
      LogUtil.i(`编辑区域滚动距离:${el.scrollTop}`)
      const index = getScrollIndex(el.scrollTop, editorChildrenHeight)
      LogUtil.i(`编辑区域滚动元素序号:${index}`)
      const scrollTop = getPreviewScrollTop(index, el.scrollTop)
      LogUtil.i(`预览区域应滚动${scrollTop}`)
      rightScrollRef!.$el.scrollTop = scrollTop
      _timer1 = setTimeout(() => {
        isEditorScroll = false
      }, 300)
    }
  }

  // 监听预览区滚动
  function handlePreviewAreaScroll(e: Event) {
    if (isSyncScroll) {
      if (isEditorScroll) {
        isPreviewScroll = false
        return
      }
      if (_timer2) {
        clearTimeout(_timer2)
      }
      isPreviewScroll = true
      const el = e.target as HTMLElement
      LogUtil.i(`预览区域滚动距离:${el.scrollTop}`)
      const index = getScrollIndex(el.scrollTop, previewChildrenHeight)
      LogUtil.i(`预览区域滚动元素序号:${index}`)
      const scrollTop = getEditorScrollTop(index, el.scrollTop)
      LogUtil.i(`编辑区域应滚动${scrollTop}`)
      leftScrollRef!.$el.scrollTop = scrollTop
      _timer2 = setTimeout(() => {
        isPreviewScroll = false
      }, 300)
    }
  }

  // 监听编辑器区变化
  function handleEditorAreaChange(mutations: MutationRecord[]) {
    LogUtil.i(`编辑区域高度变化`)
    const children = editorRef?.querySelector('.codex-editor__redactor')?.children
    editorChildrenHeight = getChildrenHeight(children)
  }

  // 监听预览区变化
  function handlePreviewAreaChange(mutations: MutationRecord[]) {
    LogUtil.i(`预览区域高度变化`)
    const children = previewRef!.$el.children
    previewChildrenHeight = getChildrenHeight(children)
  }

  // 获取子元素高度
  function getChildrenHeight(children?: HTMLCollection) {
    const list = []
    if (children) {
      for (let el of children) {
        const style = window.getComputedStyle(el)
        const client = el.getBoundingClientRect()
        list.push(client.height + parseInt(style.marginTop, 8) + parseInt(style.marginBottom, 8))
      }
    }
    return list
  }

  // 获取滚动到哪个子元素
  function getScrollIndex(scrollTop: number, list: number[]) {
    let scrollHeight = 0
    for (let i = 0; i < list.length; i++) {
      scrollHeight += list[i]
      if (scrollHeight >= scrollTop) {
        return i
      }
    }
    return 0
  }

  // 获取预览区域滚动距离
  function getPreviewScrollTop(scrollIndex: number, currentScrollTop: number) {
    let scrollTop = 0,
      scrollTop1 = 0
    for (let i = 0; i < scrollIndex; i++) {
      scrollTop += previewChildrenHeight[i]
      scrollTop1 += editorChildrenHeight[i]
    }

    scrollTop +=
      ((currentScrollTop - scrollTop1) / editorChildrenHeight[scrollIndex]) *
      previewChildrenHeight[scrollIndex]
    return scrollTop
  }

  // 获取预览区域滚动距离
  function getEditorScrollTop(scrollIndex: number, currentScrollTop: number) {
    let scrollTop = 0,
      scrollTop1 = 0
    for (let i = 0; i < scrollIndex; i++) {
      scrollTop += editorChildrenHeight[i]
      scrollTop1 += previewChildrenHeight[i]
    }

    scrollTop +=
      ((currentScrollTop - scrollTop1) / previewChildrenHeight[scrollIndex]) *
      editorChildrenHeight[scrollIndex]
    return scrollTop
  }

  // 回到顶部
  function backToTop() {
    leftScrollRef!.$el.scrollTop = 0
    rightScrollRef!.$el.scrollTop = 0
  }

  // 关闭目录
  function handleCloseContents() {
    state.showContent = false
    toolbarRef?.hiddenContents()
  }
  onMounted(() => {
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
                const res = await props.uploadAttaches(file)
                return {
                  success: res.success,
                  file: {
                    title: file.name,
                    name: file.name,
                    size: file.size,
                    ...res.file,
                  },
                }
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
      data: props.value,
      i18n: i18nConf,
      onReady: () => {
        saveData()
      },
      onChange: () => {
        saveData()
      },
    })
    editorMutationObserver = new MutationObserver(handleEditorAreaChange)
    editorMutationObserver.observe(editorRef!, {
      characterData: true,
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['height'],
    })
    previewMutationObserver = new MutationObserver(handlePreviewAreaChange)
    previewMutationObserver.observe(previewRef!.$el, {
      characterData: true,
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['height'],
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
        padding: 20px 16px;
        box-sizing: border-box;
        background-color: #fafbfc;
      }
      .editor-preview {
        flex: 1;
        height: 100%;
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
