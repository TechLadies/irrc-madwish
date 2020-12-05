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
          <Button @click.native="unmatchedToDroppedOut" label="Drop Out" />
          <Button label="Select Match" solid />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "StatusCardUnmatched",
  components: {
    Button,
  },
  props: {
    studentID: {
      type: String,
    }
  },
  methods: {   
    // TODO: Remove the Matched pair from the matching table (not created yet)
    unmatchedToDroppedOut() {
      const studentID = parseInt(this.studentID)
      const previousStatusString = "UNMATCHED"
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
