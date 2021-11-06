<template>
  <div class="sidebar">
    <div class="title">目录</div>
    <div class="icon-close" @click="closeContents">
      <svg
        t="1636088313608"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2422"
        width="200"
        height="200"
      >
        <path
          d="M512 421.490332 149.590238 59.08057C125.311473 34.801805 84.445226 34.458094 59.45166 59.45166 34.283863 84.619457 34.292235 124.801903 59.08057 149.590238L421.490332 512 59.080706 874.409626C34.801623 898.688709 34.45832 939.555 59.45166 964.54834 84.619683 989.716363 124.801677 989.707991 149.590374 964.919294L512 602.509668 874.409762 964.91943C898.688527 989.198195 939.554774 989.541906 964.54834 964.54834 989.716137 939.380543 989.707765 899.198097 964.91943 874.409762L602.509668 512 964.919294 149.590374C989.198377 125.311291 989.54168 84.445 964.54834 59.45166 939.380317 34.283637 899.198323 34.292009 874.409626 59.080706L512 421.490332Z"
          p-id="2423"
        />
      </svg>
    </div>
    <ul>
      <li
        v-for="(item, index) in headers"
        :key="index"
        :class="[`toc-${item.data.level}`, activeId === item.id ? 'toc-active' : '']"
        >{{ item.data.text }}</li
      >
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { EditorData } from '../type'

  const props = defineProps<{ data: EditorData; activeId?: string }>()
  const headers = computed(() => props.data.blocks.filter((it) => it.type === 'header'))
  const emit = defineEmits(['close'])

  // 关闭目录
  function closeContents() {
    emit('close')
  }
</script>

<style scoped lang="scss">
  .sidebar {
    width: 280px;
    border-left: 1px solid #ccc;
    padding: 16px;
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .icon-close {
      position: absolute;
      top: 16px;
      right: 16px;

      svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    .toc-1 {
      padding-left: 8px;
    }
    .toc-2 {
      padding-left: 24px;
    }
    .toc-3 {
      padding-left: 40px;
    }
    .toc-4 {
      padding-left: 56px;
    }
    .toc-5 {
      padding-left: 72px;
    }
    .toc-6 {
      padding-left: 88px;
    }
    .toc-active {
      color: #0366d6;
      background-color: #f6f8fa;
    }
    ul {
      padding-left: 0;
      color: #959da5;
    }
    li {
      list-style: none;
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 2;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>
