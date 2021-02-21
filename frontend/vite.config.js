const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = {
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