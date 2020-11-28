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
          <Button label="Drop Out" />
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
    unmatchedToDroppedOut() {
      const studentID = parseInt(this.studentID)
       
      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusString: "DROPPED OUT"})
      }
      
      fetch("/api/students/" + studentID, studentRequestOptions)
        .then(
          function(response) {
            // If PATCH fails, return
            if(response.status !== 200) {
              return;
            }
          }
        )

      // POST statusUpdate
      const statusUpdateRequestOptions = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          StudentID: studentID,
          PreviousStatusString: 'UNMATCHED',
          NextStatusString: 'DROPPED OUT',
          UpdatedBy: "IRRCAdmin"
        })
      }
      fetch("/api/statusUpdates", statusUpdateRequestOptions)
        .then(response => response.json())
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
