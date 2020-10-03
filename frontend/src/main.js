import Vue from 'vue'
import App from './App.vue'
// import works from './works.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css' 
// import VueRouter from 'vue-router'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faUpload } from '@fortawesome/free-solid-svg-icons'



Vue.use(Buefy)
// Vue.use(VueRouter)
// library.add(fas)
// library.add(faUpload)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.use(Buefy, { defaultIconPack: 'fas' })


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')



