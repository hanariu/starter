import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.css']
  },
  build: {
    cssCodeSplit: true,
    outDir: path.resolve(__dirname, './web/static/assets'),
    rollupOptions: {
      input: {
        hanariu: path.resolve(__dirname, './web/app/src/main.ts'),
      },
      output: {
        assetFileNames: '[hash].[name].[ext]',
        entryFileNames: '[hash].[name].js'
      }
    }
  }
})