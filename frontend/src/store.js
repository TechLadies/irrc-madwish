import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: 'SET_STUDENTS'
})

export default new Vuex.Store({
  state: {
    students: []
  },
  mutations: {
    [MUTATIONS.SET_STUDENTS](state, students) {
      state.students = students
    }
  },
  actions: {
    async getAllStudents({ commit }) {
      await fetch('/api/students')
        .then(response => {
          return response.json();
        }).then(data => {
          commit(MUTATIONS.SET_STUDENTS, data)
        })
    }

  },
  getters: {
    students: (state) => state.students
  }
})
