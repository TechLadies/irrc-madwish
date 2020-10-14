<template>
<<<<<<< HEAD
  <div>
    <StudentProfile/>
  </div>
</template>

<script>
import StudentProfile from './pages/StudentProfile.vue'
export default {
    name: 'App',
    components: {
    StudentProfile
  }
}
</script>

<style>
</style>
=======
  <Sidebar :menu="menu" @createNew="createNew">
    <router-view></router-view>
  </Sidebar>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

const status = [
  { id: 1, label: 'Screening', to: '/screening', active: false },
  { id: 2, label: 'Matching', to: '/matching', active: false },
  { id: 3, label: 'Matched', to: '/matched', active: false }
]

const profiles = [
  { id: 4, label: 'Students', to: '/students', active: false },
  { id: 5, label: 'Teachers', to: '/teachers', active: false  },
]

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data() {
    return { 
      menu: { status, profiles } 
    }
  },
  methods: {
    createNew() {
      console.log('Create New Here')
    }
  }
}
</script>
>>>>>>> dbec15d7730f2814bd75e11a78903f5a8a36c551
