import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: "/hello-vite-mediapipe-tasks-vision/",
  plugins:[
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@mediapipe/tasks-vision/wasm',
          dest: './'
        }
      ]
    })

  ]
});