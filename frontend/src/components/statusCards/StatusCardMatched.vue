<template>
  <div class="status-container">
    <div class="card">
      <div class="card-status-details">
        <div class="content">
          <div class="content-title">STATUS</div>
          <b-taglist>
            <b-tag type="is-success is-light" size="is-medium"
              >&#9679; Matched</b-tag
            >
          </b-taglist>
        </div>
        <div class="content">
          <div v-if="isTeacher" class="content-title">MATCHED TO STUDENT</div>
          <div v-else class="content-title">MATCHED TO TEACHER</div>
          <p v-if="isTeacher">{{ studentName }}</p>
          <p v-else>{{ teacherName }}</p>
        </div>
      </div>

      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button label="Drop Out" @click.native="matchedToDroppedOut()" />
          <Button
            v-if="isTeacher"
            label="Unmatch"
            solid
            @click.native="matchedToUnmatched()"
          />
          <Button v-else label="Unmatch" @click.native="clickUnmatch()" solid />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import ModalDroppedOut from "./../modals/ModalDroppedOut.vue";
import ModalUnmatch from "./../modals/ModalUnmatch.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatusCardUnmatched",
  components: {
    Button,
    ModalDroppedOut,
    ModalUnmatch,
  },
  props: {
    studentName: {
      type: String,
      default: "No Student Assigned",
    },
    studentID: {
      type: Number,
    },
    teacherID: {
      type: Number,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["getMatchByStudentID"]),
    teacherName() {
      const matchObject = this.getMatchByStudentID(this.studentID);
      if (matchObject) {
        return matchObject.teacher.FullName;
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapActions(["updateStudentStatus", "updateTeacherStatus"]),
    // TODO: Remove the Matched pair from the matching table (not created yet)
    matchedToDroppedOut() {
      const previousStatusString = "MATCHED";
      const nextStatusString = "DROPPED OUT";
      this.$buefy.modal.open({
        parent: this,
        component: ModalDroppedOut,
        props: {
          studentID: this.studentID,
          teacherID: this.teacherID,
          isTeacher: this.isTeacher,
          previousStatusString,
          nextStatusString,
        },
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
      });
    },
    matchedToUnmatched() {
      const previousStatusString = "MATCHED";
      const nextStatusString = "UNMATCHED";
      const updatedBy = "IRRCAdmin";
      this.updateTeacherStatus({
        teacherID: this.teacherID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy,
      });
    },
    clickUnmatch() {
      const previousStatusString = "MATCHED";
      const nextStatusString = "UNMATCHED";
      this.$buefy.modal.open({
        parent: this,
        component: ModalUnmatch,
        props: {
          teacherName: this.teacherName,
          studentName: this.studentName,
          studentID: this.studentID,
          teacherID: this.teacherID,
          isTeacher: this.isTeacher,
          previousStatusString,
          nextStatusString,
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
.card-status-details {
  display: flex;
  justify-content: space-between;
}
.card-status-details .content {
  flex: 1;
}
.content p {
  font-size: 16px;
  color: #00488f;
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
