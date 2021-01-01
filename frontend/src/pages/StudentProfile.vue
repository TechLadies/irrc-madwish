<template>
  <Page blueBg>
    <div class="student-profile-container">
      <div class="student-profile-left">
        <StudentProfileCard
          v-bind:studentInfo="{
            studentName: studentData.FullName,
            studentContact: studentData.PhoneNumber,
            source: studentData.Source,
            dateJoined: studentData.dateJoined,
            nativeLanguage: studentData.nativeLanguage.NativeLanguage,
            notes: studentData.Notes,
            status: studentData.status.Description,
            proficiencyLevel: studentData.EnglishProficiency,
          }"
          v-on:englishProficiencyIsSelected="englishProficiency = $event"
        />
      </div>
      <div class="student-profile-right">
        <section class="student-status-section">
          <StatusCardScreening :studentID="studentID" :englishProficiency="englishProficiency" v-if="studentData.status.Description.toUpperCase() === 'SCREENING'" />
          <StatusCardUnmatched :studentID="studentID" v-if="studentData.status.Description.toUpperCase() === 'UNMATCHED'" />
          <StatusCardMatched :studentID="studentID" v-if="studentData.status.Description.toUpperCase() === 'MATCHED'" />
          <StatusCardDroppedOut :studentID="studentID" v-if="studentData.status.Description.toUpperCase() === 'DROPPED OUT'" />
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
import StudentProfileCard from "../components/StudentProfileCard.vue";
import StudentHistory from "../components/StudentHistory/StudentHistory.vue";
import StatusCardMatched from "../components/statusCards/StatusCardMatched.vue";
import StatusCardDroppedOut from "../components/statusCards/StatusCardDroppedOut.vue";
import StatusCardScreening from "../components/statusCards/StatusCardScreening.vue";
import StatusCardUnmatched from "../components/statusCards/StatusCardUnmatched.vue";
import { mapGetters } from 'vuex'

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
      englishProficiency: "",
      studentData: {
        StudentID: -1,
        PhoneNumber: "",
        FullName: "",
        Source: "",
        nativeLanguage: {
          NativeLanguageID: -1,
          NativeLanguage: "",
        },
        EnglishProficiency: "",
        Notes: "",
        status: {
          StatusID: -1,
          Description: "",
        },
      },
      studentHistory: [],
       studentID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters([ 'getStudentByStudentId' ])
  },
  mounted: function() {
    const id = this.$route.params.id
    const data = this.getStudentByStudentId(id)

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

    const studentHistory = data.statusUpdates.map(update => {
      return {
        date: new Date(update.created_at).toDateString(),
        description: update.nextStatus.Description,
        status: update.nextStatus.StatusID,
      };
    });

    this.studentData = studentObject;
    this.studentHistory = studentHistory;
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
