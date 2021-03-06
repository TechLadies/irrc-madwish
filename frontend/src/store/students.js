const MUTATIONS = Object.freeze({
  SET_STUDENTS: "SET_STUDENTS",
  SET_UPDATE_STUDENT_SUCCESS: "SET_UPDATE_STUDENT_SUCCESS",
});

export const studentState = { students: [], updateStudentSuccess: undefined };
export const studentActions = {
  async getAllStudents({ commit }) {
    const response = await fetch("/api/students");
    const studentData = await response.json();
    commit(MUTATIONS.SET_STUDENTS, studentData);
  },

  async createStudent({ dispatch }, studentData) {
    const payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch("/api/students", payload);
    dispatch("getAllStudents");
    return response;
  },

  // PATCH Student Data to backend
  async patchStudent({ dispatch, commit }, studentData) {
    const patchStudent = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch(
      `/api/students/${studentData.StudentID}`,
      patchStudent
    );
    if (response.status === 200) {
      dispatch("getAllStudents");
      commit("SET_UPDATE_STUDENT_SUCCESS", true);
    } else {
      commit("SET_UPDATE_STUDENT_SUCCESS", false);
    }
  },
  resetUpdateStudentSuccess({ commit }, value) {
    commit(MUTATIONS.SET_UPDATE_STUDENT_SUCCESS, value);
  },
  // Update student status
  updateStudentStatus(
    { commit, dispatch },
    { studentID, previousStatusString, nextStatusString, updatedBy, reason }
  ) {
    // POST statusUpdate. Note that the POST statusUpdate endpoint also patches the student status
    // behind-the-scenes.
    const statusUpdateRequestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        StudentID: studentID,
        PreviousStatusString: previousStatusString,
        NextStatusString: nextStatusString,
        UpdatedBy: updatedBy,
        ReasonString: reason,
      }),
    };

    fetch("/api/statusUpdates", statusUpdateRequestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response);
        }
        dispatch("getAllStudents");

        // Calls deletion API to delete matches if moving from MATCHED -> UNMATCHED/DROPPED OUT
        fetch("/api/matches/unmatch-student", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            StudentID: studentID,
            NextStatusString: nextStatusString,
          }),
        });
        // TODO: Call matches API after this to refresh
        // fetch('api/matches').then(response => response.json) ?
      })

      .catch((err) => {
        console.error(err);
      });
  },

  // Update student English proficiency
  async updateStudentEnglishProficiency(
    { commit, dispatch },
    { studentID, englishProficiency }
  ) {
    if (!englishProficiency) return;

    // PATCH student
    const studentRequestOptions = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        StudentID: studentID,
        EnglishProficiency: englishProficiency,
      }),
    };

    fetch("/api/students/" + studentID, studentRequestOptions).then(
      (response) => {
        // If PATCH fails, return
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        dispatch("getAllStudents");
      }
    );
  },
};
export const studentMutations = {
  [MUTATIONS.SET_STUDENTS](state, students) {
    state.students = students;
  },
  [MUTATIONS.SET_UPDATE_STUDENT_SUCCESS](state, value) {
    // sets updateStudentSuccess to true
    state.updateStudentSuccess = value;
  },
};
export const studentGetters = {
  students: (state) => state.students,
};
