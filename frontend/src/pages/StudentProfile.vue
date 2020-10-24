<template>
  <Page blueBg>
    <div class="student-profile-container">
      <StudentProfileCard />
      <div class="student-profile-right">
        <section>Status</section>
        <section class="student-history-section">
          <StudentHistory
            v-bind:items="[
              { date: '2020-01-01', description: 'Joined MadWish', status: 1 },
              { date: '2020-01-01', description: 'Joined MadWish', status: 3 },
            ]"
          />
        </section>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page.vue";
import StudentProfileCard from "../components/StudentProfileCard.vue";
import StudentHistory from "../components/StudentHistory/StudentHistory.vue";

export default {
  name: "StudentProfile",
  components: {
    Page,
    StudentProfileCard,
    StudentHistory,
  },
};
</script>

<style lang="scss">
.student-profile-container {
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 14px;
  min-height: calc(100vh - 48px);
}
.student-profile-right {
  display: flex;
  flex-direction: column;
}
.student-history-section {
  padding-top: 24px;
  padding-left: 24px;
  display: flex;
  flex: 1;
}
</style>
