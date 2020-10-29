<template>
  <Page blueBg>
    <div class="student-profile-container">
      <section>Profile Details</section>
      <div>
        <section>Status</section>
        <section>History</section>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page.vue";

export default {
  name: "StudentProfile",
  components: {
    Page,
  },
};
</script>

<style lang="scss">
.student-profile-container {
  display: flex;
}
</style>
