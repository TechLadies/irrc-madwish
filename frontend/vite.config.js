import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  alias: {
    'vue': 'vue/dist/vue.esm.js'
  },
  plugins: [
    createVuePlugin()
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }

}