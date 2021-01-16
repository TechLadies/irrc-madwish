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
          <Button label="Drop Out" @click.native="unmatchedToDroppedOut()"/>
          <Button label="Select Match" solid />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import ModalDroppedOut from "./../modals/ModalDroppedOut.vue"
import { mapActions } from 'vuex'

export default {
  name: "StatusCardUnmatched",
  components: {
    Button,
    ModalDroppedOut,
  },
  props: {
    studentID: {
      type: String,
    }
  },
  methods: {   
    ...mapActions([ 'updateStudentStatus' ]),
    // TODO: Remove the Matched pair from the matching table (not created yet)
    unmatchedToDroppedOut() {
      const previousStatusString = "UNMATCHED"
      this.$buefy.modal.open({
        parent: this,
        component: ModalDroppedOut,
        props: {
          "studentID": this.studentID,
          "previousStatusString": previousStatusString,
        },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true
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
