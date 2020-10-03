<template>
  <sc-outlet>
    <HelloWorld />
  </sc-outlet>
</template>

<script>
import HelloWorld from './pages/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
</style>