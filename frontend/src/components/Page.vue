<template>
  <div class="page">
    <slot name="header"></slot>
    <div class="content" v-bind:class="{ 'blue-bg': hasBlueBg }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";

export default {
  name: "Page",
  components: {
    PageHeader,
  },
  computed: {
    hasBlueBg() {
      return this.blueBg;
    },
  },
  props: {
    blueBg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;

  .blue-bg {
    background-color: #f3f7fa;
  }

  .content {
    padding: 20px 10px;
    min-height: 100vh;
  }

  .header-right {
    float: right;
  }

  @media screen and (max-width: 500px) {
    .header-right {
      float: none;
    }
  }
}
</style>
