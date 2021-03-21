<template>
  <div class="status-container">
    <div class="card">
      <div class="content">
        <div class="content-title">STATUS</div>
        <b-taglist>
          <b-tag type="is-warning is-light" size="is-medium"
            >&#9679; Unmatched</b-tag
          >
        </b-taglist>
      </div>
      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button label="Drop Out" @click.native="unmatchedToDroppedOut()" />
          <Button
            v-if="!isTeacher"
            @click.native="toggleSuggestedTeachersModal()"
            label="Select Match"
            solid
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import ModalDroppedOut from "./../modals/ModalDroppedOut.vue";
import SuggestedTeachersModal from "./../modals/ModalSuggestedTeachers.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatusCardUnmatched",
  components: {
    Button,
    ModalDroppedOut,
    SuggestedTeachersModal,
  },
  props: {
    studentID: {
      type: String,
    },
    teacherID: {
      type: String,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    studentName: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["updateStudentStatus", "updateTeacherStatus"]),
    toggleSuggestedTeachersModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SuggestedTeachersModal,
        props: {
          teachersData: this.suggestedTeachersData,
          matchButtonText: "Confirm Match",
          studentName: this.studentName,
        },
        events: {
          selectTeacher: (teacher) => this.unmatchedToMatched(teacher),
        },
        trapFocus: true,
        hasModalCard: true,
      });
    },
    // TODO: Remove the Matched pair from the matching table (not created yet)
    unmatchedToDroppedOut() {
      const previousStatusString = "UNMATCHED";
      this.$buefy.modal.open({
        parent: this,
        component: ModalDroppedOut,
        props: {
          studentID: this.studentID,
          teacherID: this.teacherID,
          isTeacher: this.isTeacher,
          previousStatusString: previousStatusString,
        },
        hasModalCard: true,
        trapFocus: true,
      });
    },
    async unmatchedToMatched(teacher) {
      try {
        const previousStatusString = "UNMATCHED";
        const nextStatusString = "MATCHED";
        if (teacher.status.Description === "UNMATCHED") {
          await this.updateTeacherStatus({
            teacherID: Number(teacher.TeacherID),
            previousStatusString: teacher.status.Description,
            nextStatusString: nextStatusString,
            updatedBy: "IRRCAdmin",
          });
        }
        await this.updateStudentStatus({
          studentID: Number(this.studentID),
          previousStatusString: previousStatusString,
          nextStatusString: nextStatusString,
          updatedBy: "IRRCAdmin",
        });
        this.$buefy.toast.open({
          duration: 5000,
          message: `${teacher.FullName} and ${this.studentName} have been successfully matched!`,
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong, couldn't match.`,
          type: "is-danger",
        });
      }
    },
  },
  computed: {
    suggestedTeachersData() {
      return this.suggestedTeachers(this.studentID).map((teacher) => {
        return {
          ...teacher,
          NativeLanguage: `${teacher.nativeLanguage.NativeLanguage}`,
          SecondLanguage: `${teacher.secondLanguage.NativeLanguage}`,
          Status: `${teacher.status.Description}`,
        };
      });
    },
    ...mapGetters(["suggestedTeachers"]),
  },
};
</script>

<style scoped>
.status-container .card {
  border-radius: 4px;
}
.content {
  font-size: 12px;
}
.content-title {
  margin-bottom: 12px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
