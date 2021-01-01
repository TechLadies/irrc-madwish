import Vue from "vue";
import Vuex from "vuex";
import {
  nativeLanguageActions,
  nativeLanguageGetters,
  nativeLanguageMutations,
  nativeLanguageState,
} from "./store/nativeLanguages.js";
import {
  teacherActions,
  teacherMutations,
  teacherGetters,
  teacherState,
} from "./store/teachers.js";
import {
  screeningActions,
  screeningState,
  screeningMutations
} from "./store/screening.js";
import {
  studentActions,
  studentGetters,
  studentMutations,
  studentState
} from "./store/Students.js";

Vue.use(Vuex);

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: "SET_STUDENTS",
});

export default new Vuex.Store({
  state: {
    ...studentState,
    ...nativeLanguageState,
    ...teacherState,
    ...screeningState
  },
  mutations: {
    ...studentMutations,
    ...nativeLanguageMutations,
    ...teacherMutations,
    ...screeningMutations
  },
  actions: {
    ...studentActions,
    ...nativeLanguageActions,
    ...teacherActions,
    ...screeningActions,
    // Update student status
    async updateStudentStatus({ commit, dispatch }, { studentID, previousStatusString, nextStatusString, updatedBy }) {
      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusString: nextStatusString})
      }

      // POST statusUpdate
      const statusUpdateRequestOptions = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          StudentID: studentID,
          PreviousStatusString: previousStatusString,
          NextStatusString: nextStatusString,
          UpdatedBy: updatedBy
        })
      }

      const patchStudent = fetch("/api/students/" + studentID, studentRequestOptions)
      const postStatusUpdate = fetch("/api/statusUpdates", statusUpdateRequestOptions)

      Promise.all([
        patchStudent,
        postStatusUpdate
      ])
      .then(([responsePatch, responsePost]) => {
          // If PATCH and/or POST fail, return
          if(responsePatch.status !== 200) {
            console.log('responsePatch', responsePatch)
            return;
          }
          if(responsePost.status !== 200) {
            console.log('responsePost', responsePost)
            return;
          }
          dispatch('getAllStudents')
      }).catch((err) => {
        console.error(err);
      });
    },

    // Update student English proficiency
    async updateStudentEnglishProficiency({ commit, dispatch }, { studentID, englishProficiency }) {

      if (!englishProficiency) return;

      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, EnglishProficiency: englishProficiency})
      }

      fetch("/api/students/" + studentID, studentRequestOptions)
        .then(response => {
            // If PATCH fails, return
            if(response.status !== 200) {
              console.log(response);
              return;
            }
            dispatch('getAllStudents')
          }
        )
    },
  },
  getters: {
    ...studentGetters,
    ...nativeLanguageGetters,
    ...teacherGetters,
    screeningStudents: (state) => state.students.filter((student) => student.status.Description === "SCREENING"),
    getStudentByStudentId: (state) => (id) => state.students.find(student => student.StudentID == id)
  },
});
