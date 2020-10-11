<template>
  <div class="card">
    <div class="card-content">
      <div class="edit-container">Edit</div>
      <div class="student-grid">
        <img src="../assets/images/student.png" />
        <div class="student-label">Student</div>
        <div class="student-main">Kasam Rujuthan</div>
        <div class="student-main">91234567</div>
        <div>
          <div>Date Joined</div>
          <div>7 2020</div>
        </div>
        <div>
          <div>Source</div>
          <div>Rotary</div>
        </div>
        <div>
          <div>Native Language</div>
          <div>Bangla</div>
        </div>
        <div>
          <div>English Proficiency</div>
          <div>Select Proficiency</div>
        </div>
      </div>

      <hr />
      <div>Notes</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProfileCard",
};
</script>

<style lang="scss">
.edit-container {
  text-align: right;
}
.student-grid {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: min-content 38px repeat(3, min-content);
  grid-column-gap: 24px;

  img {
    grid-row: span 3;
  }

  .student-label {
    font-size: 12px;
    color: #59666e;
    text-transform: uppercase;
    align-self: flex-end;
    padding-bottom: 12px;
  }

  .student-main {
    font-size: 24px;
    font-weight: 700;
    color: #12171a;
  }
}
</style>
