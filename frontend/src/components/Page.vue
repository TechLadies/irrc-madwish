<template>
  <div class="page">
    <slot name="header"></slot> 
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'

export default {
  name: 'Page',
  components: {
    PageHeader
  }
}
</script>

<style lang="scss">
.page {
  width: 100%;

  .content {
    padding: 20px 10px;
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