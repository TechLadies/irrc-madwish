<template>
  <div class="card">
    <div class="edit-container">
      <router-link v-if="isTeacher" :to="'/edit-teacher/' + profile.id"
        >Edit</router-link
      >
      <router-link v-else :to="'/edit-student/' + profile.id">Edit</router-link>
    </div>
    <div class="profile-grid">
      <img v-if="isTeacher" src="../assets/teacher.png" />
      <img v-else src="../assets/images/student.png" />
      <div class="profile-label" v-if="isTeacher">Teacher</div>
      <div class="profile-label" v-else>Student</div>
      <div class="profile-main">{{ profile.name }}</div>
      <div class="profile-main">{{ profile.contact }}</div>
      <div>
        <div class="profile-label-small padding-large">Date Joined</div>
        <div class="profile-detail">{{ profile.dateJoined }}</div>
      </div>
      <div>
        <div class="profile-label-small padding-large">Source</div>
        <div class="profile-detail">{{ profile.source }}</div>
      </div>
      <div>
        <div class="profile-label-small padding-small" v-if="!isTeacher">
          Native Language
        </div>
        <div class="profile-label-small padding-small" v-if="isTeacher">
          Language 1
        </div>
        <div class="profile-detail">{{ profile.nativeLanguage }}</div>
      </div>
      <div v-if="!isTeacher">
        <div class="profile-label-small padding-small">English Proficiency</div>
        <div>
          <b-select
            v-if="
              profile.status.toUpperCase() === 'SCREENING' &&
              profile.proficiencyLevel == null
            "
            placeholder="Select Proficiency"
            @change.native="selectedEnglishProficiency"
          >
            <option value="No">No - Unable to understand at all</option>
            <option value="Little">
              Little - Able to understand simple words
            </option>
            <option value="Simple">
              Simple - Able to speak full sentences
            </option>
            <option value="Intermediate">
              Intermediate - Able to carry conversations
            </option>
          </b-select>
          <div v-else class="profile-detail">
            {{ profile.proficiencyLevel }}
          </div>
        </div>
      </div>
      <div>
        <div class="profile-label-small padding-small" v-if="isTeacher">
          Language 2
        </div>
        <div class="profile-detail" v-if="isTeacher">
          {{ profile.secondLanguage }}
        </div>
      </div>
      <!-- Native Language Proficiency is currently not in use. If users want to implement it in the future, just uncomment this section. -->
      <!-- <div>
        <div class="profile-label-small padding-small" v-if="isTeacher">
          Language Proficiency
        </div>
        <div class="profile-detail" v-if="isTeacher">
          {{ profile.languageProficiency }}
        </div>
      </div> -->
      <div>
        <div class="profile-label-small padding-small" v-if="isTeacher">
          Teaching Experience
        </div>
        <div class="profile-detail" v-if="isTeacher">
          {{ profile.teachingExperience }}
        </div>
      </div>
    </div>

    <hr />
    <div class="notes-label">Notes</div>
    <div class="notes-text">
      {{ profile.notes }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    profile: {
      type: Object,
      default: function () {
        return {
          id: 0,
          name: "Default Name",
          contact: "9123 4567",
          dateJoined: "Sept 07 2020",
          source: "Rotary",
          nativeLanguage: "Bangla",
          notes: "Dummy Text",
          status: "Screening",
          proficiencyLevel: "Little (able to understand simple words)",
          secondLanguage: "Bangla",
          languageProficiency: "Intermediate",
          teachingExperience: "No",
        };
      },
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectedEnglishProficiency(event) {
      const englishProficiency = event.target.value;
      this.$emit("englishProficiencyIsSelected", englishProficiency);
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
.profile-grid {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: min-content 38px repeat(3, min-content);
  grid-column-gap: 24px;

  img {
    grid-row: span 3;
  }

  .profile-label {
    font-size: 12px;
    color: #59666e;
    text-transform: uppercase;
    align-self: flex-end;
    padding-bottom: 12px;
  }

  .profile-main {
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
  .profile-label-small {
    font-size: 14px;
    font-weight: 500;
    color: #59666e;
    line-height: 20px;
    display: flex;
    padding-bottom: 2px;
  }

  .profile-detail {
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
