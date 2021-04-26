const MUTATIONS = Object.freeze({
  SET_SUCCESS: "SET_SUCCESS",
});
export const matchingState = { matchingSuccess: false };
export const matchingActions = {
  async matchStudentTeacherPairs({ commit, dispatch }, data) {
    const studentTeacherPairs = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //TODO create matching endpoint
    const response = await fetch("/api/matching", studentTeacherPairs);
    const result = await response.json();
    if (response.status === 200) {
      commit(MUTATIONS.SET_SUCCESS, true);
      dispatch("getAllStudents")
    }
  },
};
export const matchingMutations = {
  [MUTATIONS.SET_SUCCESS](state, data) {
    state.matchingSuccess = data;
  },
};
