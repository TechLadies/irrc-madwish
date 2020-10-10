

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from './router.js'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({ 
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App />'
})
