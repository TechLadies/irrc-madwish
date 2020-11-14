import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  },
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
    }
  }

}