/// <reference types="vite/client" />
/// <reference types="vue/ref-macros" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@editorjs/attaches' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/checklist' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}

declare module '@editorjs/header' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/inline-code' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/paragraph' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/quote' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/table' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/warning' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/delimiter' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/underline' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/nested-list' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
declare module '@editorjs/image' {
  import { ToolConstructable } from '@editorjs/editorjs'

  const tool: ToolConstructable
  export default tool
}
