<script setup lang="ts">
  import { Editor } from './lib'
  import { EditorData, UploadImagesFunc } from './lib/type'

  const data: EditorData = {
    time: 1635408432896,
    blocks: [
      {
        id: 'gutX5SP5MR',
        type: 'header',
        data: { text: '一级标题', level: 1 },
        tunes: { footnotes: [] },
      },
      {
        id: 'm99hFhzARo',
        type: 'header',
        data: { text: '二级标题', level: 2 },
        tunes: { footnotes: [] },
      },
      {
        id: 'KICcjqXrqR',
        type: 'header',
        data: { text: '三级标题', level: 3 },
        tunes: { footnotes: [] },
      },
      {
        id: 'vf8b-LqeLr',
        type: 'header',
        data: { text: '四级标题', level: 4 },
        tunes: { footnotes: [] },
      },
      {
        id: '51yE3HhqSE',
        type: 'header',
        data: { text: '五级标题', level: 5 },
        tunes: { footnotes: [] },
      },
      {
        id: 'J34njGp7HU',
        type: 'header',
        data: { text: '六级标题', level: 6 },
        tunes: { footnotes: [] },
      },
      {
        id: 'sffZzwvjZp',
        type: 'paragraph',
        data: {
          text: '这是一段文字<sup data-tune="footnotes" data-id="cWwFSz">1</sup>,有<b>加粗</b>、<i>倾斜</i>、<code class="inline-code">行内代码</code>、<a href="http://www.baidu.com">链接<sup data-tune="footnotes" data-id="L0NcL5">2</sup></a>、<u class="cdx-underline">下划线</u>',
        },
        tunes: {
          footnotes: [
            { id: 'cWwFSz', content: '测试', superscript: 1 },
            { id: 'L0NcL5', content: '2222', superscript: 2 },
          ],
        },
      },
      {
        id: 'QOykC-p_bh',
        type: 'quote',
        data: {
          text: 'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.',
          caption: 'Aldous Huxley, Brave New World',
          alignment: 'left',
        },
      },
      { id: 'tZu2q5RGTE', type: 'warning', data: { title: '警告标题', message: '警告内容' } },
      {
        id: 'vEq1BrRpFD',
        type: 'table',
        data: {
          withHeadings: true,
          content: [
            ['姓名', '年龄', '体重'],
            ['12', '12', '12'],
          ],
        },
      },
      { id: 'gVg9w7lZb0', type: 'delimiter', data: {} },
      {
        id: '7Pln36gDqf',
        type: 'checklist',
        data: {
          items: [
            { text: '待办1', checked: false },
            { text: '待办2', checked: true },
          ],
        },
      },
      {
        id: '5amsoWyCo0',
        type: 'list',
        data: {
          style: 'ordered',
          items: [
            { content: '一级列表', items: [] },
            {
              content: '一级列表',
              items: [
                {
                  content: '二级列表',
                  items: [
                    { content: '三级列表', items: [] },
                    {
                      content: '三级列表',
                      items: [{ content: '四级列表', items: [{ content: '五级列表', items: [] }] }],
                    },
                    { content: '三级列表', items: [] },
                  ],
                },
                { content: '二级列表', items: [{ content: '三级列表', items: [] }] },
              ],
            },
          ],
        },
      },
      {
        id: 'HxCgWl2FKf',
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            { content: '一级列表', items: [] },
            { content: '二级列表', items: [] },
            {
              content: '三级列表',
              items: [
                { content: '一级列表', items: [] },
                { content: '二级列表', items: [] },
              ],
            },
          ],
        },
      },
      {
        id: 'ycbQ3sda87',
        type: 'attaches',
        data: {
          file: { url: '123', name: '96.png', extension: 'png', size: 5127 },
          title: '96.png',
        },
      },
      {
        id: 'ehpSI3vBhy',
        type: 'image',
        data: {
          file: { url: 'https://cdn.pixabay.com/photo/2021/10/23/16/31/italy-6735340_960_720.jpg' },
          caption: '测试',
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      { id: 'qa5BrV4DpI', type: 'code', data: { code: 'const a = 1;', language: 'javascript' } },
      { id: 'qa5BrV5DpI', type: 'code', data: { code: '.code{width:"100%"}', language: 'css' } },
    ],
    version: '2.22.2',
  }
  function handleUploadAttaches(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return fetch('/api/upload/file', { method: 'POST', body: formData })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        console.log('Success:', response)
        return {
          success: 1,
          file: {
            url: response.data,
            title: file.name,
            size: file.size,
            name: file.name,
          },
        }
      })
  }

  const handleUploadImages: UploadImagesFunc = () => {
    const formData = new FormData()
    return fetch('/api/upload/file', { method: 'POST', body: formData })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        console.log('Success:', response)
        return {
          success: 1,
          file: {
            url: String(response.data),
          },
        }
      })
  }
</script>

<template>
  <h1>Demo</h1>
  <Editor
    :data="data"
    :upload-attaches="handleUploadAttaches"
    :upload-images="handleUploadImages"
  />
</template>

<style></style>
