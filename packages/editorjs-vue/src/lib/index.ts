import './config/tools/attaches.scss'
import './preview/style/base.scss'
import { App } from 'vue'
import Editor from './editor.vue'
import Viewer from './preview/VHTMLPreview.vue'

const install = (app: App, config: { editorName: string; viewerName: string }) => {
  app.component(config?.editorName || 'EditorVue', Editor)
  app.component(config?.viewerName || 'EditorViewer', Viewer)
}
export { Editor, Viewer }

export default { install }
