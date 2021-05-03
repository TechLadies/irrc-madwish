<template>
  <Page>
    <PageHeader slot="header">
      <a class="logo">CompanyLogo</a>
      <div class="header-right">
        <b-button class="button">
          <b-icon icon="download"></b-icon>
          <span>Export</span>
        </b-button>
      </div>
    </PageHeader>
    <h1>Your Content Here</h1>
  </Page>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Page from "../components/Page.vue";

export default {
  name: "HelloWorld",
  components: {
    Page,
    PageHeader,
  },
  mounted() {
    this.$router.push("/students");
  },
};
</script>

<style lang="scss">
.header-right {
  button {
    background-color: #2f4858;
    color: #ffffff;
    &:hover {
      background-color: #2f4858;
      color: #ffffff;
    }
  }
}
</style>
