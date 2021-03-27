<template>
  <div class="status-container">
    <div class="card">
      <div class="content">
        <div class="content-title">STATUS</div>
        <b-taglist>
          <b-tag type="is-info is-light" size="is-medium"
            >&#9679; Screening</b-tag
          >
        </b-taglist>
      </div>
      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button label="Drop Out" @click.native="screeningToDroppedOut()" />
          <Button @click.native="screeningToUnmatched" label="Ready to Match" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import ModalDroppedOut from "./../modals/ModalDroppedOut.vue";
import { mapActions } from "vuex";

export default {
  name: "StatusCardScreening",
  components: {
    Button,
    ModalDroppedOut,
  },
  props: {
    studentID: {
      type: Number,
    },
    englishProficiency: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["updateStudentStatus", "updateStudentEnglishProficiency"]),
    screeningToUnmatched() {
      // Update student status
      const previousStatusString = "SCREENING";
      const nextStatusString = "UNMATCHED";
      const updatedBy = "IRRCAdmin";

      this.updateStudentStatus({
        studentID: this.studentID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy,
      });

      // Update English proficiency
      this.updateStudentEnglishProficiency({
        studentID: this.studentID,
        englishProficiency: this.englishProficiency,
      });
    },
    screeningToDroppedOut() {
      const previousStatusString = "SCREENING";
      this.$buefy.modal.open({
        parent: this,
        component: ModalDroppedOut,
        props: {
          studentID: this.studentID,
          previousStatusString: previousStatusString,
        },
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
      });
    },
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
