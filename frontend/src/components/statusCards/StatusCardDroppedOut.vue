<template>
  <div class="status-container">
    <div class="card">
      <div class="card-status-details">
        <div class="content">
          <div class="content-title">STATUS</div>
          <b-taglist>
            <b-tag type="is-danger is-light" size="is-medium"
              >&#9679; Dropped Out</b-tag
            >
          </b-taglist>
        </div>
        <div class="content">
          <div class="content-title">REASON</div>
          <p>{{ latestReason }}</p>
        </div>
      </div>
      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button
            v-if="isTeacher"
            @click.native="droppedOutToMatching"
            label="Reactivate for Matching"
          />
          <Button
            v-else
            @click.native="droppedOutToScreening"
            label="Reactivate for Screening"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import { mapActions } from "vuex";
export default {
  name: "StatusCardDroppedOut",
  components: {
    Button,
  },
  props: {
    latestReason: {
      type: String,
      default: "No Reason Stated",
    },
    isTeacher: {
      type: Boolean,
    },
    studentID: {
      type: Number,
    },
    teacherID: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(["updateStudentStatus", "updateTeacherStatus"]),
    droppedOutToScreening() {
      const studentID = this.studentID;
      const previousStatusString = "DROPPED OUT";
      const nextStatusString = "SCREENING";
      const updatedBy = "IRRCAdmin";

      this.updateStudentStatus({
        studentID: studentID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy,
      });
    },
    droppedOutToMatching() {
      const teacherID = this.teacherID;
      const previousStatusString = "DROPPED OUT";
      const nextStatusString = "UNMATCHED";
      const updatedBy = "IRRCAdmin";

      this.updateTeacherStatus({
        teacherID: teacherID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy,
      });
    },
  },
};
</script>

<style scoped>
.status-container .card {
  border-radius: 4px;
}
.card-status-details {
  display: flex;
  justify-content: space-between;
}
.card-status-details .content {
  flex: 1;
}
.content p {
  font-size: 16px;
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
