<template>
  <div
    style="
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding: 16px;
      margin: 16px 0;
    "
  >
    <img v-if="extension === 'jpeg'" src="./icons/jpg.png" alt="" style="height: 40px" />
    <img v-else-if="extension === 'png'" src="./icons/png.png" alt="" style="height: 40px" />
    <div class="flex-1 ml-4" style="flex: 1; margin-left: 16px">
      <div class="overflow-ellipsis">{{ name }}</div>
      <div>{{ formatBytes(size) }}</div>
    </div>
    <a :href="url" title="点击下载">
      <svg
        t="1635218096119"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2461"
        width="40"
        height="40"
      >
        <path
          d="M200 834h632v88a8 8 0 0 1-8 8H192v-88a8 8 0 0 1 8-8z m239-262.037V185c0-13.255 10.745-24 24-24h104v401.473l141.997-137.148c9.534-9.209 24.728-8.945 33.936 0.59l0.004 0.003 72.205 74.799-304.959 294.546c-9.534 9.208-24.728 8.944-33.936-0.59l-0.003-0.004-71.859-74.44-0.063 0.062-205.587-212.927c-9.206-9.534-8.941-24.724 0.59-33.932l74.782-72.246L439 571.963z"
          p-id="2462"
        />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
  import { formatBytes } from '../../utils/util'
  import { toRefs } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      default: '',
    },
    extension: {
      type: String,
      default: '',
    },
  })
  const { name, size, url, extension } = toRefs(props)
</script>

<style scoped lang="scss"></style>
