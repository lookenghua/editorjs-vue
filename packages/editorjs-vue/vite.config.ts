import { ConfigEnv, UserConfigExport } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [
    vue({ script: { refSugar: true } }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
    dts({
      include: ['src/lib'],
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
  ],
  server: {
    port: 6606,
  },
  resolve: { dedupe: ['vue'] },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'editorjs',
      fileName: (format) => `editorjs.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
