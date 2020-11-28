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
          <Button label="Drop Out" />
          <Button label="Ready to Match" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "StatusCardScreening",
  components: {
    Button,
  },
  props: {
    studentID: {
      type: String,
    }
  },
  methods: {
    // TODO: decide if clicking "Ready to Match" writes to database.
    screeningToDroppedOut() {
      const studentID = parseInt(this.studentID)
      const previousStatusString = "SCREENING"
      const nextStatusString = "DROPPED OUT"
      const updatedBy = "IRRCAdmin"

      this.$store.dispatch('updateStudentStatus', {
        studentID: studentID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy
      })
    }
  }
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
