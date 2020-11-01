<template>
  <div class="card">
    <div class="edit-container">Edit</div>
    <div class="student-grid">
      <img src="../assets/images/student.png" />
      <div class="student-label">Student</div>
      <div class="student-main">{{ studentInfo.studentName }}</div>
      <div class="student-main">{{ studentInfo.studentContact }}</div>
      <div>
        <div class="student-label-small padding-large">Date Joined</div>
        <div class="student-detail">{{ studentInfo.dateJoined }}</div>
      </div>
      <div>
        <div class="student-label-small padding-large">Source</div>
        <div class="student-detail">{{ studentInfo.source }}</div>
      </div>
      <div>
        <div class="student-label-small padding-small">Native Language</div>
        <div class="student-detail">{{ studentInfo.nativeLanguage }}</div>
      </div>
      <div>
        <div class="student-label-small padding-small">
          English Proficiency
        </div>
        <div>
          <b-select
            v-if="studentInfo.status === 'Screening'"
            placeholder="Select Proficiency"
          >
            <option value="No">No - Unable to understand at all</option>
            <option value="Little"
              >Little - Able to understand simple words</option
            >
            <option value="Simple"
              >Simple - Able to speak full sentences</option
            >
            <option value="Intermediate"
              >Intermediate - Able to carry conversations</option
            >
          </b-select>
          <div v-else class="student-detail">
            {{ studentInfo.proficiencyLevel }}
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div class="notes-label">Notes</div>
    <div class="notes-text">
      {{ studentInfo.notes }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProfileCard",
  props: {
    studentInfo: {
      type: Object,
      default: function() {
        return {
          studentName: "Kasam Rujuthan",
          studentContact: "9123 4567",
          dateJoined: "Sept 07 2020",
          source: "Rotary",
          nativeLanguage: "Bangla",
          notes: "Dummy Text",
          status: "Screening",
          proficiencyLevel: "Little (able to understand simple words)",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
}
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

  .padding-large {
    padding-top: 32px;
  }

  .padding-small {
    padding-top: 24px;
  }
  .student-label-small {
    font-size: 14px;
    font-weight: 500;
    color: #59666e;
    line-height: 20px;
    display: flex;
    padding-bottom: 2px;
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

hr {
  margin: 32px 0px;
}

.notes-label {
  font-size: 14px;
  font-weight: 500;
  color: #59666e;
  line-height: 20px;
  display: flex;
}

.notes-text {
  font-size: 16px;
  font-weight: 400;
  color: #12171a;
  line-height: 24px;
  display: flex;
  padding-top: 8px;
}
</style>
