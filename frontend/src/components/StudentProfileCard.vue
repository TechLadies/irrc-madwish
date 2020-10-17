<template>
  <div class="card">
    <div class="card-content">
      <div class="edit-container">Edit</div>
      <div class="student-grid">
        <img src="../assets/images/student.png" />
        <div class="student-label">Student</div>
        <div class="student-main">{{ studentInfo.studentName }}</div>
        <div class="student-main">{{ studentInfo.studentContact }}</div>
        <div>
          <div class="student-label-small">Date Joined</div>
          <div class="student-detail">{{ studentInfo.dateJoined }}</div>
        </div>
        <div>
          <div class="student-label-small">Source</div>
          <div class="student-detail">{{ studentInfo.Source }}</div>
        </div>
        <div>
          <div class="student-label-small">Native Language</div>
          <div class="student-detail">{{ studentInfo }}</div>
        </div>
        <div>
          <div class="student-label-small">English Proficiency</div>
          <div>
            <b-select placeholder="Select Proficiency">
              <option>
                {{ studentInfo }}
              </option>
            </b-select>
          </div>
        </div>
      </div>

      <hr />
      <div class="student-label-small">Notes</div>
      <div>
        {{ studentInfo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProfileCard",
  props: {
    studentInfo: {
      type: Object,
      default: new String("cat"),
    },
  },
};
</script>

<style lang="scss">
.edit-container {
  text-align: right;
  color: #00488f;
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

  .student-label-small {
    font-size: 14px;
    font-weight: 500;
    color: #59666e;
    line-height: 20px;
    display: flex;
    padding-top: 24px;
  }

  .student-detail {
    font-size: 16px;
    font-weight: 400;
    color: #12171a;
    line-height: 24px;
    display: flex;
    padding-top: 8px;
  }
}
</style>
