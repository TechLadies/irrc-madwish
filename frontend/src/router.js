import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('./pages/HelloWorld.vue')
const Screening = () => import('./pages/Screening.vue')
const Matching = () => import('./pages/Matching.vue')

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/', component: HelloWorld  },
    { path: '/screening', component: Screening  },
    { path: '/matching', component: Matching  }
  ]
})

export default router