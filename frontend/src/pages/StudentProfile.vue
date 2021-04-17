<template>
  <Page blueBg>
    <div class="student-profile-container">
      <div class="student-profile-left">
        <ProfileCard
          v-bind:profile="{
            id: studentData.StudentID,
            name: studentData.FullName,
            contact: studentData.PhoneNumber,
            source: studentData.Source,
            dateJoined: studentData.dateJoined,
            nativeLanguage: studentData.nativeLanguage.NativeLanguage,
            notes: studentData.Notes,
            status: studentData.status.Description,
            proficiencyLevel: studentData.EnglishProficiency,
          }"
          v-on:englishProficiencyIsSelected="
            studentData.EnglishProficiency = $event
          "
        />
      </div>
      <div class="student-profile-right">
        <section class="student-status-section">
          <StatusCardScreening
            :studentID="studentData.StudentID"
            :englishProficiency="studentData.EnglishProficiency"
            v-if="studentData.status.Description.toUpperCase() === 'SCREENING'"
          />
          <StatusCardUnmatched
            :studentID="studentData.StudentID"
            :studentName="studentData.FullName"
            v-if="studentData.status.Description.toUpperCase() === 'UNMATCHED'"
          />
          <StatusCardMatched
            :studentID="studentData.StudentID"
            :studentName="studentData.FullName"
            v-if="studentData.status.Description.toUpperCase() === 'MATCHED'"
          />
          <StatusCardDroppedOut
            :studentID="studentData.StudentID"
            :latestReason="latestReason"
            v-if="
              studentData.status.Description.toUpperCase() === 'DROPPED OUT'
            "
          />
        </section>
        <section class="student-history-section">
          <StudentHistory v-bind:items="studentHistory" />
        </section>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page.vue";
import ProfileCard from "../components/ProfileCard.vue";
import StudentHistory from "../components/StudentHistory/StudentHistory.vue";
import StatusCardMatched from "../components/statusCards/StatusCardMatched.vue";
import StatusCardDroppedOut from "../components/statusCards/StatusCardDroppedOut.vue";
import StatusCardScreening from "../components/statusCards/StatusCardScreening.vue";
import StatusCardUnmatched from "../components/statusCards/StatusCardUnmatched.vue";
import { mapGetters } from "vuex";

export default {
  name: "StudentProfile",
  components: {
    Page,
    ProfileCard,
    StudentHistory,
    StatusCardMatched,
    StatusCardDroppedOut,
    StatusCardScreening,
    StatusCardUnmatched,
  },
  computed: {
    ...mapGetters(["getStudentByStudentId"]),
    studentData() {
      const data = this.student;
      const studentObject = {
        StudentID: data.StudentID,
        PhoneNumber: data.PhoneNumber,
        FullName: data.FullName,
        Source: data.Source,
        nativeLanguage: data.nativeLanguage,
        status: data.status,
        Notes: data.Notes,
        dateJoined: new Date(data.created_at).toDateString(),
        EnglishProficiency: data.EnglishProficiency,
      };
      return studentObject;
    },
    studentHistory() {
      const studentHistory = this.student.statusUpdates.map((update) => {
        if (update.reason == null) {
          update.reason = {
            Reason: "_",
          };
        }
        return {
          id: update.StatusUpdateID,
          date: new Date(update.created_at).toDateString(),
          description: update.nextStatus.Description,
          status: update.nextStatus.StatusID,
          reason: update.reason.Reason.split("_")[1],
        };
      });
      return studentHistory.sort((a, b) => b.id - a.id);
    },
    latestReason() {
      return this.studentHistory[0].reason;
    },
    student() {
      const id = this.$route.params.id;
      const data = this.getStudentByStudentId(id);
      return data;
    },
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
