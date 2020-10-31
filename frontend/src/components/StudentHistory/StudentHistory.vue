<template>
  <div class="card">
    <header>HISTORY</header>
    <Timeline :items="items"></Timeline>
  </div>
</template>

<script>
import Timeline from "./Timeline.vue";
export default {
  name: "StudentHistory",
  components: {
    Timeline,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      /*
       * item: { date: Date, description: String, status: Number }
       */
    },
  },
};
</script>

<style>
.card {
  padding: 32px;
}
header {
  margin-bottom: 12px;

  /* Roboto 12PX REGULAR */

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1.2px;
  text-transform: uppercase;

  /* Dark Grey */
  color: #59666e;
}
</style>
