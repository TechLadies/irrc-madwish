
import Vue from 'vue'

import App from './App.vue'
import router from './router.js'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({ 
  router,
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App />'
})
