import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: "esnext",
    outDir: "build",
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'redux-observable-duck',
    },
    rollupOptions: {
      external: ['redux', 'rxjs'],
    },
  }
})