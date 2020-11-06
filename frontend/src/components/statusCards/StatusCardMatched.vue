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
<<<<<<< HEAD
          <div class="content-title">MATCHED TO TEACHER</div>
          <p>{{ teacherName }}</p>
        </div>
      </div>

      <div class="content">
        <div class="content-title">ACTION</div>
        <div class="buttons">
          <Button label="Drop Out" />
          <Button label="View Match" solid />
=======
          <div class="content-title">ACTION</div>
          <div class="buttons">
            <Button @click.native="matchedToDroppedOut" label="Drop Out" />
            <Button label="View Match" solid />
          </div>
>>>>>>> xuanjane/status-integration
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
    teacherName: {
      type: String,
      default: "No Teacher Assigned",
    },
  },
  methods: {   
    matchedToDroppedOut(studentID) {
      // ToDo: Dummy studentID to be removed later
      studentID=1
       
      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusID: 4})
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

      // ToDo: Remove the Matched pair from the matching table (not created yet)

      // POST statusUpdate
      const statusUpdateRequestOptions = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          StudentID: studentID,
          PreviousStatusID: 3,
          NextStatusID: 4,
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
