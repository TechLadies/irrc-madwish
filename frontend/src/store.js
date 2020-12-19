import Vue from 'vue'
import Vuex from 'vuex'
import {nativeLanguageActions, nativeLanguageGetters, nativeLanguageMutations, nativeLanguageState} from './store/nativeLanguages.js'
import {studentActions, studentGetters, studentMutations, studentState} from './store/Students.js'


Vue.use(Vuex)

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: 'SET_STUDENTS'
})

export default new Vuex.Store({
  state: {
    ...studentState,
    ...nativeLanguageState
  },
  mutations: {
    ...studentMutations,
    ...nativeLanguageMutations
  },
  actions: {
    ...studentActions,
    ...nativeLanguageActions

  },
  getters: {
    ...studentGetters,
    ...nativeLanguageGetters
  },
})
