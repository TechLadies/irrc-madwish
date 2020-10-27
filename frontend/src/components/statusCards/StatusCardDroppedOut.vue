<template>
  <div class="status-container">
    <div class="card">
      <div class="card-content">
        <div class="card-status-details">
          <div class="content">
            <div class="content-title">STATUS</div>
            <b-taglist>
              <b-tag type="is-danger is-light" size="is-large"
                >&#9679; Dropped Out</b-tag
              >
            </b-taglist>
          </div>
          <div class="content">
            <div class="content-title">REASON</div>
            <p>{{ reason }}</p>
          </div>
        </div>
        <div class="content">
          <div class="content-title">ACTION</div>
          <div class="buttons">
            <Button @click.native="droppedOutToScreening" label="Reactivate for Screening" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "StatusCardDroppedOut",
  components: {
    Button,
  },
  props: {
    reason: {
      type: String,
      default: "No Reason Stated",
    },
  },
  methods: {   
    droppedOutToScreening(studentID) {
      // ToDo: Dummy studentID to be removed later
      studentID=1
       
      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusID: 1})
      }
      
      fetch("http://localhost:3001/students/" + studentID, studentRequestOptions)
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
          PreviousStatusID: 4,
          NextStatusID: 1,
          UpdatedBy: "IRRCAdmin"
        })
      }
      fetch("http://localhost:3001/statusUpdates", statusUpdateRequestOptions)
        .then(response => response.json())
    }
  }
};
</script>

<style scoped>
.status-container {
  width: 448px;
  height: 228px;
}
.status-container .card {
  border-radius: 4px;
}
.card-content {
  padding: 32px;
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
