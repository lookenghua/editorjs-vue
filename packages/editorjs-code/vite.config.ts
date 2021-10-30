import { ConfigEnv, UserConfigExport } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default ({}: ConfigEnv): UserConfigExport => ({
  plugins: [
    dts({
      include: ['lib'],
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
  ],
  server: {
    port: 6606,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'editorjs',
      fileName: (format) => `editorjs.code.${format}.js`,
    },
  },
})
