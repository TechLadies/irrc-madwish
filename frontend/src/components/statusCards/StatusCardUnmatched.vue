<template>
  <div class="status-container">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="content-title">STATUS</div>
          <b-taglist>
            <b-tag type="is-warning is-light" size="is-large"
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
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "StatusCardUnmatched",
  components: {
    Button,
  },
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