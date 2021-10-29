// @ts-ignore
import css from './style.css?inline'
import languageList from './language'

const style = document.createElement('style')
style.innerText = css
document.head.append(style)

import { API, BlockAPI, BlockTool } from '@editorjs/editorjs'

export interface CodeToolData {
  code: string
  language: string
}
export interface CodeToolConfig {}
export default class CodeTool implements BlockTool {
  private readonly api: API
  private readonly data: CodeToolData = { code: '', language: '' }
  private readonly config: CodeToolConfig
  private readonly css: { wrapper: string; textarea: string }
  private readonly block: BlockAPI
  private readonly id: string
  constructor({
    api,
    data,
    config,
    block,
  }: {
    api: API
    data: CodeToolData
    config: CodeToolConfig
    block: BlockAPI
  }) {
    this.api = api
    this.data = data
    this.config = config
    this.block = block
    this.id = block.id
    this.css = {
      wrapper: this.api.styles.block,
      textarea: this.api.styles.input,
    }
  }

  render(): HTMLElement {
    const block = document.createElement('div')
    block.classList.add(this.css.wrapper)
    const textarea = document.createElement('textarea') as HTMLTextAreaElement
    textarea.classList.add('cdx-code__textarea')
    textarea.textContent = this.data.code
    textarea.placeholder = this.api.i18n.t('Please Enter Code!')
    textarea.onchange = (e) => {
      const target = e.target as HTMLTextAreaElement
      this.data.code = target.value
      this.api.blocks.update(this.id, this.data)
    }
    const tip = document.createElement('div') as HTMLDivElement
    tip.classList.add('cdx-code__tip')
    const text = document.createTextNode(this.api.i18n.t('Please Select Code Language:'))
    const select = document.createElement('select') as HTMLSelectElement
    select.onchange = (e) => {
      const target = e.target as HTMLSelectElement
      this.data.language = target.value
      this.api.blocks.update(this.id, this.data)
    }
    const optionFragment = document.createDocumentFragment()
    languageList.forEach((text) => {
      const option = document.createElement('option') as HTMLOptionElement
      option.label = text
      option.value = text
      option.selected = text === this.data.language
      optionFragment.append(option)
    })
    select.append(optionFragment)
    tip.append(text, select)
    block.append(tip, textarea)
    return block
  }

  save(block: HTMLElement): CodeToolData {
    const select = block.querySelector('select')!.value
    const textarea = block.querySelector('textarea')!.value
    return Object.assign(this.data, {
      code: textarea,
      language: select,
    })
  }

  static get toolbox() {
    return {
      icon: '<svg width="14" height="14" viewBox="0 -1 14 14" xmlns="http://www.w3.org/2000/svg" > <path d="M3.177 6.852c.205.253.347.572.427.954.078.372.117.844.117 1.417 0 .418.01.725.03.92.02.18.057.314.107.396.046.075.093.117.14.134.075.027.218.056.42.083a.855.855 0 0 1 .56.297c.145.167.215.38.215.636 0 .612-.432.934-1.216.934-.457 0-.87-.087-1.233-.262a1.995 1.995 0 0 1-.853-.751 2.09 2.09 0 0 1-.305-1.097c-.014-.648-.029-1.168-.043-1.56-.013-.383-.034-.631-.06-.733-.064-.263-.158-.455-.276-.578a2.163 2.163 0 0 0-.505-.376c-.238-.134-.41-.256-.519-.371C.058 6.76 0 6.567 0 6.315c0-.37.166-.657.493-.846.329-.186.56-.342.693-.466a.942.942 0 0 0 .26-.447c.056-.2.088-.42.097-.658.01-.25.024-.85.043-1.802.015-.629.239-1.14.672-1.522C2.691.19 3.268 0 3.977 0c.783 0 1.216.317 1.216.921 0 .264-.069.48-.211.643a.858.858 0 0 1-.563.29c-.249.03-.417.076-.498.126-.062.04-.112.134-.139.291-.031.187-.052.562-.061 1.119a8.828 8.828 0 0 1-.112 1.378 2.24 2.24 0 0 1-.404.963c-.159.212-.373.406-.64.583.25.163.454.342.612.538zm7.34 0c.157-.196.362-.375.612-.538a2.544 2.544 0 0 1-.641-.583 2.24 2.24 0 0 1-.404-.963 8.828 8.828 0 0 1-.112-1.378c-.009-.557-.03-.932-.061-1.119-.027-.157-.077-.251-.14-.29-.08-.051-.248-.096-.496-.127a.858.858 0 0 1-.564-.29C8.57 1.401 8.5 1.185 8.5.921 8.5.317 8.933 0 9.716 0c.71 0 1.286.19 1.72.574.432.382.656.893.671 1.522.02.952.033 1.553.043 1.802.009.238.041.458.097.658a.942.942 0 0 0 .26.447c.133.124.364.28.693.466a.926.926 0 0 1 .493.846c0 .252-.058.446-.183.58-.109.115-.281.237-.52.371-.21.118-.377.244-.504.376-.118.123-.212.315-.277.578-.025.102-.045.35-.06.733-.013.392-.027.912-.042 1.56a2.09 2.09 0 0 1-.305 1.097c-.2.323-.486.574-.853.75a2.811 2.811 0 0 1-1.233.263c-.784 0-1.216-.322-1.216-.934 0-.256.07-.47.214-.636a.855.855 0 0 1 .562-.297c.201-.027.344-.056.418-.083.048-.017.096-.06.14-.134a.996.996 0 0 0 .107-.396c.02-.195.031-.502.031-.92 0-.573.039-1.045.117-1.417.08-.382.222-.701.427-.954z" /> </svg>',
      title: 'Code',
    }
  }
}
