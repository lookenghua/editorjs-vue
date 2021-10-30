export type EditorData = {
  time: number
  version: string
  blocks: Block[]
}

export type Block =
  | ParagraphBlock
  | WarningBlock
  | TableBlock
  | DelimiterBlock
  | HeaderBlock
  | ChecklistBlock
  | ListBlock
  | QuoteBlock
  | ImageBlock
  | AttachesBlock
  | CodeBlock
interface BaseBlock {
  id: string
  type: string
  data: any
  tunes?: {
    footnotes?: Footnotes[]
  }
}
export interface ParagraphBlock extends BaseBlock {
  id: string
  type: 'paragraph'
  data: {
    text: string
  }
}
export interface WarningBlock extends BaseBlock {
  id: string
  type: 'warning'
  data: {
    title: string
    message: string
  }
}
export interface TableBlock extends BaseBlock {
  id: string
  type: 'table'
  data: {
    withHeadings: boolean
    content: string[][]
  }
}
export interface DelimiterBlock extends BaseBlock {
  id: string
  type: 'delimiter'
}
export interface HeaderBlock extends BaseBlock {
  id: string
  type: 'header'
  data: {
    text: string
    level: number
  }
}
export interface Footnotes {
  id: string
  content: string
  superscript: number
}

export interface ChecklistBlock extends BaseBlock {
  id: string
  type: 'checklist'
  data: {
    items: ChecklisItem[]
  }
}

export interface ChecklisItem {
  text: string
  checked: boolean
}

export interface ListBlock extends BaseBlock {
  id: string
  type: 'list'
  data: {
    style: 'ordered' | 'unordered'
    items: ListItem[]
  }
}

export interface ListItem {
  content: string
  items: ListItem[]
}

export interface QuoteBlock extends BaseBlock {
  id: string
  type: 'quote'
  data: {
    text: string
    caption: string
    alignment: 'left' | 'center'
  }
}
export interface uploadAttachesFunc {
  // eslint-disable-next-line no-unused-vars
  (file: File | string): Promise<{ success: number; file: { url: string } }>
}
export interface UploadImagesFunc {
  // eslint-disable-next-line no-unused-vars
  (type: string, file: File | string): Promise<{ success: number; file: { url: string } }>
}

export interface ImageBlock extends BaseBlock {
  id: string
  type: 'image'
  data: {
    file: {
      url: string
    }
    caption: string
    withBorder: boolean
    withBackground: boolean
    stretched: boolean
  }
}

export interface AttachesBlock extends BaseBlock {
  id: string
  type: 'attaches'
  data: {
    file: {
      url: string
      size: number
      name: string
      extension: string
    }
    title: string
  }
}
export interface CodeBlock extends BaseBlock {
  id: string
  type: 'code'
  data: {
    code: string
    language: string
  }
}
