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
    async getAllStudents({ commit }) {
      const response = await fetch("/api/students")
      const data = await response.json()
      commit(MUTATIONS.SET_STUDENTS, data)
    },
    ...nativeLanguageActions,
    ...screeningActions

  },
  getters: {
    students: (state) => state.students,
    ...nativeLanguageGetters
  },
})
