
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from "./router.js"

Vue.use(Vuex)
Vue.use(Buefy)
new Vue({ 
  router,
  el: '#app',
  components: {
    App
  },
  template: '<App />'
})
