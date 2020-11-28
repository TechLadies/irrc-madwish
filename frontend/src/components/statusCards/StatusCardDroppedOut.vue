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
          <p>{{ reason }}</p>
        </div>
      </div>
      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button label="Reactivate for Matching" />
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
    studentID: {
      type: String,
    }
  },
  methods: {
    droppedOutToScreening() {
      const studentID = parseInt(this.studentID)

      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusID: 1})
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
          PreviousStatusID: 4,
          NextStatusID: 1,
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
