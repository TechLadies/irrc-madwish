import Vue from 'vue'
import Vuex from 'vuex'
import {nativeLanguageActions, nativeLanguageGetters, nativeLanguageMutations, nativeLanguageState} from './store/nativeLanguages.js'

Vue.use(Vuex)

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: 'SET_STUDENTS'
})

export default new Vuex.Store({
  state: {
    students: [],
    ...nativeLanguageState
  },
  mutations: {
    [MUTATIONS.SET_STUDENTS](state, students) {
      state.students = students
    },
    ...nativeLanguageMutations
  },
  actions: {
    ...nativeLanguageActions,

    async getAllStudents({ commit }) {
      const response = await fetch("/api/students")
      const data = await response.json()
      commit(MUTATIONS.SET_STUDENTS, data)
    },

    // Update student status
    async updateStudentStatus({ commit, dispatch }, { studentID, previousStatusString, nextStatusString, updatedBy }) {
      var success = true;

      // PATCH student
      const studentRequestOptions = {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, StatusString: nextStatusString})
      }

      fetch("/api/students/" + studentID, studentRequestOptions)
        .then(
          function(response) {
            // If PATCH fails, return
            if(response.status !== 200) {
              success = false;
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
          PreviousStatusString: previousStatusString,
          NextStatusString: nextStatusString,
          UpdatedBy: updatedBy
        })
      }
      fetch("/api/statusUpdates", statusUpdateRequestOptions)
        .then(
          function(response) {
            // If PATCH fails, return
            if(response.status !== 200) {
              success = false;
              return;
            }
          }
        )

      // Check if both PATCH student and POST statusUpdate succeed
      if (success) { dispatch('getAllStudents') }
    },

    // Update student English proficiency
    async updateStudentEnglishProficiency({ commit, dispatch }, { studentID, englishProficiency }) {
      var success = true;

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
        .then(
          function(response) {
            // If PATCH fails, return
            if(response.status !== 200) {
              success = false;
              return;
            }
          }
        )

      // Check if both PATCH student and POST statusUpdate succeed
      if (success) { dispatch('getAllStudents') }
    },
  },
  getters: {
    students: (state) => state.students,
    ...nativeLanguageGetters,
    getStudentByStudentId: (state) => (id) => state.students.find(student => student.StudentID == id)
  },
})
