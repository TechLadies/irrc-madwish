import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: []
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students
    }
  },
  actions: {
    getAllStudents( {commit} ) {
      return fetch('http://localhost:3001/api/students')
        .then(response => {
          return response.json();
        }).then(data => {
          commit('SET_STUDENTS', data)
        })
    }

  },
  getters: {
    students: (state) => {return state.students}
  }
})
