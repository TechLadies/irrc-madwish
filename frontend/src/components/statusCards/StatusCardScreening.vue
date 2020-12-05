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
          <Button @click.native="screeningToDroppedOut" label="Drop Out" />
          <Button @click.native="screeningToUnmatched" label="Ready to Match" />
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
    },
    englishProficiency: {
      type: String,
    },
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
    },

    screeningToUnmatched() {
      // Update student status
      const studentID = parseInt(this.studentID)
      const previousStatusString = "SCREENING"
      const nextStatusString = "UNMATCHED"
      const updatedBy = "IRRCAdmin"

      this.$store.dispatch('updateStudentStatus', {
        studentID: studentID,
        previousStatusString: previousStatusString,
        nextStatusString: nextStatusString,
        updatedBy: updatedBy
      })

      // Update English proficiency
      this.$store.dispatch('updateStudentEnglishProficiency', {
        studentID: studentID,
        englishProficiency: this.englishProficiency
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
