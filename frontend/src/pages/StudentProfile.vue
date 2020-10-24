<template>
  <Page blueBg>
    <div class="student-profile-container">
      <div class="student-profile-left">
        <StudentProfileCard
          v-bind:studentInfo="{
            studentName: studentData.FirstName + ' ' + studentData.LastName,
            studentContact: studentData.PhoneNumber,
            source: studentData.Source,
            nativeLanguage: studentData.nativeLanguage.NativeLanguage,
            notes: studentData.Notes,
            status: studentData.status.Description,
            proficiencyLevel: studentData.EnglishProficiency,
          }"
        />
      </div>
      <div class="student-profile-right">
        <section class="student-status-section">
          <StatusCardScreening v-if="studentData.status.StatusID === 1" />
          <StatusCardUnmatched v-if="studentData.status.StatusID === 2" />
          <StatusCardMatched v-if="studentData.status.StatusID === 3" />
          <StatusCardDroppedOut v-if="studentData.status.StatusID === 4" />
        </section>
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
import StatusCardMatched from "../components/statusCards/StatusCardMatched.vue";
import StatusCardDroppedOut from "../components/statusCards/StatusCardDroppedOut.vue";
import StatusCardScreening from "../components/statusCards/StatusCardScreening.vue";
import StatusCardUnmatched from "../components/statusCards/StatusCardUnmatched.vue";

export default {
  name: "StudentProfile",
  components: {
    Page,
    StudentProfileCard,
    StudentHistory,
    StatusCardMatched,
    StatusCardDroppedOut,
    StatusCardScreening,
    StatusCardUnmatched,
  },
  data: function() {
    return {
      // Dummy data. Should be empty data once API is integrated
      studentData: {
        StudentID: 1,
        PhoneNumber: "87654321",
        FirstName: "Cat",
        LastName: "Catt",
        Source: "Rotary",
        nativeLanguage: {
          NativeLanguageID: 1,
          NativeLanguage: "Bangla",
        },
        EnglishProficiency: "Intermediate",
        Notes: "Notes",
        status: {
          StatusID: 1,
          Description: "Screening",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.student-profile-container {
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 14px;
  min-height: calc(100vh - 48px);
}
.student-profile-left {
  display: flex;
  flex: 1;
}
.student-profile-right {
  display: flex;
  flex-direction: column;
  padding-right: 14px;
}
.student-status-section {
  padding-left: 24px;
}
.student-history-section {
  padding-top: 24px;
  padding-left: 24px;
  display: flex;
  flex: 1;
}
</style>
