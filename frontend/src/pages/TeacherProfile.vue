<template>
  <Page blueBg>
    <div class="teacher-profile-container">
      <div class="teacher-profile-left">
        <StudentProfileCard
          v-bind:studentInfo="{
            studentName: teacherData.FullName,
            studentContact: teacherData.PhoneNumber,
            source: teacherData.Source,
            dateJoined: teacherData.dateJoined,
            nativeLanguage: teacherData.secondLanguage.NativeLanguage,
            notes: teacherData.Notes,
            status: teacherData.status.Description,
            proficiencyLevel: teacherData.EnglishProficiency,
          }"
          v-bind:teacherInfo="{
            secondLanguage: teacherData.secondLanguage.NativeLanguage,
            languageProficiency: teacherData.LanguageProficiency,
          }"
          v-bind:isTeacher="true"
          v-on:englishProficiencyIsSelected="englishProficiency = $event"
        />
      </div>
      <div class="teacher-profile-right">
        <section class="student-status-section">
          <StatusCardScreening
            :studentID="teacherID"
            :englishProficiency="englishProficiency"
            v-if="teacherData.status.Description.toUpperCase() === 'SCREENING'"
          />
          <StatusCardUnmatched
            :studentID="teacherID"
            v-bind:isTeacher="true"
            v-if="teacherData.status.Description.toUpperCase() === 'UNMATCHED'"
          />
          <StatusCardMatched
            :studentID="teacherID"
            v-bind:isTeacher="true"
            v-if="teacherData.status.Description.toUpperCase() === 'MATCHED'"
          />
          <StatusCardDroppedOut
            :studentID="teacherID"
            v-bind:isTeacher="true"
            v-if="
              teacherData.status.Description.toUpperCase() === 'DROPPED OUT'
            "
          />
        </section>
        <section class="student-history-section">
          <StudentHistory v-bind:items="teacherHistory" />
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
import { mapGetters } from "vuex";
export default {
  name: "TeacherProfile",
  components: {
    Page,
    StudentProfileCard,
    StudentHistory,
    StatusCardMatched,
    StatusCardDroppedOut,
    StatusCardScreening,
    StatusCardUnmatched,
  },
  data: function () {
    return {
      teacherData: {
        TeacherID: -1,
        PhoneNumber: "",
        FullName: "",
        Source: "",
        nativeLanguage: {
          NativeLanguageID: -1,
          NativeLanguage: "",
        },
        EnglishProficiency: "",
        secondLanguage: {
          NativeLanguageID: -1,
          NativeLanguage: "",
        },
        LanguageProficiency: "",
        Notes: "",
        status: {
          StatusID: -1,
          Description: "",
        },
      },
      teacherHistory: [],
      teacherID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["getTeacherByTeacherId"]),
  },
  mounted: function () {
    const id = this.$route.params.id;
    //TODO: get teacher by teacher ID from the store
    const data = this.getTeacherByTeacherId(id);
    //console.log(data);
    const teacherObject = {
      TeacherID: data.TeacherID,
      PhoneNumber: data.PhoneNumber,
      FullName: data.FullName,
      Source: data.Source,
      nativeLanguage: data.nativeLanguage,
      secondLanguage: data.secondLanguage,
      status: data.status,
      Notes: data.Notes,
      dateJoined: new Date(data.created_at).toDateString(),
      EnglishProficiency: data.EnglishProficiency,
      LanguageProficiency: data.LanguageProficiency,
    };
    const teacherHistory = data.statusUpdates.map((update) => {
      return {
        date: new Date(update.created_at).toDateString(),
        description: update.nextStatus.Description,
        status: update.nextStatus.StatusID,
      };
    });
    this.teacherData = teacherObject;
    this.teacherHistory = teacherHistory;
  },
};
</script>

<style lang="scss" scoped>
.teacher-profile-container {
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 14px;
  min-height: calc(100vh - 48px);
}
.teacher-profile-left {
  display: flex;
  flex: 1;
}
.teacher-profile-right {
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
