<template>
  <pre :class="`line-numbers`">
    <code :class="`language-${language}`" v-html="html"></code>
  </pre>
</template>

<script setup lang="ts">
  import './css/prism.css'
  import { onMounted, watchEffect } from 'vue'
  import Prism from 'prismjs'

  const props = withDefaults(defineProps<{ code: string; language: string }>(), {
    code: '',
    language: '',
  })
  const config: Record<string, string> = {
    bash: 'bash',
    c: 'c',
    'c++': 'cpp',
    'c#': 'csharp',
    css: 'css',
    dart: 'dart',
    git: 'git',
    go: 'go',
    graphql: 'graphql',
    html: 'markup',
    java: 'java',
    javascript: 'javascript',
    json: 'json',
    jsx: 'jsx',
    kotlin: 'kotlin',
    less: 'less',
    lua: 'lua',
    mongodb: 'mongodb',
    markdown: 'markdown',
    php: 'php',
    python: 'python',
    scss: 'scss',
    sql: 'sql',
    swift: 'swift',
    typescript: 'typescript',
    yaml: 'yaml',
  }
  let html = $ref('')

  watchEffect(() => {
    const language = config[props.language]
    html = Prism.highlight(props.code, Prism.languages.javascript, language)
  })

  onMounted(() => {
    const language = config[props.language]
    html = Prism.highlight(props.code, Prism.languages.javascript, language)
  })
</script>

<style scoped></style>
