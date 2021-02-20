import Vuex from "vuex";

const MUTATIONS = Object.freeze({
  SET_TEACHERS: "SET_TEACHERS",
  SET_UPDATE_TEACHER_SUCCESS: "SET_UPDATE_TEACHER_SUCCESS"
});
export const teacherState = { teachers: [], updateTeacherSuccess: undefined };
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
    const response = await fetch("api/teachers", payload);
    dispatch("getAllTeachers");
    return response
  },
  async patchTeacher({ dispatch, commit}, teacherData){
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    };
    const result = await fetch(`api/teachers/${teacherData.TeacherID}`, payload);
    if(result.status < 400){
      commit(MUTATIONS.SET_UPDATE_TEACHER_SUCCESS, true)
      dispatch("getAllTeachers")

    }
    else{
      commit(MUTATIONS.SET_UPDATE_TEACHER_SUCCESS, false)
    }
  },
  resetTeacherUpdateSuccess({commit}, value){
    commit(MUTATIONS.SET_UPDATE_TEACHER_SUCCESS, value)
  },

  async updateTeacherStatus({ commit, dispatch }, { teacherID, previousStatusString, nextStatusString, updatedBy, reason }) {
    // PATCH student
    const teacherRequestOptions = {
        method: "PATCH",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({TeacherID: teacherID, StatusString: nextStatusString})
    }

    // POST statusUpdate
    const statusUpdateRequestOptions = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        TeacherID: teacherID,
        PreviousStatusString: previousStatusString,
        NextStatusString: nextStatusString,
        UpdatedBy: updatedBy,
        ReasonString: reason
        })
    }

    // fetch("/api/statusUpdates", statusUpdateRequestOptions)
    // .then((response) => {
    //     if(response.status !== 200) {
    //         throw new Error(response);
    //     }
    // })
    // .then(() => {
    //     fetch("/api/teachers/" + teacherID, teacherRequestOptions)
    //     .then((response) => {
    //     if(response.status !== 200) {
    //         throw new Error(response);
    //     }
    //     })
    // })
    // .then(() => {
    //     dispatch('getAllTeachers')
    // })
    // .catch((err) => {
    //     console.error(err);
    // });
},

};
export const teacherMutations = {
  [MUTATIONS.SET_TEACHERS](state, teachers) {
    state.teachers = teachers;
  },
  [MUTATIONS.SET_UPDATE_TEACHER_SUCCESS](state, value){
    state.updateTeacherSuccess = value;
  }

};
export const teacherGetters = {
  teachers(state) {
    return state.teachers;
  },
  getTeacherByTeacherId:(state) => (id) => {
    return state.teachers.find(teacher => teacher.TeacherID == id)
  } 
};
