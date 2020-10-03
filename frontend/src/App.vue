<template>
  <div>
    <h1>Hello World</h1>
    <StudentProfile></StudentProfile>
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

<style lang="scss">
</style>