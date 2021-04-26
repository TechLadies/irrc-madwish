<template>
  <Page blueBg>
    <div class="teacher-profile-container">
      <div class="teacher-profile-left">
        <ProfileCard
          v-bind:profile="{
            id: teacherData.TeacherID,
            name: teacherData.FullName,
            contact: teacherData.PhoneNumber,
            source: teacherData.Source,
            dateJoined: teacherData.dateJoined,
            nativeLanguage: teacherData.nativeLanguage.NativeLanguage,
            notes: teacherData.Notes,
            status: teacherData.status.Description,
            proficiencyLevel: teacherData.EnglishProficiency,
            secondLanguage: teacherData.secondLanguage.NativeLanguage,
            languageProficiency: teacherData.LanguageProficiency,
            teachingExperience: teacherData.TeachingExperience,
          }"
          v-bind:isTeacher="true"
          v-on:englishProficiencyIsSelected="englishProficiency = $event"
        />
      </div>
      <div class="teacher-profile-right">
        <section class="student-status-section">
          <StatusCardScreening
            :teacherID="teacherData.TeacherID"
            :englishProficiency="englishProficiency"
            v-if="teacherData.status.Description.toUpperCase() === 'SCREENING'"
          />
          <StatusCardUnmatched
            :teacherID="teacherData.TeacherID"
            v-bind:isTeacher="true"
            v-if="teacherData.status.Description.toUpperCase() === 'UNMATCHED'"
          />
          <StatusCardMatched
            :teacherID="teacherData.TeacherID"
            v-bind:isTeacher="true"
            v-if="teacherData.status.Description.toUpperCase() === 'MATCHED'"
          />
          <StatusCardDroppedOut
            :teacherID="teacherData.TeacherID"
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
import ProfileCard from "../components/ProfileCard.vue";
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
    ProfileCard,
    StudentHistory,
    StatusCardMatched,
    StatusCardDroppedOut,
    StatusCardScreening,
    StatusCardUnmatched,
  },
  data: function () {
    return {
      teacherID: "",
    };
  },
  computed: {
    ...mapGetters(["getTeacherByTeacherId"]),
    teacherData() {
      const data = this.teacher;
      if (!data.secondLanguage) {
        data.secondLanguage = {
          NativeLanguageID: "",
          NativeLanguage: "",
        };
      }
      const teacherObject = {
        TeacherID: data.TeacherID,
        PhoneNumber: data.PhoneNumber,
        FullName: data.FullName,
        Source: data.Source,
        nativeLanguage: data.nativeLanguage || "",
        secondLanguage: data.secondLanguage || "",
        status: data.status,
        Notes: data.Notes,
        dateJoined: new Date(data.created_at).toDateString(),
        EnglishProficiency: data.EnglishProficiency,
        LanguageProficiency: data.LanguageProficiency,
        TeachingExperience: data.TeachingExperience,
      };
      return teacherObject;
    },
    teacherHistory() {
      const teacherHistory = this.teacher.statusUpdates.map((update) => {
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
      return teacherHistory.sort((a, b) => b.id - a.id);
    },
    latestReason() {
      return this.teacherHistory[0].reason;
    },
    teacher() {
      const id = this.$route.params.id;
      const data = this.getTeacherByTeacherId(id);
      return data;
    },
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
