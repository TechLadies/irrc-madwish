import Vue from 'vue'
import Vuex from 'vuex'
import {nativeLanguageActions, nativeLanguageGetters, nativeLanguageMutations, nativeLanguageState} from './store/nativeLanguages.js'
import {screeningActions, screeningState, screeningMutations} from './store/screening.js'

Vue.use(Vuex)

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: 'SET_STUDENTS'
})

export default new Vuex.Store({
  state: {
    students: [],
    ...nativeLanguageState,
    ...screeningState
  },
  mutations: {
    [MUTATIONS.SET_STUDENTS](state, students) {
      state.students = students
    },
    ...nativeLanguageMutations,
    ...screeningMutations
  },
  actions: {
    ...nativeLanguageActions,

    async getAllStudents({ commit }) {
      const response = await fetch("/api/students")
      const data = await response.json()
      commit(MUTATIONS.SET_STUDENTS, data)
    },
    ...nativeLanguageActions,
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
    students: (state) => state.students,
    ...nativeLanguageGetters,
    getStudentByStudentId: (state) => (id) => state.students.find(student => student.StudentID == id)
  },
})
