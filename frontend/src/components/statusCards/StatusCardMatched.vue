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
          <Button v-if="isTeacher" label="Unmatch" solid />
          <Button v-else label="View Match" solid />
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
  name: "StatusCardUnmatched",
  components: {
    Button,
    ModalDroppedOut,
  },
  props: {
    teacherName: {
      type: String,
      default: "No Teacher Assigned",
    },
    studentName: {
      type: String,
      default: "No Student Assigned",
    },
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
  },
  methods: {
    ...mapActions(["updateStudentStatus"]),
    // TODO: Remove the Matched pair from the matching table (not created yet)
    matchedToDroppedOut() {
      const previousStatusString = "MATCHED";
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
