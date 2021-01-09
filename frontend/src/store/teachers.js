import Vuex from "vuex";

const MUTATIONS = Object.freeze({
  SET_TEACHERS: "SET_TEACHERS",
});
export const teacherState = { teachers: [] };
export const teacherActions = {
  async getAllTeachers({ commit }) {
    const response = await fetch("/api/teachers");
    const teacherData = await response.json();
    commit(MUTATIONS.SET_TEACHERS, teacherData);
    
  },
  async createTeacher({ dispatch }, teacherData) {
    const payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(teacherData),
    };
    await fetch("api/teachers", payload);
    dispatch("getAllTeachers");
  },
};
export const teacherMutations = {
  [MUTATIONS.SET_TEACHERS](state, teacherData) {
    state.teachers = teacherData;
  },
};
export const teacherGetters = {
  teachers(state) {
    return state.teachers;
  },
};
