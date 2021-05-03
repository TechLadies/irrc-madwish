import { createVuePlugin } from "vite-plugin-vue2";

export default {
  alias: {
    vue: "vue/dist/vue.esm.js",
  },
  plugins: [createVuePlugin()],
  proxy: {
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
    },
  },
  define: {
    IRRC_LOGIN_ENABLED: true,
  },
};
